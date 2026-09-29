(() => {
  'use strict';

  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => [...root.querySelectorAll(s)];
  const STORAGE = {
    progress:'atlasLinf.progress.v1',
    notes:'atlasLinf.notes.v1',
    settings:'atlasLinf.settings.v1'
  };

  let progress = loadJSON(STORAGE.progress, {});
  let notes = loadJSON(STORAGE.notes, {});
  let settings = loadJSON(STORAGE.settings, {largeText:false,highContrast:false,imagesOff:false});
  let activeGroup = 'Todos';
  let searchTerm = '';
  let incompleteOnly = false;
  let deferredInstall = null;
  let zoom = 1;
  let attachmentUrls = [];
  let dbPromise;

  const els = {
    grid: $('#atlasGrid'), empty: $('#emptyState'), search: $('#searchInput'), clearSearch: $('#clearSearch'),
    groupFilters: $('#groupFilters'), resultSummary: $('#resultSummary'), progressRing: $('#progressRing'),
    progressPercent: $('#progressPercent'), progressHeadline: $('#progressHeadline'), progressDetail: $('#progressDetail'),
    attachmentCount: $('#attachmentCount'), installBtn: $('#installBtn'), exportBtn: $('#exportBtn'), fabExport: $('#fabExport'),
    exportModal: $('#exportModal'), settingsModal: $('#settingsModal'), backupModal: $('#backupModal'),
    settingsBtn: $('#settingsBtn'), backupBtn: $('#backupBtn'), startBtn: $('#startBtn'), resetFiltersBtn: $('#resetFiltersBtn'),
    showIncompleteBtn: $('#showIncompleteBtn'), collapseBtn: $('#collapseBtn'), toast: $('#toast'),
    offlineBadge: $('#offlineBadge'), lightbox: $('#lightbox'), lightboxImage: $('#lightboxImage'), lightboxTitle: $('#lightboxTitle')
  };

  function loadJSON(key, fallback){
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
  }
  function saveState(){
    localStorage.setItem(STORAGE.progress, JSON.stringify(progress));
    localStorage.setItem(STORAGE.notes, JSON.stringify(notes));
    localStorage.setItem(STORAGE.settings, JSON.stringify(settings));
  }
  const itemKey = k => `i:${k}`;
  const isDone = k => !!progress[itemKey(k)];
  const escapeHtml = (s='') => String(s).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const stripDiacritics = s => String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();

  function openDB(){
    if (dbPromise) return dbPromise;
    dbPromise = new Promise((resolve,reject) => {
      const req = indexedDB.open('AtlasLinfDB', 1);
      req.onupgradeneeded = () => {
        const db = req.result;
        const store = db.createObjectStore('attachments', {keyPath:'id'});
        store.createIndex('blockId','blockId',{unique:false});
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
    return dbPromise;
  }
  async function dbAll(){
    const db = await openDB();
    return new Promise((resolve,reject) => {
      const tx=db.transaction('attachments','readonly');
      const req=tx.objectStore('attachments').getAll();
      req.onsuccess=()=>resolve(req.result||[]); req.onerror=()=>reject(req.error);
    });
  }
  async function dbByBlock(blockId){
    const db=await openDB();
    return new Promise((resolve,reject)=>{
      const tx=db.transaction('attachments','readonly');
      const req=tx.objectStore('attachments').index('blockId').getAll(Number(blockId));
      req.onsuccess=()=>resolve(req.result||[]); req.onerror=()=>reject(req.error);
    });
  }
  async function dbPut(record){
    const db=await openDB();
    return new Promise((resolve,reject)=>{
      const tx=db.transaction('attachments','readwrite');
      tx.objectStore('attachments').put(record);
      tx.oncomplete=resolve; tx.onerror=()=>reject(tx.error);
    });
  }
  async function dbDelete(id){
    const db=await openDB();
    return new Promise((resolve,reject)=>{
      const tx=db.transaction('attachments','readwrite');
      tx.objectStore('attachments').delete(id);
      tx.oncomplete=resolve; tx.onerror=()=>reject(tx.error);
    });
  }
  async function dbClear(){
    const db=await openDB();
    return new Promise((resolve,reject)=>{
      const tx=db.transaction('attachments','readwrite'); tx.objectStore('attachments').clear();
      tx.oncomplete=resolve; tx.onerror=()=>reject(tx.error);
    });
  }

  async function compressImage(file){
    if (!file.type.startsWith('image/')) return file;
    try {
      const bitmap = await createImageBitmap(file);
      const max=1800, scale=Math.min(1,max/Math.max(bitmap.width,bitmap.height));
      if (scale===1 && file.size<1_500_000) return file;
      const canvas=document.createElement('canvas'); canvas.width=Math.round(bitmap.width*scale); canvas.height=Math.round(bitmap.height*scale);
      const ctx=canvas.getContext('2d',{alpha:false}); ctx.fillStyle='#fff'; ctx.fillRect(0,0,canvas.width,canvas.height); ctx.drawImage(bitmap,0,0,canvas.width,canvas.height);
      bitmap.close?.();
      return await new Promise(res=>canvas.toBlob(b=>res(b||file),'image/jpeg',.86));
    } catch { return file; }
  }

  function applySettings(){
    document.body.classList.toggle('large-text',!!settings.largeText);
    document.body.classList.toggle('high-contrast',!!settings.highContrast);
    document.body.classList.toggle('images-off',!!settings.imagesOff);
    $('#largeTextToggle').checked=!!settings.largeText;
    $('#contrastToggle').checked=!!settings.highContrast;
    $('#imagesToggle').checked=!!settings.imagesOff;
  }

  function blockMatches(block){
    if (activeGroup!=='Todos' && block.group!==activeGroup) return false;
    if (incompleteOnly && !block.items.some(i=>!isDone(i.key))) return false;
    if (!searchTerm) return true;
    const q=stripDiacritics(searchTerm.trim());
    const hay=[block.title,block.group,block.range,...block.items.flatMap(i=>[i.code||i.key,i.name,...(i.subs||[])])].map(stripDiacritics).join(' ');
    return hay.includes(q);
  }

  function renderFilters(){
    els.groupFilters.innerHTML=GROUPS.map(g=>`<button type="button" class="chip ${g===activeGroup?'active':''}" data-group="${escapeHtml(g)}">${escapeHtml(g)}</button>`).join('');
  }

  function blockProgress(block){
    const done=block.items.filter(i=>isDone(i.key)).length;
    return {done,total:block.items.length,pct:Math.round(done/block.items.length*100)};
  }

  const LINF_IMAGE_INFO = {
    1:{location:'A medula óssea vermelha ocupa espaços do osso esponjoso; o timo situa-se principalmente no mediastino superior e anterior, atrás do esterno.',role:'A medula vermelha realiza hematopoiese; o timo é órgão linfoide primário responsável pela maturação e seleção de linfócitos T.'},
    2:{location:'Timo no mediastino; tonsilas ao redor da faringe; placas de Peyer na mucosa/submucosa do íleo.',role:'Organizam a resposta imune: o timo amadurece linfócitos T e as tonsilas/placas de Peyer fazem vigilância imunológica de antígenos que chegam pelas vias aerodigestivas.'},
    3:{location:'Apêndice vermiforme ligado ao ceco no quadrante inferior direito; linfonodos distribuídos ao longo dos vasos linfáticos.',role:'O apêndice contém tecido linfoide associado ao intestino; os linfonodos filtram a linfa e promovem ativação e proliferação de células imunes.'},
    4:{location:'Estroma localizado no interior dos linfonodos e do baço, formando cápsula, trabéculas e rede de sustentação.',role:'Fornece suporte estrutural para células imunes e organiza compartimentos onde ocorrem filtragem, apresentação de antígenos e respostas imunitárias.'},
    5:{location:'Baço no hipocôndrio esquerdo, profundo às costelas 9ª a 11ª, entre diafragma, estômago e rim esquerdo.',role:'Filtra o sangue, remove hemácias envelhecidas, participa da resposta imune a antígenos sanguíneos e atua como reservatório celular/plaquetário.'},
    6:{location:'Face visceral do baço, voltada para estômago, rim esquerdo, cólon e cauda do pâncreas; o hilo fica nessa face.',role:'O hilo permite entrada e saída de vasos e nervos; a artéria esplênica leva sangue ao órgão para suas funções hematológicas e imunes.'},
    7:{location:'Vasos na região do hilo e parênquima do baço; linfonodos parietais situam-se ao longo da parede torácica e diafragma.',role:'Os vasos mantêm a perfusão e drenagem esplênica; linfonodos parietais recebem e filtram linfa da parede torácica e regiões adjacentes.'},
    8:{location:'Linfonodos frênicos junto ao diafragma; linfonodos mediastinais anteriores na região anterior do mediastino.',role:'Drenam diafragma, pericárdio, parede torácica e estruturas mediastinais, encaminhando a linfa para cadeias e troncos maiores.'},
    9:{location:'Ao redor da traqueia, bifurcação traqueal, brônquios principais e hilos pulmonares.',role:'Recebem linfa dos pulmões e vias aéreas, filtram partículas/antígenos e encaminham a drenagem para os troncos broncomediastinais.'},
    10:{location:'Mediastino posterior, próximo ao esôfago e aorta, e raiz do pescoço, onde surgem troncos jugular, subclávio e broncomediastinal.',role:'Coletam linfa de estruturas torácicas posteriores, cabeça/pescoço e membro superior e a conduzem aos grandes ductos linfáticos.'},
    11:{location:'Troncos lombares no retroperitônio; cisterna do quilo na região lombar superior; ducto torácico ascende pelo tórax até o ângulo venoso esquerdo; ducto linfático direito termina no ângulo venoso direito.',role:'Recolhem e devolvem ao sangue a linfa da maior parte do corpo; o ducto linfático direito drena o quadrante superior direito.'}
  };

  function getImageInfo(block, im){
    const fallback=LINF_IMAGE_INFO[block.id]||{location:'Região anatômica demonstrada na prancha.',role:'Ajuda a reconhecer a estrutura linfática e seu papel na drenagem ou defesa imunológica.'};
    return {location:im.location||fallback.location, role:im.role||fallback.role};
  }

  function imageGallery(block){
    if (!block.images?.length) return '';
    return `<div class="image-gallery" aria-label="Imagens do bloco ${block.id}">${block.images.map((im,idx)=>{
      const info=getImageInfo(block,im);
      return `<figure class="image-tile">
        <div class="image-frame">
          <img src="${im.src}" alt="${escapeHtml(im.alt)}" loading="lazy">
          <button type="button" class="open-image" data-src="${im.src}" data-title="Bloco ${String(block.id).padStart(2,'0')} • ${escapeHtml(im.caption||block.title)}" aria-label="Ampliar imagem"></button>
        </div>
        ${im.caption?`<figcaption class="image-caption">${escapeHtml(im.caption)}</figcaption>`:''}
        <div class="image-explanation">
          <p><strong>Localização:</strong> ${escapeHtml(info.location)}</p>
          <p><strong>Função / importância:</strong> ${escapeHtml(info.role)}</p>
        </div>
      </figure>`;
    }).join('')}</div>`;
  }

  function itemMarkup(item){
    const done=isDone(item.key);
    return `<div class="item ${done?'done':''}" data-item="${escapeHtml(item.key)}">
      <div class="item-num">${escapeHtml(item.code||item.key)}</div>
      <div class="item-main">
        <div class="item-name">${escapeHtml(item.name)}</div>
        ${item.note?`<div class="item-note">${escapeHtml(item.note)}</div>`:''}
        ${item.subs?.length?`<details class="subdetails"><summary>${item.subs.length} subitens do roteiro</summary><ul>${item.subs.map(s=>`<li>${escapeHtml(s)}</li>`).join('')}</ul></details>`:''}
      </div>
      <label class="check-wrap" title="Marcar como estudado"><input type="checkbox" class="study-check" data-n="${escapeHtml(item.key)}" ${done?'checked':''}><span class="sr-only">Marcar ${escapeHtml(item.name)} como estudado</span></label>
    </div>`;
  }

  function blockMarkup(block){
    const bp=blockProgress(block);
    const coverageClass=block.coverage==='parcial'?'partial':'';
    const coverageText=block.coverage==='parcial'?'Imagem parcial':'Cobertura visual';
    return `<article class="block-card" id="block-${block.id}" data-block="${block.id}">
      <div class="card-head">
        <div class="block-num">${String(block.id).padStart(2,'0')}</div>
        <div class="card-title">
          <div class="meta"><span class="range-pill">${block.range}</span><span class="group-pill">${block.group}</span><span class="coverage-pill ${coverageClass}">${coverageText}</span></div>
          <h3>${escapeHtml(block.title)}</h3><small>${block.items.length} ${block.items.length===1?'estrutura':'estruturas'} neste bloco</small>
        </div>
        <div class="card-progress" title="Progresso no bloco">${bp.done}/${bp.total}</div>
      </div>
      <div class="card-body">
        ${imageGallery(block)}
        <div class="item-list">${block.items.map(itemMarkup).join('')}</div>
        <div class="card-tools">
          <button type="button" class="notes-btn" data-action="notes" data-block="${block.id}">✎ Anotações</button>
          <button type="button" class="attach-btn" data-action="attach" data-block="${block.id}">＋ Anexar imagens</button>
        </div>
        <textarea class="notes-area hidden" data-notes="${block.id}" placeholder="Anotações pessoais deste bloco…">${escapeHtml(notes[block.id]||'')}</textarea>
        <div class="attachments" data-attachments="${block.id}" aria-label="Imagens anexadas pelo aluno"></div>
      </div>
    </article>`;
  }

  async function render(){
    attachmentUrls.forEach(URL.revokeObjectURL); attachmentUrls=[];
    renderFilters();
    const filtered=ATLAS_DATA.filter(blockMatches);
    els.grid.innerHTML=filtered.map(blockMarkup).join('');
    els.empty.classList.toggle('hidden',filtered.length>0);
    const visibleItems=filtered.reduce((a,b)=>a+b.items.length,0);
    els.resultSummary.textContent=`${filtered.length} ${filtered.length===1?'bloco':'blocos'} • ${visibleItems} ${visibleItems===1?'estrutura':'estruturas'}`;
    els.clearSearch.classList.toggle('hidden',!searchTerm);
    els.showIncompleteBtn.style.background=incompleteOnly?'var(--ink)':'';
    els.showIncompleteBtn.style.color=incompleteOnly?'#fff':'';
    updateProgress();
    await Promise.all(filtered.map(b=>loadAttachmentsIntoCard(b.id)));
  }

  async function loadAttachmentsIntoCard(blockId){
    const host=document.querySelector(`[data-attachments="${blockId}"]`); if(!host) return;
    const list=await dbByBlock(blockId);
    if(!list.length){host.innerHTML=''; return;}
    host.innerHTML=list.map(a=>{
      const url=URL.createObjectURL(a.blob); attachmentUrls.push(url);
      return `<div class="attachment"><img src="${url}" alt="Imagem anexada pelo aluno"><button type="button" class="delete-attachment" data-id="${a.id}" title="Excluir anexo" aria-label="Excluir anexo">×</button></div>`;
    }).join('');
  }

  async function updateProgress(){
    const total=ATLAS_DATA.reduce((a,b)=>a+b.items.length,0);
    const done=ATLAS_DATA.reduce((a,b)=>a+b.items.filter(i=>isDone(i.key)).length,0);
    const pct=Math.round(done/total*100);
    els.progressRing.style.setProperty('--p',pct); els.progressPercent.textContent=`${pct}%`;
    els.progressDetail.textContent=`${done} de ${total} alvos revisados`;
    els.progressHeadline.textContent=done===total?'Roteiro concluído':done?`Continue: faltam ${total-done}`:'Comece pelo bloco 1';
    try { els.attachmentCount.textContent=(await dbAll()).length; } catch { els.attachmentCount.textContent='0'; }
  }

  async function addAttachments(blockId, files){
    const imgs=[...files].filter(f=>f.type.startsWith('image/'));
    if(!imgs.length){toast('Selecione arquivos de imagem.');return;}
    toast(`Processando ${imgs.length} ${imgs.length===1?'imagem':'imagens'}…`);
    for(const file of imgs){
      const blob=await compressImage(file);
      await dbPut({id:`${Date.now()}-${crypto.randomUUID?.()||Math.random().toString(36).slice(2)}`,blockId:Number(blockId),name:file.name||'imagem.jpg',type:blob.type||file.type||'image/jpeg',createdAt:Date.now(),blob});
    }
    await loadAttachmentsIntoCard(blockId); await updateProgress(); toast('Imagem anexada e salva neste dispositivo.');
  }

  function showModal(modal){ modal.classList.remove('hidden'); document.body.style.overflow='hidden'; }
  function hideModals(){ $$('.modal-backdrop').forEach(m=>m.classList.add('hidden')); if(els.lightbox.classList.contains('hidden')) document.body.style.overflow=''; }
  function toast(msg){
    els.toast.textContent=msg; els.toast.classList.add('show'); clearTimeout(toast._t); toast._t=setTimeout(()=>els.toast.classList.remove('show'),2600);
  }

  function openLightbox(src,title){ zoom=1; els.lightboxImage.src=src; els.lightboxImage.alt=title||'Imagem anatômica ampliada'; els.lightboxTitle.textContent=title||'Imagem anatômica'; els.lightboxImage.style.transform='scale(1)'; $('#zoomReset').textContent='100%'; els.lightbox.classList.remove('hidden'); document.body.style.overflow='hidden'; }
  function setZoom(z){ zoom=Math.min(3,Math.max(.5,z)); els.lightboxImage.style.transform=`scale(${zoom})`; $('#zoomReset').textContent=`${Math.round(zoom*100)}%`; }
  function closeLightbox(){ els.lightbox.classList.add('hidden'); els.lightboxImage.src=''; document.body.style.overflow=''; }

  function scrollToNextIncomplete(){
    const block=ATLAS_DATA.find(b=>b.items.some(i=>!isDone(i.key)))||ATLAS_DATA[0];
    activeGroup='Todos'; searchTerm=''; incompleteOnly=false; els.search.value=''; render().then(()=>document.getElementById(`block-${block.id}`)?.scrollIntoView({behavior:'smooth',block:'start'}));
  }

  function blobToDataURL(blob){ return new Promise((resolve,reject)=>{const r=new FileReader();r.onload=()=>resolve(r.result);r.onerror=reject;r.readAsDataURL(blob);}); }
  function dataURLToBlob(dataURL){
    const [meta,data]=dataURL.split(','); const mime=(meta.match(/data:([^;]+)/)||[])[1]||'application/octet-stream'; const bin=atob(data); const arr=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) arr[i]=bin.charCodeAt(i); return new Blob([arr],{type:mime});
  }

  async function exportBackup(){
    toast('Preparando backup…');
    const attachments=await dbAll();
    const packed=[];
    for(const a of attachments) packed.push({id:a.id,blockId:a.blockId,name:a.name,type:a.type,createdAt:a.createdAt,data:await blobToDataURL(a.blob)});
    const payload={app:'Atlas Linfático Imersivo',version:2,exportedAt:new Date().toISOString(),progress,notes,settings,attachments:packed};
    const blob=new Blob([JSON.stringify(payload)],{type:'application/json'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download=`atlas-linfatico-backup-${new Date().toISOString().slice(0,10)}.json`; a.click(); setTimeout(()=>URL.revokeObjectURL(url),1000); toast('Backup exportado.');
  }
  async function importBackup(file){
    try{
      const payload=JSON.parse(await file.text()); if(!payload||payload.app!=='Atlas Linfático Imersivo') throw new Error('Arquivo incompatível');
      progress=payload.progress||{}; notes=payload.notes||{}; settings={...settings,...(payload.settings||{})}; await dbClear();
      for(const a of payload.attachments||[]) await dbPut({...a,blob:dataURLToBlob(a.data),data:undefined});
      saveState(); applySettings(); hideModals(); await render(); toast('Backup importado com sucesso.');
    }catch(e){console.error(e);toast('Não foi possível importar esse backup.');}
  }

  async function buildPrintReport(){
    const opts={official:$('#pdfOfficial').checked,student:$('#pdfStudent').checked,notes:$('#pdfNotes').checked,progress:$('#pdfProgress').checked,onlyDone:$('#pdfOnlyDone').checked,compact:$('#pdfCompact').checked};
    const printWin=window.open('','_blank'); if(!printWin){toast('Permita pop-ups para gerar o PDF.');return;}
    printWin.document.write('<!doctype html><title>Preparando relatório…</title><p style="font-family:sans-serif;padding:30px">Preparando relatório…</p>');
    const attachments=opts.student?await dbAll():[];
    const byBlock={};
    for(const a of attachments){(byBlock[a.blockId]??=[]).push({...a,data:await blobToDataURL(a.blob)});}
    const blocks=ATLAS_DATA.filter(b=>!opts.onlyDone||b.items.some(i=>isDone(i.key)));
    const total=ATLAS_DATA.reduce((a,b)=>a+b.items.length,0);
    const done=ATLAS_DATA.reduce((a,b)=>a+b.items.filter(i=>isDone(i.key)).length,0);
    const today=new Intl.DateTimeFormat('pt-BR',{dateStyle:'long',timeStyle:'short'}).format(new Date());
    const sections=blocks.map(b=>{
      const official=opts.official?`<div class="imgs ${opts.compact?'compact':''}">${b.images.map(im=>{const info=getImageInfo(b,im);return `<figure><img src="${new URL(im.src,location.href).href}" alt=""><figcaption><strong>${escapeHtml(im.caption||'')}</strong><br><b>Localização:</b> ${escapeHtml(info.location)}<br><b>Função / importância:</b> ${escapeHtml(info.role)}</figcaption></figure>`}).join('')}</div>`:'';
      const own=(opts.student&&byBlock[b.id]?.length)?`<h4>Imagens anexadas</h4><div class="imgs student ${opts.compact?'compact':''}">${byBlock[b.id].map(a=>`<figure><img src="${a.data}" alt=""><figcaption>${escapeHtml(a.name||'Imagem do aluno')}</figcaption></figure>`).join('')}</div>`:'';
      const list=b.items.map(i=>`<li class="${isDone(i.key)?'done':''}"><span class="n">${escapeHtml(i.code||i.key)}</span><div><strong>${escapeHtml(i.name)}</strong>${i.subs?.length?`<ul>${i.subs.map(s=>`<li>${escapeHtml(s)}</li>`).join('')}</ul>`:''}${i.note?`<small>${escapeHtml(i.note)}</small>`:''}</div>${opts.progress?`<span class="mark">${isDone(i.key)?'✓':'○'}</span>`:''}</li>`).join('');
      const note=opts.notes&&notes[b.id]?`<div class="note"><strong>Anotações:</strong> ${escapeHtml(notes[b.id]).replace(/\n/g,'<br>')}</div>`:'';
      return `<section><header><div><span>Bloco ${String(b.id).padStart(2,'0')} • ${b.range}</span><h2>${escapeHtml(b.title)}</h2></div><b>${escapeHtml(b.group)}</b></header>${official}<ol>${list}</ol>${note}${own}</section>`;
    }).join('');
    const html=`<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Atlas Linfático — Relatório</title><style>
      @page{size:A4;margin:12mm}*{box-sizing:border-box}body{font-family:Arial,sans-serif;color:#18343b;margin:0;font-size:10.5pt}h1{margin:0;font-size:25pt;letter-spacing:-1px} .cover{border-bottom:3px solid #176b50;padding-bottom:14px;margin-bottom:16px}.cover p{color:#60737a;margin:6px 0}.summary{display:flex;gap:10px;margin-top:12px}.summary span{background:#edf6f0;padding:7px 10px;border-radius:8px;font-weight:bold}section{break-inside:avoid;margin:0 0 14px;padding:10px;border:1px solid #cfdadd;border-radius:10px}section>header{display:flex;justify-content:space-between;gap:12px;border-bottom:1px solid #dbe3e6;padding-bottom:6px;margin-bottom:8px}section header span{color:#176b50;font-size:8.5pt;font-weight:bold}section header h2{font-size:14pt;margin:2px 0 0}section header b{font-size:8.5pt;color:#60737a}.imgs{display:grid;grid-template-columns:repeat(2,1fr);gap:7px;margin:7px 0 10px}.imgs.compact{grid-template-columns:repeat(3,1fr)}figure{margin:0;border:1px solid #dce4e6;border-radius:7px;overflow:hidden;break-inside:avoid}figure img{display:block;width:100%;max-height:${opts.compact?'100px':'180px'};object-fit:contain;background:#fff}figcaption{font-size:7.5pt;color:#596b72;padding:4px 6px}ol{list-style:none;padding:0;margin:0;display:grid;gap:3px}ol>li{display:grid;grid-template-columns:26px 1fr 20px;gap:6px;align-items:start;padding:4px 5px;border-radius:5px;background:#f8fafb}.n{font-weight:bold;color:#176b50}ol>li.done{background:#edf7f3}.mark{font-size:13pt;color:#2b805f;text-align:center}li ul{margin:3px 0 0 14px;padding:0;color:#66767d;font-size:8.5pt}.note{margin-top:8px;padding:8px;background:#fff6fa;border-left:3px solid #d3a72f;font-size:9pt}.student{margin-top:6px}h4{margin:10px 0 4px;font-size:9pt}.footer{margin-top:18px;color:#66767d;font-size:8pt;text-align:center}@media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
      </style></head><body><div class="cover"><h1>Atlas Linfático Imersivo</h1><p>Roteiro prático de Anatomia Humana • Sistema Linfático</p><div class="summary"><span>${done}/${total} revisadas</span><span>${blocks.length} blocos no relatório</span><span>${today}</span></div></div>${sections}<div class="footer">Gerado pelo Atlas Linfático Imersivo • Os dados de estudo são locais ao dispositivo.</div><script>window.addEventListener('load',()=>setTimeout(()=>window.print(),700));<\/script></body></html>`;
    printWin.document.open(); printWin.document.write(html); printWin.document.close(); hideModals();
  }

  // Events
  els.search.addEventListener('input',e=>{searchTerm=e.target.value;render();});
  els.clearSearch.addEventListener('click',()=>{els.search.value='';searchTerm='';render();els.search.focus();});
  els.groupFilters.addEventListener('click',e=>{const b=e.target.closest('[data-group]');if(!b)return;activeGroup=b.dataset.group;render();});
  els.showIncompleteBtn.addEventListener('click',()=>{incompleteOnly=!incompleteOnly;render();});
  els.resetFiltersBtn.addEventListener('click',()=>{activeGroup='Todos';searchTerm='';incompleteOnly=false;els.search.value='';render();document.querySelector('.toolbar').scrollIntoView({behavior:'smooth'});});
  els.startBtn.addEventListener('click',scrollToNextIncomplete);
  els.exportBtn.addEventListener('click',()=>showModal(els.exportModal)); els.fabExport.addEventListener('click',()=>showModal(els.exportModal));
  els.settingsBtn.addEventListener('click',()=>showModal(els.settingsModal)); els.backupBtn.addEventListener('click',()=>showModal(els.backupModal));
  $('#generatePdfBtn').addEventListener('click',buildPrintReport);
  $('#exportBackupBtn').addEventListener('click',exportBackup); $('#importBackupBtn').addEventListener('click',()=>$('#importBackupInput').click());
  $('#importBackupInput').addEventListener('change',e=>{if(e.target.files[0])importBackup(e.target.files[0]);e.target.value='';});
  $$('.modal-close').forEach(b=>b.addEventListener('click',hideModals));
  $$('.modal-backdrop').forEach(m=>m.addEventListener('click',e=>{if(e.target===m)hideModals();}));
  $('#largeTextToggle').addEventListener('change',e=>{settings.largeText=e.target.checked;saveState();applySettings();});
  $('#contrastToggle').addEventListener('change',e=>{settings.highContrast=e.target.checked;saveState();applySettings();});
  $('#imagesToggle').addEventListener('change',e=>{settings.imagesOff=e.target.checked;saveState();applySettings();});
  $('#clearDataBtn').addEventListener('click',async()=>{if(!confirm('Limpar todo o progresso, anotações e imagens anexadas neste dispositivo?'))return;progress={};notes={};await dbClear();saveState();await render();toast('Dados locais removidos.');});

  els.grid.addEventListener('change',e=>{
    if(e.target.matches('.study-check')){progress[itemKey(e.target.dataset.n)]=e.target.checked;saveState();const item=e.target.closest('.item');item.classList.toggle('done',e.target.checked);const card=e.target.closest('.block-card');const block=ATLAS_DATA.find(b=>b.id===Number(card.dataset.block));const bp=blockProgress(block);card.querySelector('.card-progress').textContent=`${bp.done}/${bp.total}`;updateProgress();if(incompleteOnly&&e.target.checked)render();}
  });
  els.grid.addEventListener('input',e=>{if(e.target.matches('.notes-area')){notes[e.target.dataset.notes]=e.target.value;saveState();}});
  els.grid.addEventListener('click',async e=>{
    const image=e.target.closest('.open-image'); if(image){openLightbox(image.dataset.src,image.dataset.title);return;}
    const action=e.target.closest('[data-action]');
    if(action?.dataset.action==='notes'){const ta=document.querySelector(`[data-notes="${action.dataset.block}"]`);ta.classList.toggle('hidden');if(!ta.classList.contains('hidden'))ta.focus();return;}
    if(action?.dataset.action==='attach'){
      const input=document.createElement('input');input.type='file';input.accept='image/*';input.multiple=true;input.addEventListener('change',()=>addAttachments(action.dataset.block,input.files));input.click();return;
    }
    const del=e.target.closest('.delete-attachment'); if(del){await dbDelete(del.dataset.id);await loadAttachmentsIntoCard(Number(del.closest('.block-card').dataset.block));await updateProgress();toast('Anexo excluído.');}
  });

  let detailsOpen=false;
  els.collapseBtn.addEventListener('click',()=>{detailsOpen=!detailsOpen;$$('.subdetails').forEach(d=>d.open=detailsOpen);els.collapseBtn.textContent=detailsOpen?'Recolher detalhes':'Expandir subitens';});
  $('#closeLightbox').addEventListener('click',closeLightbox); $('#zoomIn').addEventListener('click',()=>setZoom(zoom+.25)); $('#zoomOut').addEventListener('click',()=>setZoom(zoom-.25)); $('#zoomReset').addEventListener('click',()=>setZoom(1));
  els.lightbox.addEventListener('click',e=>{if(e.target===els.lightbox||e.target.classList.contains('lightbox-stage'))closeLightbox();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(!els.lightbox.classList.contains('hidden'))closeLightbox();else hideModals();}});

  window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredInstall=e;els.installBtn.classList.remove('hidden');});
  els.installBtn.addEventListener('click',async()=>{if(!deferredInstall)return;deferredInstall.prompt();await deferredInstall.userChoice;deferredInstall=null;els.installBtn.classList.add('hidden');});
  window.addEventListener('appinstalled',()=>toast('Atlas instalado no dispositivo.'));
  const updateOnline=()=>els.offlineBadge.classList.toggle('hidden',navigator.onLine);window.addEventListener('online',updateOnline);window.addEventListener('offline',updateOnline);updateOnline();


  function renderExtras(){
    const host=document.getElementById('extrasGrid');
    if(!host || typeof EXTRA_GALLERY==='undefined') return;
    host.innerHTML=EXTRA_GALLERY.map((im,idx)=>`<article class="extra-card"><figure><img src="${im.src}" alt="${escapeHtml(im.title)}" loading="lazy"><button type="button" class="extra-open-image" data-src="${im.src}" data-title="${escapeHtml(im.title)}" aria-label="Ampliar imagem"></button></figure><div class="extra-copy"><strong>${escapeHtml(im.title)}</strong><span>${escapeHtml(im.caption||'')}</span></div></article>`).join('');
    host.addEventListener('click',e=>{const b=e.target.closest('.extra-open-image'); if(b) openLightbox(b.dataset.src,b.dataset.title);});
  }

  const __integratedQ = new URLSearchParams(location.search).get('q');
  if(__integratedQ){ searchTerm=__integratedQ; if(els.search) els.search.value=__integratedQ; }
  applySettings(); renderExtras(); render();
})();
