# Publicação do site

O site é estático: o build gera arquivos HTML, CSS e imagens em `dist/`. Não há servidor de
aplicação, banco de dados nem processo em execução — basta servir a pasta.

## Gerar o artefato

```bash
npm install
npm run verify   # tipos, build e links internos
npm run build    # gera dist/
```

## Variáveis de ambiente

O endereço definitivo ainda não foi confirmado pela CTI. Até lá, o build usa um valor
provisório. Quando o domínio existir, defina antes do build:

| Variável | Para que serve | Exemplo |
| --- | --- | --- |
| `SITE_URL` | URL canônica, usada em `<link rel="canonical">` e no `sitemap.xml` | `https://serra.ifes.edu.br/egp` |
| `SITE_BASE` | Subdiretório, quando o site não fica na raiz do domínio | `/egp` |

```bash
SITE_URL=https://serra.ifes.edu.br/egp SITE_BASE=/egp npm run build
```

Depois de definir o domínio, atualize também a linha `Sitemap:` em `public/robots.txt`.

## Publicar no ambiente da CTI

1. Gere o `dist/` com as variáveis corretas.
2. Copie o conteúdo de `dist/` para o diretório servido pelo servidor web da CTI.
3. Confirme que o servidor entrega `404.html` para endereços inexistentes.

Requisitos do ambiente: servir arquivos estáticos com HTTPS. Nenhum recurso é carregado de
terceiros — fontes, estilos e imagens saem do próprio domínio.

## Depois de publicar

```bash
npm run preview     # em outro terminal
npm run test:a11y   # acessibilidade WCAG 2.1 AA
npm run test:perf   # desempenho, Lighthouse >= 95
```
