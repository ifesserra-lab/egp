# Implementation Plan: Site Institucional do EGP Campus Serra

**Branch**: `001-site-institucional-egp` | **Date**: 2026-09-21 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-site-institucional-egp/spec.md`

## Summary

Publicar a Carta de Serviços do EGP do Campus Serra como site institucional estático, com
página única com navegação por âncora (sobre, serviços, fluxos, limites, ecossistema, contato). As seções de indicadores e
de cases da Carta, e a página que reunia o documento em leitura corrida, estão fora do escopo
desta entrega, por decisão do EGP.

Abordagem técnica: site Astro 7 em modo `static`, com todo o conteúdo institucional em 7 content
collections tipadas (Content Layer: `glob` para itens em Markdown, `file` para dados tabulares em
YAML), validadas por Zod no build. Nenhuma ilha interativa é necessária nesta entrega — o HTML
resultante não carrega JavaScript. Estilo em CSS nativo com design tokens e `@layer`; tipografia
em pilha de fontes do sistema (zero KB de fonte transferida). Verificação de qualidade no build:
`astro check` (tipos e conteúdo), `pa11y-ci` (acessibilidade), `linkinator` (links internos) e
`@lhci/cli` (orçamento de performance). Entrega = pasta `dist/` estática publicada no ambiente
oficial da CTI.

## Technical Context

**Language/Version**: TypeScript 5.x em modo `strict` (preset `astro/tsconfigs/strict`), Node.js
22 LTS ou superior no ambiente de build

**Primary Dependencies**: `astro` 7.3.x (framework e build estático), `@astrojs/mdx` (conteúdo com
componentes quando necessário), `@astrojs/sitemap`, `@astrojs/check` + `typescript` (verificação),
`sharp` (otimização de imagem). Dev-only: `pa11y-ci`, `linkinator`, `@lhci/cli`

**Storage**: arquivos versionados no repositório — Markdown em `src/content/` e YAML em
`src/data/`, carregados por content collections. Sem banco de dados, sem CMS, sem API

**Testing**: validação de schema Zod no build (falha o build em conteúdo inválido), `astro check`
para tipos, `pa11y-ci` para WCAG 2.1 AA em todas as rotas, `linkinator` para links internos,
`@lhci/cli` com asserções de score mínimo 95

**Target Platform**: navegadores modernos e leitores de tela; artefato `dist/` servido como
arquivos estáticos por servidor web do ambiente oficial da CTI do Ifes

**Project Type**: site estático de página única por seção (sem backend, sem área autenticada)

**Performance Goals**: Lighthouse >= 95 em Performance, Accessibility, Best Practices e SEO;
conteúdo textual visível em menos de 2 s em 3G; 0 KB de JavaScript entregue ao cliente nas páginas
institucionais

**Constraints**: nenhum recurso de terceiros (fonte, script, CDN, rastreador); conteúdo legível com
JavaScript desativado; <= 100 KB de CSS por página; layout utilizável a partir de 320 px; site
monolíngue pt-BR; `base` de publicação configurável, pois a URL final ainda não foi definida pela
CTI

**Scale/Scope**: 1 rota pública mais a página de erro, ~15 arquivos de conteúdo, tráfego institucional de baixo volume; equipe
de manutenção = servidores do EGP editando Markdown/YAML no repositório

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Princípio | Como o plano atende | Status |
|---|---|---|
| I. Estático Primeiro | `output: 'static'`, nenhuma ilha `client:*` nesta entrega; todas as rotas pré-renderizadas em HTML | PASS |
| II. Conteúdo como Dado Versionado | 100% do texto institucional em `src/content/` (Markdown) e `src/data/` (YAML), com schemas Zod; componentes `.astro` não contêm texto institucional | PASS |
| III. Acessibilidade Não-Negociável | HTML semântico, `lang="pt-BR"`, skip link, foco visível, tabelas com `<caption>`/`<th scope>`; `pa11y-ci` bloqueia o merge | PASS |
| IV. Orçamento de Performance | 0 KB de JS, fontes do sistema (0 KB), CSS único em `@layer` bem abaixo de 100 KB, `<Image />` com dimensões explícitas; `@lhci/cli` assere >= 95 | PASS |
| V. Fidelidade Institucional | Conteúdo migrado literalmente da Carta; original preservado como referência somente-leitura; campos de contato com estado `pendente` explícito em vez de valor inventado | PASS |
| Restrições técnicas e de privacidade | Sem framework de UI adicional, sem CDN, sem analytics, sem formulário; TypeScript `strict` | PASS |
| Fluxo e quality gates | `astro check` + build sem warnings + `pa11y-ci` + `linkinator` como gates; ciclo SDD já em curso | PASS |

Pós-Fase 1: reavaliado, sem violações. Seção "Complexity Tracking" permanece vazia.

## Project Structure

### Documentation (this feature)

```text
specs/001-site-institucional-egp/
├── plan.md              # Este arquivo
├── spec.md              # Especificação
├── research.md          # Fase 0
├── data-model.md        # Fase 1
├── quickstart.md        # Fase 1
├── contracts/
│   ├── rotas.md         # Contrato de URLs públicas
│   └── conteudo.md      # Contrato dos schemas de conteúdo
├── checklists/
│   └── requirements.md
└── tasks.md             # Fase 2 (/speckit-tasks)
```

### Source Code (repository root)

```text
src/
├── content.config.ts          # Definição das collections + schemas Zod
├── content/                   # Conteúdo em Markdown (um arquivo por item)
│   ├── pilares/               # 4 pilares de serviço
│   ├── fluxos/                # 4 fluxos operacionais
│   ├── ecossistema/           # Parque Alvo Serra, Núcleo Incubador, Agifes
│   └── paginas/               # Textos de abertura de cada página
├── data/                      # Dados tabulares em YAML
│   ├── institucional.yaml     # Missão, vínculo, portaria, atualização
│   ├── fronteiras.yaml        # Pares EGP x Coordenador/Setores
│   └── contatos.yaml          # Canais oficiais + situação (ativo/pendente)
├── components/                # Cabeçalho, rodapé, navegação, cartão, tabela comparativa
├── layouts/
│   └── Base.astro             # HTML base, metadados, skip link, landmarks
├── pages/                     # Uma rota por seção (ver contracts/rotas.md)
├── styles/                    # tokens.css, base.css, print.css
└── assets/                    # Imagens e marcas institucionais

public/                        # robots.txt e arquivos servidos como estão
docs/
└── fonte/
    └── carta-servicos-original.md   # Documento original, somente leitura
.lighthouserc.json             # Asserções de performance/acessibilidade
.pa11yci.json                  # Rotas auditadas
```

**Structure Decision**: projeto único Astro na raiz do repositório (sem monorepo, sem
frontend/backend separados) — não há backend nem segundo artefato. O conteúdo fica isolado em
`src/content/` e `src/data/` para que servidores do EGP editem apenas essas pastas, conforme o
princípio II da constituição. A Carta original migra para `docs/fonte/` marcada como somente
leitura, eliminando duplicidade de fonte editável.

## Complexity Tracking

> Sem violações da constituição. Nenhuma justificativa de complexidade necessária.
