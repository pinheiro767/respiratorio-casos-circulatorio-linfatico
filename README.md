# Atlas Integrado de Anatomia Humana

PWA que reúne em um único pacote os roteiros de **Sistema Respiratório**, **Sistema Circulatório** e **Sistema Linfático**.

## Conteúdo
- Respiratório: 92 alvos (1–92)
- Circulatório: 69 alvos (57–125, conforme o atlas fornecido)
- Linfático: 53 alvos
- Total no roteiro mestre: 214 alvos

## Recursos
- Painel inicial integrado
- Busca global nos três roteiros
- Roteiro mestre imprimível / salvável em PDF
- Progresso geral e por sistema
- Módulos especializados preservados, com imagens, zoom, anotações e anexos
- PWA instalável e cache offline progressivo

## GitHub Pages
1. Descompacte o ZIP.
2. Envie **todo o conteúdo desta pasta** para a raiz do repositório.
3. Em Settings → Pages, publique a branch principal a partir de `/ (root)`.
4. Aguarde o GitHub Pages gerar o endereço.

> Observação: os módulos não registram service workers próprios nesta versão; todo o pacote é controlado pelo service worker da raiz, evitando conflito entre caches.

## Atualização v3
Foram acrescentadas três peças anatômicas ao módulo respiratório:
- nasofaringe: óstio faríngeo da tuba auditiva, toro tubário, prega salpingofaríngea e recesso faríngeo;
- faringe: constritores superior, médio e inferior e músculo estilofaríngeo;
- cavidade nasal: hiato semilunar, bolha etmoidal, conchas nasais e seio frontal.


Atualização v4: adicionadas novas pranchas de cavidade nasal, cartilagem tireoidea/posição da laringe e músculos da laringe.


Atualização v5: adicionadas novas imagens do baço, apêndice vermiforme, retroperitônio linfático, tórax anterior, região inguinal, pescoço lateral e pulmões.


Atualização v6: reorganização do módulo Linfático. As pranchas de axila, mama, pescoço, tórax, retroperitônio, pelve, região inguinal, baço e apêndice passam a aparecer explicitamente dentro do Atlas regional do sistema linfático, mantendo separados apenas os 53 alvos numerados do roteiro oficial.


Atualização v7: adicionada aba complementar “Pulmões (Moore)” no módulo Respiratório, corrigindo fissuras, lobos, língula, ápice e face diafragmática conforme Moore.


Atualização v8: corrigida a associação das imagens regionais do sistema linfático. Linfonodos axilares e inguinais deixaram de estar invertidos; também foram restauradas as pranchas corretas de mama, pelve/linfonodos ilíacos externos e terminação cervical do ducto torácico.


Atualização v9: cada imagem oficial do roteiro passa a exibir explicação didática com **Localização** e **Função / importância**. O recurso foi aplicado aos módulos Respiratório, Circulatório e Linfático e também aparece nos PDFs dos módulos que possuem exportação estruturada.


Atualização v10: **Localização** e **Função / importância** foram adicionadas a cada estrutura/nome do roteiro nos três sistemas (Respiratório, Linfático e Circulatório), e não apenas às imagens. Os subitens do roteiro respiratório também receberam explicações quando listados.


Atualização v11: corrigido o acesso à aba Pulmões (Moore) e incluídas Localização e Função/Importância em cada estrutura pulmonar da aba.

## Atualização v12 — Central de Casos Anatômicos
Foi acrescentado um modo de revisão guiada exclusivamente pelo PWA, em formato de investigação clínica, planejado para 5 aulas consecutivas de aproximadamente 50 minutos:

1. **A via aérea deixou pistas** — cobre Respiratório 1–92.
2. **O pulmão inteiro é a cena** — complemento pulmonar 93–157, incluindo brônquios, lobos/fissuras, pleuras, vasos, nervos e drenagem linfática.
3. **O coração revela a rota** — cobre Circulatório 57–125.
4. **A linfa denuncia o caminho** — cobre os 53 alvos do Sistema Linfático.
5. **Unidade de Casos Integrados** — casos mistos dos três sistemas.

### Recursos da Central de Casos
- 25 histórias clínicas curtas, cinco por aula.
- Etapas sequenciais com checklists anatômicos.
- Para cada estrutura: status na peça (visível, parcial ou não visível).
- Campo para registrar o marco anatômico usado pelo grupo.
- Pistas graduais.
- Apoio anatômico instantâneo com localização, função/importância, como procurar na peça e o que não confundir.
- Link direto para o atlas do sistema correspondente.
- Modo docente para consulta rápida durante a condução da aula.
- Cronômetro de 50 minutos por aula.
- Progresso salvo localmente no navegador.
- Funcionamento offline progressivo pelo service worker da raiz.

Não são necessários sprites para o funcionamento da dinâmica: a identidade visual usa prontuários, evidências, etapas e laudos em estilo de investigação clínica.

## Atualização v13 — interface investigativa imersiva
- Incluídos os quatro painéis visuais produzidos para a investigação: dossiê geral, sistema respiratório, sistema circulatório e sistema linfático corrigido.
- Incluída a abertura em vídeo no painel inicial dos casos clínicos, com reprodução sem áudio e controle de pausa.
- Cards das cinco aulas agora usam capas visuais próprias; cards dos casos mostram evidências anatômicas.
- Botões receberam interação mais macia (hover, pressão, foco e sombras suaves).
- Layout dos casos, alvos anatômicos, cronômetro, painel docente e apoio anatômico foi refinado para desktop, tablet e celular.
- Cache PWA atualizado para v13 e inclui os novos materiais visuais para uso offline.


## Atualização v14 — laudo anatômico cinematográfico
- Ao encerrar cada caso, o aluno não volta imediatamente à lista: recebe uma tela de **CASO ENCERRADO / LAUDO ANATÔMICO**.
- O laudo mostra número de estruturas verificadas, visíveis, parciais e não visíveis/inferidas por marcos anatômicos.
- Lista todas as estruturas-chave do caso com o status registrado pela equipe.
- Reúne os marcos anatômicos digitados durante as etapas.
- Inclui botões para próximo caso, retorno ao arquivo e impressão/salvamento em PDF.
- Quando todos os 25 casos forem concluídos, o último laudo exibe **INVESTIGAÇÃO GERAL CONCLUÍDA**.
- Cache offline atualizado para v14.
