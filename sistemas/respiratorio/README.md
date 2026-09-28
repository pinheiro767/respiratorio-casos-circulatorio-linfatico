# Atlas Respiratório Imersivo — PWA

PWA educacional de Anatomia Humana, organizado a partir do roteiro do Sistema Respiratório (estruturas 1–92).

## Recursos

- 19 blocos anatômicos, preservando a numeração 1–92.
- Galerias com as imagens selecionadas durante a construção do atlas.
- Busca por número, estrutura ou subitem.
- Filtros por Nariz, Faringe, Laringe e Traqueia.
- Marcação de progresso estrutura por estrutura.
- Subitens expansíveis do roteiro.
- Anotações por bloco.
- Upload de imagens pelo aluno, armazenadas localmente em IndexedDB.
- Backup/importação de progresso, notas e anexos em JSON.
- Exportação de relatório com ou sem imagens oficiais, anexos e notas; o navegador abre o diálogo de impressão para **Salvar como PDF**.
- Acessibilidade: texto ampliado, alto contraste e modo roteiro sem imagens.
- Instalável como PWA e utilizável offline após o primeiro carregamento.

## Publicar no GitHub Pages

1. Crie um repositório no GitHub.
2. Envie **todo o conteúdo desta pasta** para a raiz do repositório.
3. Em **Settings → Pages**, selecione **Deploy from a branch**.
4. Escolha a branch `main` e a pasta `/ (root)`.
5. Salve e aguarde a publicação.

O projeto usa caminhos relativos, portanto funciona tanto em `usuario.github.io/repositorio/` quanto em um domínio próprio.

## Dados do aluno

Progresso, notas e imagens anexadas são salvos apenas no navegador/dispositivo. Eles não são enviados para servidor. Para migrar os dados, use **Backup → Exportar backup**.

## Observação sobre imagens

As pranchas deste pacote foram fornecidas para composição do material didático. Antes de publicar o repositório de forma pública, confirme que você possui permissão ou licença para redistribuir cada imagem utilizada. Caso necessário, substitua as imagens em `assets/images/` mantendo os mesmos nomes de arquivo.

## Atualização de conteúdo

O roteiro está em `data.js`. Para trocar uma prancha sem alterar o código, substitua o arquivo correspondente em `assets/images/` pelo novo arquivo com o mesmo nome.
