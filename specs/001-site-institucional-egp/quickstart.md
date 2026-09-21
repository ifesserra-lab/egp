# Quickstart — Validação do Site Institucional do EGP

**Feature**: Site Institucional do EGP Campus Serra | **Date**: 2026-09-21
**Plano**: [plan.md](./plan.md) | **Rotas**: [contracts/rotas.md](./contracts/rotas.md)

Guia de execução e validação. Os cenários abaixo provam a entrega ponta a ponta e mapeiam os
critérios de sucesso da spec. Implementação detalhada fica em `tasks.md`.

## Pré-requisitos

- Node.js 22 LTS ou superior (`node --version`)
- npm 10+
- Acesso ao repositório do projeto
- Navegador com leitor de tela disponível para a verificação manual do cenário 4

## Comandos

```bash
npm install          # instala dependências
npm run dev          # servidor local de desenvolvimento
npm run build        # gera o artefato estático em dist/ (valida schemas de conteúdo)
npm run preview      # serve dist/ localmente para auditoria
npm run check        # astro check: tipos e conteúdo
npm run test:a11y    # pa11y-ci em todas as rotas do contrato
npm run test:links   # linkinator sobre dist/
npm run test:perf    # lighthouse-ci com asserção >= 95
npm run verify       # check + build + a11y + links + perf (gate completo)
```

## Cenário 1 — Conteúdo completo e fiel (SC-001, FR-001, FR-002)

1. `npm run build`
2. `npm run preview` e percorrer as 7 rotas do contrato.
3. Conferir item a item contra `docs/fonte/carta-servicos-original.md`.

**Esperado**: as seções da Carta dentro do escopo estão publicadas (todas exceto indicadores e
cases); 4 pilares, 4 fluxos, 4 fronteiras e 3 unidades do ecossistema aparecem com o texto literal
do documento; missão,
Portaria nº 190/2026 conferem; a cifra do portfólio não aparece em nenhuma rota.

## Cenário 2 — Descoberta do serviço em até 3 cliques (SC-002, FR-015)

1. Abrir `/` e, sem usar busca, chegar a "o que o EGP faz" e "como acionar".

**Esperado**: os quatro pilares aparecem na Home; a página de Contato está a um clique da navegação
principal em qualquer rota; nenhum caminho exige mais de 2 cliques a partir da Home.

## Cenário 3 — Canais pendentes sem endereço inventado (FR-012, princípio V)

1. Abrir `/contato`.
2. Em `src/data/contatos.yaml`, mudar o e-mail para `situacao: ativo` sem informar `endereco` e
   rodar `npm run build`.

**Esperado**: na etapa 1, e-mail e telefone aparecem como canais ativos, com link `mailto:` e
`tel:` respectivamente. Na etapa 2, o build falha citando `contatos.yaml`, o campo `endereco` e a regra
FR-012 — nenhuma página é publicada.

## Cenário 4 — Acessibilidade (SC-004, FR-019)

1. `npm run test:a11y`
2. Manualmente: navegar `/limites` só com Tab/Shift+Tab e depois com leitor de tela.

**Esperado**: `pa11y-ci` termina sem violações em todas as rotas; o primeiro Tab revela o skip link;
o foco é sempre visível; a tabela comparativa é anunciada com legenda e cabeçalhos de coluna.

## Cenário 5 — Sem JavaScript e sem terceiros (SC-007, SC-009, FR-020, FR-023)

1. Desativar JavaScript no navegador e recarregar cada rota.
2. Abrir a aba de rede do navegador e conferir os domínios das requisições.

**Esperado**: todo o conteúdo textual permanece visível e navegável; nenhuma requisição sai para
domínio de terceiros; nenhum cookie é gravado.

## Cenário 6 — Desempenho e orçamento (SC-005, SC-006, FR-021)

1. `npm run test:perf`
2. No navegador, emular 3G e tela de 320 px de largura.

**Esperado**: Lighthouse >= 95 nas quatro categorias; conteúdo textual visível em menos de 2 s em
3G; nenhuma rolagem horizontal a 320 px; tabelas largas rolam dentro do próprio bloco.

## Cenário 7 — Links internos íntegros (SC-010)

1. `npm run test:links`
2. Remover um arquivo de `src/content/ecossistema/`, rodar `npm run build` e `npm run test:links`.

**Esperado**: na etapa 1, zero links internos quebrados. Na etapa 2, a unidade some da listagem e
nenhum link órfão permanece apontando para a âncora removida.

## Cenário 8 — Edição por servidor sem perfil técnico (SC-008, FR-025, FR-027)

1. Seguir o README para alterar o texto de um pilar em `src/content/pilares/`.
2. Acrescentar uma nova unidade do ecossistema criando um arquivo Markdown na pasta
   `src/content/ecossistema/`.
3. `npm run build && npm run preview`.

**Esperado**: as duas alterações aparecem no site sem que nenhum arquivo fora de `src/content/` ou
`src/data/` seja tocado; a tarefa completa leva menos de 15 minutos; a nova unidade entra na
listagem automaticamente.

## Cenário 9 — Impressão e data de atualização (FR-013, FR-022)

1. Abrir `/servicos` e `/limites` e acionar a impressão (visualização em PDF).

**Esperado**: a navegação some da versão impressa; o conteúdo das tabelas não é cortado; a data
da última atualização aparece no rodapé.

## Gate de merge

`npm run verify` precisa passar por completo antes de qualquer merge em `main`, conforme a seção de
quality gates da constituição.
