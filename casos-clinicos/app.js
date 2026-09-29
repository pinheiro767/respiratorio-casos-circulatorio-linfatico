(() => {
'use strict';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const esc=s=>String(s||'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const STORE='centralCasosAnatomicos.v1';
let state=load();
let currentSession=null,currentCase=null,currentPhase=0,timerSec=3000,timerHandle=null,teacher=false;
function load(){try{return JSON.parse(localStorage.getItem(STORE))||{targets:{},notes:{},completedCases:{},last:null}}catch{return {targets:{},notes:{},completedCases:{},last:null}}}
function save(){localStorage.setItem(STORE,JSON.stringify(state))}
function toast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('show');clearTimeout(toast._t);toast._t=setTimeout(()=>t.classList.remove('show'),2400)}

const pulmonary=(window.PULMAO_COMPLETO||[]).map(x=>({...x,system:'pulmao',systemLabel:'Pulmão completo',source:'pulmao'}));
const master=(window.MASTER_DATA||[]).map(x=>({...x,source:'master'}));
const sessions=window.CLINICAL_SESSIONS||[];

function sessionVisual(s){
  const map={
    aula1:'assets/visuals/respiratorio.webp',
    aula2:'assets/visuals/respiratorio.webp',
    aula3:'assets/visuals/circulatorio.webp',
    aula4:'assets/visuals/linfatico.webp',
    aula5:'assets/visuals/dossie.webp'
  };
  return map[s?.id]||'assets/visuals/dossie.webp';
}

function exactNames(names, pool){const wanted=names.map(norm);return pool.filter(x=>wanted.includes(norm(x.name)))}
function resolveSelector(sel={}){
 if(sel.system){
   let a=master.filter(x=>x.system===sel.system);
   if(sel.from!=null||sel.to!=null)a=a.filter(x=>{const n=Number(x.code);return Number.isFinite(n)&&(sel.from==null||n>=sel.from)&&(sel.to==null||n<=sel.to)});
   return a;
 }
 if(sel.pulmaoGroup)return pulmonary.filter(x=>x.group===sel.pulmaoGroup);
 if(sel.pulmaoGroups)return pulmonary.filter(x=>sel.pulmaoGroups.includes(x.group));
 if(sel.pulmaoNames)return exactNames(sel.pulmaoNames,pulmonary);
 if(sel.linfCodes)return master.filter(x=>x.system==='linfatico'&&sel.linfCodes.includes(x.code));
 if(sel.linfPrefix)return master.filter(x=>x.system==='linfatico'&&String(x.code).startsWith(sel.linfPrefix));
 if(sel.linfNames)return exactNames(sel.linfNames,master.filter(x=>x.system==='linfatico'));
 if(sel.circNames)return exactNames(sel.circNames,master.filter(x=>x.system==='circulatorio'));
 if(sel.mixedNames){
   const pool=[...master,...pulmonary]; return exactNames(sel.mixedNames,pool);
 }
 return [];
}
function targetKey(caseId,phaseIdx,t){return [caseId,phaseIdx,t.system,t.code,t.name].join('|')}
function targetState(caseId,phaseIdx,t){return state.targets[targetKey(caseId,phaseIdx,t)]||{done:false,status:''}}
function phaseTargets(c,idx){return resolveSelector(c.phases[idx]?.selector||{})}
function phaseCompletion(c,idx){const list=phaseTargets(c,idx);if(!list.length)return {done:0,total:0,pct:0};const done=list.filter(t=>targetState(c.id,idx,t).done).length;return {done,total:list.length,pct:Math.round(done/list.length*100)}}
function caseCompletion(c){let total=0,done=0;c.phases.forEach((p,i)=>{const pc=phaseCompletion(c,i);total+=pc.total;done+=pc.done});return {done,total,pct:total?Math.round(done/total*100):0}}
function sessionCompletion(s){const done=s.cases.filter(c=>state.completedCases[c.id]).length;return {done,total:s.cases.length,pct:Math.round(done/s.cases.length*100)}}
function globalCompletion(){const all=sessions.flatMap(s=>s.cases),done=all.filter(c=>state.completedCases[c.id]).length;return {done,total:all.length,pct:Math.round(done/all.length*100)}}

function renderHome(){
 const g=globalCompletion();$('#caseDone').textContent=g.done;$('#globalPct').textContent=g.pct+'%';
 $('#sessionGrid').innerHTML=sessions.map(s=>{const p=sessionCompletion(s),visual=sessionVisual(s);return `<article class="session-card" data-num="${s.number}"><div class="session-thumb"><img src="${visual}" alt="Painel visual da aula ${s.number}" loading="lazy"><span class="session-scanline"></span></div><div class="session-card-body"><span class="tag">AULA ${s.number} • ${s.duration} MIN</span><h3>${esc(s.title)}</h3><p><b>${esc(s.subtitle)}</b><br>${esc(s.intro)}</p><div class="bar"><i style="width:${p.pct}%"></i></div><div class="meta"><span>${p.done}/${p.total} casos</span><span>${p.pct}%</span></div><button data-open-session="${s.id}" class="soft-action">${p.done?'Continuar arquivo':'Abrir arquivo'} <span aria-hidden="true">→</span></button></div></article>`}).join('');
}
function showOnly(id){['homeView','sessionView','caseView'].forEach(v=>$('#'+v).classList.toggle('hidden',v!==id));window.scrollTo({top:0,behavior:'smooth'})}
function openSession(id){currentSession=sessions.find(s=>s.id===id);if(!currentSession)return;state.last={session:id};save();timerSec=currentSession.duration*60;stopTimer();updateTimer();$('#sessionKicker').textContent=`AULA ${currentSession.number} • ${currentSession.subtitle}`;$('#sessionTitle').textContent=currentSession.title;$('#sessionIntro').textContent=currentSession.intro;const cover=$('#sessionCoverImage');if(cover){cover.src=sessionVisual(currentSession);cover.alt=`Painel visual — ${currentSession.title}`;}renderCases();showOnly('sessionView')}
function renderCases(){
 $('#caseGrid').innerHTML=currentSession.cases.map((c,i)=>{const p=caseCompletion(c),done=!!state.completedCases[c.id],img=c.image||sessionVisual(currentSession);return `<article class="case-card ${done?'done':''}"><div class="case-thumb"><img src="${img}" alt="Evidência visual do caso ${String(i+1).padStart(2,'0')}" loading="lazy"><span class="case-stamp">${done?'ENCERRADO':'EVIDÊNCIA'}</span></div><div class="case-card-body"><span class="case-no">CASO ${String(i+1).padStart(2,'0')} • ${c.id}</span><h3>${esc(c.title)}</h3><p>${esc(c.patient)}</p><div class="mini-progress">${p.done}/${p.total} estruturas verificadas • ${p.pct}%</div><button data-open-case="${c.id}" class="soft-action">${done?'Reabrir caso':p.done?'Continuar caso':'Iniciar caso'} <span aria-hidden="true">→</span></button></div></article>`}).join('');
}
function openCase(id,phase=0){currentCase=currentSession?.cases.find(c=>c.id===id)||sessions.flatMap(s=>s.cases).find(c=>c.id===id);if(!currentCase)return;if(!currentSession)currentSession=sessions.find(s=>s.cases.some(c=>c.id===id));currentPhase=Math.min(phase,currentCase.phases.length-1);state.last={session:currentSession.id,case:id,phase:currentPhase};save();$('#caseCode').textContent=`ARQUIVO ${currentSession.number} • ${currentCase.id}`;$('#caseTitle').textContent=currentCase.title;$('#casePatient').textContent=currentCase.patient;$('#caseQuestion').textContent=currentCase.question;$('#caseImage').src=currentCase.image||'';$('#caseFigure').classList.toggle('hidden',!currentCase.image);renderPhase();showOnly('caseView')}
function renderPhase(){
 const p=currentCase.phases[currentPhase],targets=phaseTargets(currentCase,currentPhase),pc=phaseCompletion(currentCase,currentPhase);
 $('#caseProgressText').textContent=`Caso ${currentCase.id} • etapa ${currentPhase+1}/${currentCase.phases.length}`;$('#phaseCount').textContent=`ETAPA ${currentPhase+1}/${currentCase.phases.length}`;$('#phaseTitle').textContent=p.title;$('#phasePrompt').textContent=p.prompt;$('#phasePct').textContent=pc.pct+'%';$('#hintBox').classList.add('hidden');$('#hintBox').textContent='';
 $('#prevPhase').disabled=currentPhase===0;$('#completePhase').textContent=currentPhase===currentCase.phases.length-1?'Encerrar caso ✓':'Concluir etapa →';
 const noteKey=`${currentCase.id}|${currentPhase}`;$('#phaseNote').value=state.notes[noteKey]||'';
 $('#teacherText').innerHTML=`<b>Condução sugerida:</b> peça primeiro uma relação anatômica, depois o nome. ${esc(p.hint1)} ${esc(p.hint2)}`;
 $('#teacherCard').classList.toggle('hidden',!teacher);
 $('#targetList').innerHTML=targets.map(t=>targetRow(t)).join('');
 updatePhaseProgress();
}
function targetRow(t){const s=targetState(currentCase.id,currentPhase,t),label=t.system==='pulmao'?'Pulmão completo':(t.systemLabel||t.system);return `<div class="target-row ${s.done?'done':''}" data-system="${esc(t.system)}" data-code="${esc(t.code)}" data-name="${esc(t.name)}"><input class="target-check" type="checkbox" ${s.done?'checked':''} aria-label="Verificar ${esc(t.name)}"><div class="target-name"><b>${esc(t.name)}</b><span>${esc(label)} • ${esc(t.code)}</span></div><select class="status-select" aria-label="Visibilidade na peça"><option value="">Na peça...</option><option value="visivel" ${s.status==='visivel'?'selected':''}>Visível</option><option value="parcial" ${s.status==='parcial'?'selected':''}>Parcial</option><option value="nao" ${s.status==='nao'?'selected':''}>Não visível</option></select><button class="support-mini" type="button">Apoio</button></div>`}
function findTargetFromRow(row){const system=row.dataset.system,code=row.dataset.code,name=row.dataset.name;return [...master,...pulmonary].find(t=>t.system===system&&String(t.code)===String(code)&&t.name===name)}
function updatePhaseProgress(){const pc=phaseCompletion(currentCase,currentPhase);$('#phasePct').textContent=pc.pct+'%'}
function completePhase(){const pc=phaseCompletion(currentCase,currentPhase);if(pc.total&&pc.done<pc.total&&!confirm(`Ainda faltam ${pc.total-pc.done} estruturas nesta etapa. Deseja avançar mesmo assim?`))return;if(currentPhase<currentCase.phases.length-1){currentPhase++;state.last={session:currentSession.id,case:currentCase.id,phase:currentPhase};save();renderPhase();window.scrollTo({top:0,behavior:'smooth'});return}state.completedCases[currentCase.id]=true;save();toast('Caso encerrado. Laudo anatômico concluído.');renderCases();renderHome();setTimeout(()=>{showOnly('sessionView')},650)}

function atlasHref(t){if(t.system==='pulmao')return '../sistemas/respiratorio/index.html';return `../sistemas/${t.system}/index.html?q=${encodeURIComponent(t.name)}`}
function supportFor(t){
 if(t.system==='pulmao')return pulmonarySupport(t);
 const sys=window.CASE_SUPPORT?.[t.system]||{};
 let info=sys[`${t.code}:${t.name}`]||sys[String(t.code)]||{};
 return {location:info.location||fallbackLocation(t),role:info.role||fallbackRole(t),piece:pieceGuide(t),confuse:notConfuse(t)};
}
function pulmonarySupport(t){const n=norm(t.name),g=t.group;let location='',role='',piece='';
 if(g.includes('Brônquios')){location='Na árvore brônquica, distal à carina; os brônquios lobares seguem para os lobos e os segmentares para segmentos broncopulmonares.';role='Conduzem o ar e organizam a ventilação por lobos e segmentos.';piece='Comece pela carina, identifique o brônquio principal e siga a hierarquia principal → lobar → segmentar.'}
 else if(g==='Pulmões'||g.includes('Pulmão ')){location='Na superfície ou face mediastinal dos pulmões dentro das cavidades pulmonares.';role='Orienta lobos, faces, fissuras, hilo/raiz e relações mediastinais.';piece='Primeiro determine direita/esquerda pelos lobos e fissuras; depois oriente ápice, base, faces e hilo.'}
 else if(g==='Pleuras'){location='Ao redor dos pulmões e na parede da cavidade torácica, mediastino e diafragma.';role='Permitem deslizamento pulmonar e delimitam recessos pleurais importantes.';piece='Pleura visceral acompanha diretamente a superfície pulmonar; a parietal reveste parede, mediastino, diafragma e cúpula.'}
 else if(g==='Vasos pulmonares'){location='Na raiz/hilo e no interior do pulmão, acompanhando ou relacionando-se à árvore brônquica.';role='Vasos pulmonares participam da circulação de troca gasosa; vasos bronquiais irrigam tecidos de sustentação e vias aéreas.';piece='Comece pelo hilo: identifique brônquio, artéria pulmonar e veias pulmonares; depois siga ramos lobares/segmentares quando preservados.'}
 else if(g==='Nervos'){location='Ao redor da raiz pulmonar, mediastino e parede torácica, conforme o nervo.';role='Controlam funções autonômicas, sensibilidade e relações torácicas dos pulmões e pleuras.';piece='Use raiz pulmonar, pericárdio, cadeia simpática e espaços intercostais como marcos.'}
 else {location='Nos plexos e cadeias linfáticas do pulmão, hilo, carina, traqueia e mediastino.';role='Drenam linfa do pulmão em direção aos troncos broncomediastinais.';piece='Procure em sequência: pulmão → hilo → carina → paratraqueais → tronco broncomediastinal.'}
 if(n.includes('fissura horizontal')){location='Somente no pulmão direito, separando lobos superior e médio.';role='Delimita os lobos superior e médio do pulmão direito.';piece='Se houver fissura horizontal, o pulmão é direito. Ela encontra a fissura oblíqua lateralmente.'}
 if(n.includes('lingula')){location='Projeção anteroinferior do lobo superior esquerdo, abaixo da incisura cardíaca.';role='Parte do lobo superior esquerdo, anatomicamente comparável à região do lobo médio direito.';piece='Procure na margem anterior do pulmão esquerdo, junto à incisura cardíaca.'}
 if(n.includes('hilo pulmonar')){location='Na face mediastinal do pulmão.';role='É a área por onde estruturas da raiz entram e saem do pulmão.';piece='Oriente a face mediastinal e procure a depressão/área de passagem dos elementos da raiz.'}
 if(n.includes('raiz do pulmao')){location='Conjunto de estruturas que conecta o pulmão ao mediastino através do hilo.';role='Conduz brônquios, vasos, nervos e linfáticos entre mediastino e pulmão.';piece='Diferencie: hilo é a área; raiz é o conjunto de estruturas que a atravessa.'}
 return {location,role,piece,confuse:notConfuse(t)};
}
function fallbackLocation(t){const g=t.group||t.block||'';if(t.system==='respiratorio')return `Na região ${g.toLowerCase()} indicada pelo roteiro respiratório.`;if(t.system==='circulatorio')return `Na região cardíaca/mediastinal correspondente ao grupo ${g}.`;return `Na região anatômica correspondente ao bloco ${t.block||g} do sistema linfático.`}
function fallbackRole(t){if(t.system==='respiratorio')return 'Participa da condução, proteção ou função mecânica das vias respiratórias conforme sua região.';if(t.system==='circulatorio')return 'Participa da estrutura, irrigação, drenagem ou inervação cardiovascular conforme o item.';return 'Participa da defesa imune, filtragem ou drenagem linfática conforme o item.'}
function pieceGuide(t){const n=norm(t.name),g=norm(t.group||t.block||'');
 if(n.includes('carina'))return 'Siga a traqueia inferiormente até a bifurcação; a carina é a crista interna entre os brônquios principais.';
 if(n.includes('ducto toracico'))return 'Procure no mediastino posterior, usando esôfago, aorta e sistema ázigos como marcos; superiormente, siga para o ângulo venoso esquerdo.';
 if(n.includes('bronco')&&n.includes('linfonod'))return 'Use o hilo pulmonar e a raiz do pulmão como marcos; os broncopulmonares ficam no hilo.';
 if(n.includes('traqueobron'))return 'Use a carina e os brônquios principais: inferiores são subcarinais; superiores ficam acima da origem dos brônquios.';
 if(n.includes('paratraque'))return 'Localize a traqueia e procure a cadeia de linfonodos ao longo de suas faces laterais.';
 if(n.includes('veia marginal direita'))return 'Oriente a face anterior/direita do coração e siga a margem aguda do ventrículo direito.';
 if(n.includes('seio coronario'))return 'Vire o coração para a face posterior e procure o sulco coronário posterior entre átrio e ventrículo.';
 if(n.includes('nervo frenico'))return 'No tórax, procure o nervo descendo sobre o pericárdio, anterior à raiz do pulmão.';
 if(n.includes('timo'))return 'Abra o mediastino anterior/superior: procure tecido atrás do esterno e anterior aos grandes vasos.';
 if(n.includes('baco')||n.includes('esplen'))return 'Oriente o hipocôndrio esquerdo: face lisa para o diafragma; face visceral contém hilo e impressões.';
 if(n.includes('apendice'))return 'No ceco, siga as três tênias do cólon até o ponto de convergência na base do apêndice.';
 if(g.includes('nariz'))return 'Oriente anterior/posterior e linha média; use abertura piriforme, septo, conchas e meatos como marcos.';
 if(g.includes('faringe'))return 'Primeiro separe naso-, oro- e laringofaringe; depois localize músculos e pregas por suas relações.';
 if(g.includes('laringe'))return 'Use hioide superiormente, cartilagem tireoidea anteriormente, cricoide inferiormente e traqueia como continuidade.';
 if(g.includes('coron'))return 'Oriente sulco coronário e sulcos interventriculares; siga os vasos epicárdicos nesses trajetos.';
 if(g.includes('peric'))return 'Use saco pericárdico, grandes vasos e diafragma como referências; algumas estruturas podem estar parcialmente removidas.';
 return 'Primeiro identifique a região e um marco anatômico estável; depois indique onde a estrutura deveria estar, mesmo que não esteja preservada na peça.';
}
function notConfuse(t){const n=norm(t.name);
 if(n.includes('pulmonar')&&!n.includes('bronco')&&t.system==='linfatico')return 'Linfonodos pulmonares ficam dentro do pulmão; broncopulmonares ficam no hilo.';
 if(n.includes('bronco')&&t.system==='linfatico')return 'Broncopulmonares = hilo; traqueobrônquicos = região da bifurcação/bronquios principais.';
 if(n.includes('pleura visceral'))return 'Não confundir com pleura parietal: a visceral adere à superfície pulmonar.';
 if(n.includes('fissura horizontal'))return 'Não procurar no pulmão esquerdo: a fissura horizontal é característica do pulmão direito.';
 if(n.includes('hilo'))return 'Hilo é a área de passagem; raiz/pedículo é o conjunto de estruturas que atravessa essa área.';
 if(n.includes('veia')&&n.includes('cardiac'))return 'Confirme pelo sulco e pela artéria acompanhante; nomes venosos podem parecer semelhantes.';
 return 'Compare sempre posição, vizinhos e trajeto; não use apenas cor ou formato como critério.';
}
function openSupport(t){const info=supportFor(t);$('#supportResults').classList.add('hidden');$('#supportSearchWrap').classList.add('hidden');const d=$('#supportDetail');d.classList.remove('hidden');d.innerHTML=`<button class="support-back">← Voltar à busca</button><h3>${esc(t.name)}</h3><div class="support-block"><span>LOCALIZAÇÃO</span><p>${esc(info.location)}</p></div><div class="support-block"><span>COMO PROCURAR NA PEÇA</span><p>${esc(info.piece)}</p></div><div class="support-block"><span>FUNÇÃO / IMPORTÂNCIA</span><p>${esc(info.role)}</p></div><div class="support-block"><span>NÃO CONFUNDIR</span><p>${esc(info.confuse)}</p></div><div class="support-links"><a href="${atlasHref(t)}" target="_blank" rel="noopener">Abrir atlas de apoio ↗</a></div>`;d.querySelector('.support-back').onclick=showSupportSearch;if(!$('#supportDialog').open)$('#supportDialog').showModal()}
function showSupportSearch(){ $('#supportDetail').classList.add('hidden');$('#supportResults').classList.remove('hidden');$('#supportSearchWrap').classList.remove('hidden');renderSupportResults($('#supportSearch').value)}
function supportPool(){return [...master,...pulmonary]}
function renderSupportResults(q=''){const nq=norm(q);let pool=supportPool().filter(t=>!nq||norm(t.name+' '+t.code+' '+(t.group||'')).includes(nq));pool=pool.slice(0,80);$('#supportResults').innerHTML=pool.length?pool.map((t,i)=>`<div class="support-result" data-i="${i}"><span>${esc(t.code)}</span><b>${esc(t.name)}</b><button>Consultar</button></div>`).join(''):'<p style="color:#92a8b6">Nenhuma estrutura encontrada.</p>';$$('.support-result').forEach((el,i)=>el.querySelector('button').onclick=()=>openSupport(pool[i]))}

function currentAtlasHref(){const targets=phaseTargets(currentCase,currentPhase);return targets.length?atlasHref(targets[0]):'../index.html'}
function startTimer(){if(timerHandle)return;timerHandle=setInterval(()=>{timerSec=Math.max(0,timerSec-1);updateTimer();if(timerSec===0){stopTimer();toast('Tempo da aula encerrado.') }},1000);$('#timerToggle').textContent='Ⅱ Pausar'}
function stopTimer(){if(timerHandle){clearInterval(timerHandle);timerHandle=null}$('#timerToggle').textContent='▶ Iniciar'}
function updateTimer(){const m=Math.floor(timerSec/60),s=timerSec%60;$('#timer').textContent=`${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`}

$('#sessionGrid').addEventListener('click',e=>{const b=e.target.closest('[data-open-session]');if(b)openSession(b.dataset.openSession)});
$('#caseGrid').addEventListener('click',e=>{const b=e.target.closest('[data-open-case]');if(b)openCase(b.dataset.openCase)});
$('#backHome').onclick=()=>{renderHome();showOnly('homeView')};$('#backSession').onclick=()=>{renderCases();showOnly('sessionView')};
$('#continueBtn').onclick=()=>{const last=state.last;if(last?.session){openSession(last.session);if(last.case)openCase(last.case,last.phase||0)}else openSession(sessions[0].id)};
$('#randomBtn').onclick=()=>{const all=sessions.flatMap(s=>s.cases.map(c=>({s,c}))),pick=all[Math.floor(Math.random()*all.length)];openSession(pick.s.id);openCase(pick.c.id)};
$('#teacherBtn').onclick=()=>{teacher=!teacher;document.body.classList.toggle('teacher-mode',teacher);$('#teacherBtn').setAttribute('aria-pressed',String(teacher));$('#teacherCard')?.classList.toggle('hidden',!teacher);if(teacher&&currentCase)renderPhase();toast(teacher?'Modo docente ativado':'Modo docente desativado')};
$('#hint1Btn').onclick=()=>{const p=currentCase.phases[currentPhase];$('#hintBox').textContent=p.hint1;$('#hintBox').classList.remove('hidden')};
$('#hint2Btn').onclick=()=>{const p=currentCase.phases[currentPhase];$('#hintBox').textContent=p.hint2;$('#hintBox').classList.remove('hidden')};
$('#atlasBtn').onclick=()=>window.open(currentAtlasHref(),'_blank','noopener');
$('#prevPhase').onclick=()=>{if(currentPhase>0){currentPhase--;renderPhase()}};$('#completePhase').onclick=completePhase;
$('#phaseNote').addEventListener('input',e=>{state.notes[`${currentCase.id}|${currentPhase}`]=e.target.value;save()});
$('#targetList').addEventListener('change',e=>{const row=e.target.closest('.target-row');if(!row)return;const t=findTargetFromRow(row);if(!t)return;const key=targetKey(currentCase.id,currentPhase,t),s=state.targets[key]||{done:false,status:''};if(e.target.matches('.target-check'))s.done=e.target.checked;if(e.target.matches('.status-select'))s.status=e.target.value;state.targets[key]=s;save();row.classList.toggle('done',s.done);updatePhaseProgress();renderHome()});
$('#targetList').addEventListener('click',e=>{const b=e.target.closest('.support-mini');if(!b)return;const t=findTargetFromRow(b.closest('.target-row'));if(t)openSupport(t)});
$('#supportBtn').onclick=()=>{showSupportSearch();$('#supportDialog').showModal();setTimeout(()=>$('#supportSearch').focus(),100)};$('#supportClose').onclick=()=>$('#supportDialog').close();$('#supportSearch').addEventListener('input',e=>renderSupportResults(e.target.value));
$('#timerToggle').onclick=()=>timerHandle?stopTimer():startTimer();$('#timerReset').onclick=()=>{stopTimer();timerSec=(currentSession?.duration||50)*60;updateTimer()};

const introVideo=$('#introVideo'),videoToggle=$('#videoToggle');
if(introVideo&&videoToggle){
  const reduced=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  if(reduced){introVideo.pause();videoToggle.textContent='▶ Reproduzir cena';videoToggle.setAttribute('aria-pressed','true');}
  videoToggle.onclick=()=>{
    if(introVideo.paused){introVideo.play().catch(()=>{});videoToggle.textContent='❚❚ Pausar cena';videoToggle.setAttribute('aria-pressed','false');}
    else{introVideo.pause();videoToggle.textContent='▶ Reproduzir cena';videoToggle.setAttribute('aria-pressed','true');}
  };
}

renderHome();renderSupportResults('');
})();
