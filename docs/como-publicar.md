# Como publicar o site

O site é um conjunto de arquivos estáticos. Publicar significa gerar a pasta `dist/` e colocá-la
em um servidor web — não há aplicação em execução, banco de dados nem processo para reiniciar.

Comandos e variáveis usados aqui estão descritos na
[referência dos comandos](referencia-comandos.md).

## Como publicar uma alteração de conteúdo

O ambiente de homologação em GitHub Pages publica sozinho a cada alteração aprovada:

1. Envie sua branch e abra um pull request.
2. Peça revisão ao EGP.
3. Após o merge em `main`, o workflow `Publicar site` constrói e publica.
4. Em cerca de dois minutos, confira <https://ifesserra-lab.github.io/egp/>.

Antes de pedir a revisão, rode `npm run verify` na sua máquina: ele confere tipos, conteúdo,
links internos e acessibilidade. O desempenho roda à parte, com `npm run test:perf`.

## Como acompanhar ou refazer uma publicação

Abra <https://github.com/ifesserra-lab/egp/actions>. Cada execução mostra os passos e o log.

Para publicar de novo sem alterar nada, abra o workflow `Publicar site` e use **Run workflow**.

## Como mudar o endereço do site

O endereço é definido por duas variáveis no build, não no código. Para apontar o site para o
domínio institucional:

1. Em `.github/workflows/publicar.yml`, altere `SITE_URL` e `SITE_BASE`.
2. Em `public/robots.txt`, atualize a linha `Sitemap:`.
3. Faça o merge em `main` e confira o site publicado.

Se o site passar a ser servido na raiz do domínio, `SITE_BASE` vale `/`.

## Como gerar o pacote para a CTI publicar

Para entregar o site pronto ao ambiente oficial:

```bash
SITE_URL=https://endereco-definido-pela-cti SITE_BASE=/ npm run build
tar -czf site-egp.tar.gz -C dist .
```

Entregue `site-egp.tar.gz` com a instrução: descompactar em um diretório servido por HTTPS e
garantir que endereços inexistentes respondam com `404.html`.

## Como verificar o site publicado

```bash
curl -I https://ifesserra-lab.github.io/egp/
```

Confira também uma rota interna e um endereço inexistente: o primeiro deve responder `200` e o
segundo, `404`.
