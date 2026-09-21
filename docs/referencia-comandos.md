# Referência dos comandos

Comandos, variáveis e estrutura do projeto. Requer Node.js 22 ou superior.

## Comandos

| Comando | Efeito |
| --- | --- |
| `npm install` | Instala as dependências do projeto |
| `npm run dev` | Servidor de desenvolvimento em `http://localhost:4321`, com atualização automática |
| `npm run build` | Gera o site em `dist/` e valida todo o conteúdo |
| `npm run preview:start` | Serve `dist/` em segundo plano, em `http://localhost:4321` |
| `npm run preview:stop` | Encerra o servidor iniciado por `preview:start` |
| `npm run check` | Verifica tipos e conteúdo sem gerar o site |
| `npm run test:links` | Verifica links internos; exige o site servido |
| `npm run test:a11y` | Audita acessibilidade WCAG 2.1 AA em todas as rotas; exige o site servido |
| `npm run test:perf` | Mede desempenho com Lighthouse; exige `dist/` gerado |
| `npm run verify` | Encadeia `check`, `build`, `test:links` e `test:a11y` |

## Variáveis de ambiente

Lidas no momento do build.

| Variável | Padrão | Efeito |
| --- | --- | --- |
| `SITE_URL` | `https://exemplo-pendente.ifes.edu.br` | Origem usada na URL canônica e no `sitemap.xml` |
| `SITE_BASE` | `/` | Subdiretório em que o site é servido |

No workflow de publicação, valem `https://ifesserra-lab.github.io` e `/egp`.

## Rotas publicadas

| Rota | Conteúdo |
| --- | --- |
| `/` | Missão, identidades institucionais, cartões dos pilares e canais |
| `/sobre` | Apresentação, vínculo, portaria e modelo operacional |
| `/servicos` | Os quatro pilares, com objetivo, atividades e entregáveis |
| `/fluxos` | Regra de Ouro e os quatro fluxos, com a camada "So What?" |
| `/limites` | Tabela comparativa de fronteiras de responsabilidade |
| `/ecossistema` | Parque Alvo Serra, Núcleo Incubador e divisão EGP/Agifes |
| `/contato` | Canais oficiais e sua situação |
| `/404` | Página de endereço não encontrado |

Âncoras seguem o identificador do item: `/servicos#gestao-de-portfolio`,
`/fluxos#hospital-de-projetos`, `/ecossistema#nucleo-incubador`.

## Estrutura de pastas

| Caminho | Conteúdo |
| --- | --- |
| `src/content/` | Conteúdo em Markdown, uma pasta por coleção |
| `src/data/` | Conteúdo tabular em YAML |
| `src/content.config.ts` | Definição das coleções e das regras de validação |
| `src/pages/` | Uma rota por arquivo |
| `src/components/` | Componentes de apresentação, sem texto institucional |
| `src/layouts/Base.astro` | Estrutura HTML comum, metadados e navegação |
| `src/styles/` | Tokens de design, estilos base e folha de impressão |
| `src/lib/url.ts` | Montagem de caminhos internos respeitando `SITE_BASE` |
| `public/` | Arquivos servidos como estão, incluindo `robots.txt` |
| `dist/` | Site gerado; não é versionado |
| `.github/workflows/publicar.yml` | Workflow de build e publicação |
| `specs/001-site-institucional-egp/` | Especificação, plano e tarefas do desenvolvimento |
| `.specify/memory/constitution.md` | Princípios que regem o projeto |

## Arquivos de configuração dos gates

| Arquivo | Uso |
| --- | --- |
| `.pa11yci.json` | Rotas auditadas e padrão de acessibilidade |
| `.lighthouserc.json` | Rotas medidas e pontuação mínima exigida |
| `astro.config.mjs` | Modo de saída, integrações e leitura de `SITE_URL`/`SITE_BASE` |
