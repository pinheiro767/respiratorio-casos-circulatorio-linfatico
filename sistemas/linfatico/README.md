# Atlas Linfático Imersivo — PWA

Aplicativo web progressivo didático baseado no **Roteiro prático — Anatomia Humana — Sistema Linfático** fornecido para a construção do projeto.

## Recursos

- 11 blocos do roteiro, preservando a hierarquia e a terminologia do arquivo-base.
- Pranchas anatômicas selecionadas durante a construção do atlas.
- Busca por estrutura/código e filtros por tema.
- Progresso de estudo salvo no dispositivo.
- Anotações por bloco.
- Upload de imagens/fotos do aluno com armazenamento local (IndexedDB).
- Visualização ampliada com zoom.
- Geração de relatório para **Salvar como PDF**, com opções de incluir/excluir imagens oficiais, imagens anexadas e anotações.
- Backup/importação dos dados de estudo.
- PWA instalável e funcionamento offline após o primeiro carregamento.
- Galeria complementar de linfonodos regionais, separada do roteiro oficial.

## Publicar no GitHub Pages

1. Crie um repositório no GitHub.
2. Envie **todo o conteúdo desta pasta para a raiz do repositório**.
3. No GitHub: **Settings → Pages**.
4. Em **Build and deployment**, escolha **Deploy from a branch**.
5. Selecione a branch `main` e a pasta `/ (root)`.
6. Salve e aguarde o endereço do GitHub Pages.

O `manifest.webmanifest`, `sw.js` e `.nojekyll` já estão incluídos.

## Observação sobre imagens

As pranchas foram fornecidas durante a construção do atlas. Antes de tornar o repositório público, confirme as permissões/licenças de reprodução de cada imagem. Itens marcados como **Imagem parcial** permanecem no roteiro, mas a prancha disponível não individualiza necessariamente todos os detalhes anatômicos daquele bloco.

## Privacidade

Progresso, notas e imagens anexadas pelo aluno permanecem localmente no navegador/dispositivo, salvo quando o próprio usuário exporta um backup ou PDF.


Atualização v9: cada imagem oficial do roteiro passa a exibir explicação didática com **Localização** e **Função / importância**. O recurso foi aplicado aos módulos Respiratório, Circulatório e Linfático e também aparece nos PDFs dos módulos que possuem exportação estruturada.
