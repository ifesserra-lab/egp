---
description: "Task list for Site Institucional do EGP Campus Serra"
---

# Tasks: Site Institucional do EGP Campus Serra

**Input**: Design documents from `/specs/001-site-institucional-egp/`

**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/](./contracts/)

**Tests**: A spec não pede TDD. Não há suíte de testes unitários; a verificação é feita pelos gates
de build exigidos pela constituição (`astro check`, validação Zod no build, `pa11y-ci`,
`linkinator`, `@lhci/cli`), tratados como tarefas explícitas.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Pode rodar em paralelo (arquivos distintos, sem dependência pendente)
- **[Story]**: User story da spec (US1, US2, US3, US4)
- Caminhos de arquivo são relativos à raiz do repositório

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Inicializar o projeto Astro estático e as ferramentas de verificação

- [X] T001 Inicializar projeto Astro 7.3.x na raiz do repositório com template mínimo, preservando `README.md`, `carta_servicos.md`, `.specify/`, `.claude/` e `specs/` (gera `package.json`, `astro.config.mjs`, `tsconfig.json`, `src/`, `public/`)
- [X] T002 Configurar `astro.config.mjs` com `output: 'static'`, `site` e `base` parametrizados (pendência de domínio da CTI, conforme research D10) e integrações `@astrojs/mdx` e `@astrojs/sitemap`
- [X] T003 [P] Configurar `tsconfig.json` estendendo `astro/tsconfigs/strict` e adicionar `@astrojs/check` + `typescript` como devDependencies
- [X] T004 [P] Adicionar devDependencies de verificação em `package.json`: `pa11y-ci`, `linkinator`, `@lhci/cli`, e `sharp` como dependência de imagem
- [X] T005 [P] Criar scripts npm em `package.json`: `dev`, `build`, `preview`, `check`, `test:a11y`, `test:links`, `test:perf` e `verify` (encadeia check + build + a11y + links + perf), conforme `quickstart.md`
- [X] T006 [P] Criar `.gitignore` com `node_modules/`, `dist/`, `.astro/`, `.lighthouseci/` e adicionar `.claude/` conforme o aviso de segurança do Spec Kit

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Modelo de conteúdo, migração da Carta e casca acessível do site — pré-requisito de toda user story

**⚠️ CRITICAL**: Nenhuma user story pode começar antes desta fase

- [X] T007 Criar `src/content.config.ts` definindo as 7 collections com loaders `glob` (pilares, fluxos, ecossistema, paginas) e `file` (fronteiras, contatos, institucional), importando `glob`/`file` de `astro/loaders` e `z` de `astro/zod`, conforme `contracts/conteudo.md`
- [X] T008 Implementar em `src/content.config.ts` o schema `pilares` — `nome` string não vazia, `ordem` inteiro 1–4 único, `objetivo` string não vazia, `atividades` array com mínimo 1 item, `entregaveis` array com mínimo 1 item, `resumo` string de no máximo 160 caracteres
- [X] T009 Implementar em `src/content.config.ts` os schemas `fluxos` (`numero` inteiro 1–4 único, `nome`, `naPratica` obrigatório e não vazio, corpo Markdown obrigatório) e `ecossistema` (`nome`, `ordem` único, `papel`, `relacaoComEgp`)
- [X] T010 Implementar em `src/content.config.ts` o schema `paginas` — `titulo` obrigatório, `descricao` entre 50 e 160 caracteres, `ordemNav` inteiro opcional e único, corpo Markdown obrigatório
- [X] T011 Implementar em `src/content.config.ts` o schema `fronteiras` (`id`, `ordem` único, `egp` e `coordenador` ambos obrigatórios)
- [X] T012 Implementar em `src/content.config.ts` o schema `contatos` com enum `tipo` (`email` | `telefone` | `site` | `ferramenta`), enum `situacao` (`ativo` | `pendente`) e os dois `refine` de validação cruzada: `situacao: ativo` exige `endereco` e proíbe omissão; `situacao: pendente` proíbe `endereco` e exige `avisoPendencia` (FR-012, princípio V)
- [X] T013 Implementar em `src/content.config.ts` o schema `institucional` — `nomeUnidade`, `vinculo`, `portaria`, `cargaHoraria`, `missao`, `identidades` (array de string), `regraDeOuro`, `atualizadoEm` data ISO obrigatória
- [X] T014 Migrar as seções 1 e 2 da Carta para `src/data/institucional.yaml` (missão literal, DPPGE, Portaria nº 190/2026, 4h semanais, "Motor Tático" e "Engrenagem de Maturidade Institucional", Regra de Ouro, `atualizadoEm`), transcrevendo sem paráfrase (FR-002)
- [X] T015 [P] Migrar a seção 4 da Carta para 4 arquivos em `src/content/pilares/` (padronizacao-e-metodologia, triagem-e-captacao, gestao-de-portfolio, apoio-e-fundacoes) com objetivo, atividades e entregáveis literais
- [X] T016 [P] Migrar a seção 5 da Carta para 4 arquivos em `src/content/fluxos/` (hospital-de-projetos, lista-de-desejos-estrategica, check-in-de-infraestrutura, filtro-de-patrimonio) com a bloco "Na prática" em campo próprio
- [X] T017 [P] Migrar a seção 3 da Carta para `src/data/fronteiras.yaml` com os 4 pares EGP × Coordenador/Setores
- [X] T018 [P] Migrar a seção 6 da Carta para 3 arquivos em `src/content/ecossistema/` (parque-alvo-serra, nucleo-incubador, divisao-egp-agifes)
- [X] T019 [P] Criar `src/data/contatos.yaml` com os canais oficiais; canal `ativo` exige `endereco` e canal `pendente` exige `avisoPendencia` sem endereço (FR-012)
- [X] T020 Mover `carta_servicos.md` para `docs/fonte/carta-servicos-original.md` e inserir cabeçalho marcando o arquivo como documento original somente leitura, apontando para `src/content/` e `src/data/` como fonte editável (research D3)
- [X] T021 [P] Criar `src/styles/tokens.css` com custom properties de cor (contraste mínimo 4.5:1 verificado), espaçamento, largura de leitura e tipografia em pilha de fontes do sistema (research D4, D5)
- [X] T022 [P] Criar `src/styles/base.css` com `@layer reset, base, layout, components`, estilos de foco visível e regra de tabela responsiva sem rolagem horizontal de página (FR-019, FR-021)
- [X] T023 Criar `src/layouts/Base.astro` com `<html lang="pt-BR">`, `<title>` e `<meta description>` vindos do conteúdo, skip link para `#conteudo-principal`, landmarks `header`/`nav`/`main`/`footer`, sem nenhum `<script>` (contrato de rotas, FR-018, FR-019, FR-020)
- [X] T024 [P] Criar `src/components/NavPrincipal.astro` gerando o menu a partir de `ordemNav` da collection `paginas`, com `aria-current="page"` no item atual (FR-015, FR-016)
- [X] T025 [P] Criar `src/components/Rodape.astro` exibindo unidade, canais e `atualizadoEm` de `institucional` (FR-013)
- [X] T026 [P] Criar `src/pages/404.astro` com mensagem e caminho de volta à Home (contrato de rotas)

**Checkpoint**: Conteúdo migrado e validado no build; casca acessível pronta — user stories podem começar

---

## Phase 3: User Story 1 - Descobrir o que o EGP faz e como acioná-lo (Priority: P1) 🎯 MVP

**Goal**: Home, Serviços e Contato publicados — visitante entende a oferta do EGP e por qual canal acioná-lo

**Independent Test**: Publicar só estas três rotas e pedir a um servidor que nunca viu o site que responda "o que o EGP faz por mim?" e "como peço ajuda?" sem apoio externo (SC-002)

- [X] T027 [P] [US1] Criar textos de abertura em `src/content/paginas/` para `index`, `servicos` e `contato`, cada um com `titulo`, `descricao` de 50–160 caracteres e `ordemNav`
- [X] T028 [P] [US1] Criar `src/components/CartaoPilar.astro` exibindo nome e `resumo` do pilar, com link para `/servicos#<id>` (contrato de âncoras)
- [X] T029 [US1] Criar `src/pages/index.astro` com missão, as duas identidades institucionais e um cartão por pilar ordenado por `ordem` (FR-003)
- [X] T030 [US1] Criar `src/pages/servicos.astro` listando os 4 pilares por `ordem`, cada um com objetivo, atividades, entregáveis e âncora `id` estável (FR-005)
- [X] T031 [P] [US1] Criar `src/components/CanalAtendimento.astro` que renderiza link quando `situacao: ativo` e aviso de canal em implantação quando `situacao: pendente`, sem nunca exibir endereço inexistente (FR-012)
- [X] T032 [US1] Criar `src/pages/contato.astro` listando os canais oficiais e a ferramenta de gestão de fluxos via `CanalAtendimento.astro` (FR-011)
- [X] T033 [US1] Incluir os canais de atendimento também na Home, a partir de `contatos`, sem duplicar texto em componente (FR-011, princípio II)
- [X] T034 [US1] Executar o cenário 3 do `quickstart.md`: forçar `situacao: ativo` sem `endereco` e confirmar que o build falha citando arquivo e campo, depois reverter (FR-026)

**Checkpoint**: MVP publicável — site já responde à pergunta central do visitante

---

## Phase 4: User Story 2 - Saber o que é responsabilidade do EGP antes de pedir (Priority: P2)

**Goal**: Fluxos Operacionais e Limites de Atuação publicados, com a Regra de Ouro em destaque

**Independent Test**: Pedir a um coordenador que classifique 5 demandas fictícias entre "EGP" e "minha responsabilidade" usando apenas o site (SC-003)

- [X] T035 [P] [US2] Criar textos de abertura em `src/content/paginas/` para `fluxos` e `limites`, com `titulo`, `descricao` e `ordemNav`
- [X] T036 [P] [US2] Criar `src/components/TabelaComparativa.astro` com `<caption>`, `<th scope="col">`, rolagem interna do bloco com `tabindex="0"` e rótulo acessível (FR-007, FR-019, FR-021)
- [X] T037 [US2] Criar `src/pages/limites.astro` renderizando os 4 pares de `fronteiras` pela `TabelaComparativa` (FR-007)
- [X] T038 [US2] Criar `src/pages/fluxos.astro` listando os 4 fluxos por `numero`, cada um com corpo e bloco "Na prática" visualmente distinta e âncora estável (FR-006)
- [X] T039 [US2] Exibir a Regra de Ouro em destaque no topo de `src/pages/fluxos.astro`, a partir de `institucional.regraDeOuro` (FR-006)

**Checkpoint**: Visitante consegue se autoclassificar antes de abrir demanda

---

## Phase 5: User Story 4 - Atualizar o conteúdo sem depender de desenvolvedor (Priority: P2)

**Goal**: Servidor do EGP edita conteúdo e publica sem tocar em código, com erro claro quando o formato estiver errado

**Independent Test**: Servidor sem experiência em programação altera um texto e acrescenta uma unidade do ecossistema seguindo a documentação, em menos de 15 minutos (SC-008)

- [X] T040 [US4] Escrever em `README.md` o guia de edição de conteúdo: onde fica cada tipo de conteúdo, como alterar texto, como incluir item, como publicar e o que significa `situacao: pendente` (FR-027)
- [X] T041 [P] [US4] Criar o guia de edição de conteúdo em `docs/` (hoje `docs/como-editar-conteudo.md`) com exemplos completos de arquivo Markdown de pilar e de unidade do ecossistema e de entrada YAML de contato e de fronteira, copiáveis por quem edita (FR-025)
- [X] T042 [US4] Garantir que a falha de validação Zod identifique arquivo e campo com mensagem em português, ajustando as mensagens dos schemas em `src/content.config.ts` (FR-026)
- [X] T043 [US4] Executar o cenário 8 do `quickstart.md`: alterar o texto de um pilar e acrescentar uma unidade do ecossistema nova, confirmando que a listagem se atualiza sozinha e que nenhum arquivo fora de `src/content/` e `src/data/` foi tocado

**Checkpoint**: Conteúdo sustentável sem desenvolvedor — a Carta pode ser revisada pelo próprio EGP

---

## Phase 6: User Story 3 - Avaliar a maturidade institucional do escritório (Priority: P3)

**Goal**: Sobre e Ecossistema publicados

**Independent Test**: Leitor externo descreve o modelo de custeio do EGP e a divisão de competências entre EGP e Agifes usando só o site

- [X] T044 [P] [US3] Criar textos de abertura em `src/content/paginas/` para `sobre` e `ecossistema`, com `titulo`, `descricao` e `ordemNav`
- [X] T045 [US3] Criar `src/pages/sobre.astro` com apresentação, vínculo com a DPPGE, Portaria nº 190/2026, composição da equipe, modelo de custeio autossustentável, protagonismo dos TAs e portfólio aproximado, tudo vindo de `institucional` e `paginas` (FR-004)
- [X] T046 [P] [US3] Criar `src/pages/ecossistema.astro` com as 3 unidades, explicitando papel, relação com o EGP e a divisão de competências EGP × Agifes (FR-008)

**Checkpoint**: Todas as seções temáticas da Carta publicadas

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Carta na íntegra, impressão, SEO e os gates automatizados da constituição

- [X] T047 [P] Criar `src/styles/print.css` preservando conteúdo de tabela, exibindo o endereço dos links e ocultando navegação na impressão (FR-022)
- [X] T048 [P] Configurar `public/robots.txt` e confirmar a geração de `sitemap.xml` com URL canônica derivada de `site` (contrato de publicação)
- [X] T049 [P] Criar `.pa11yci.json` listando as 7 rotas do contrato com padrão WCAG2AA e limiar zero de violações (SC-004)
- [X] T050 [P] Criar `.lighthouserc.json` com asserção mínima de 0.95 em performance, accessibility, best-practices e seo (SC-006)
- [X] T051 [P] Configurar `linkinator` para falhar em link interno quebrado sobre `dist/`, com links externos em modo não bloqueante (SC-010)
- [X] T052 Executar `npm run verify` e corrigir toda falha até o gate passar inteiro (constituição, seção de quality gates)
- [X] T053 Executar os cenários 5 e 6 do `quickstart.md`: conferir ausência de requisição a terceiros e de cookies, conteúdo legível com JavaScript desativado, e layout sem rolagem horizontal a 320 px (SC-005, SC-007, SC-009)
- [X] T054 Auditar item a item o site publicado contra `docs/fonte/carta-servicos-original.md` e registrar o resultado (SC-001, FR-002)
- [X] T055 Documentar em `docs/` (hoje `docs/como-publicar.md`) o procedimento de deploy do `dist/` no ambiente da CTI e os campos `site`/`base` a preencher quando o domínio for definido (research D10)

---

## Dependencies

```text
Phase 1 (Setup)
   └─> Phase 2 (Foundational: schemas + migração + casca)   ← bloqueia todas as stories
          ├─> Phase 3 (US1 · P1 · MVP)
          ├─> Phase 4 (US2 · P2)        independente de US1
          ├─> Phase 5 (US4 · P2)        precisa de ao menos uma story publicada para o teste de edição
          └─> Phase 6 (US3 · P3)        independente de US1 e US2
```

- Dentro da Fase 2, T008–T013 (schemas) precedem T014–T019 (conteúdo), porque a validação é o que
  garante a migração fiel.
- T020 (mover a Carta original) só depois de T014–T019 concluídas e validadas no build.
- T052 (`verify`) é o último gate: exige T049–T051 configurados.

## Parallel Execution Examples

**Fase 2 — migração de conteúdo** (arquivos distintos, sem dependência entre si):

```text
T015 [P] pilares/   ·  T016 [P] fluxos/   ·  T017 [P] fronteiras.yaml
T018 [P] ecossistema/   ·  T019 [P] contatos.yaml
```

**Fase 2 — casca do site**: `T021 [P] tokens.css` · `T022 [P] base.css` · `T024 [P] NavPrincipal` ·
`T025 [P] Rodape` · `T026 [P] 404`

**Fase 6 — páginas temáticas**: `T045 sobre.astro` · `T046 [P] ecossistema.astro` (após T044)

**Fase 7 — configuração de gates**: `T047 [P] print.css` · `T048 [P] robots/sitemap` ·
`T049 [P] .pa11yci.json` · `T050 [P] .lighthouserc.json` · `T051 [P] linkinator`

## Implementation Strategy

1. **MVP (entrega 1)**: Fases 1 + 2 + 3 → Home, Serviços e Contato no ar. Já cumpre o objetivo
   central do site e é publicável sozinho.
2. **Entrega 2**: Fase 4 (Limites e Fluxos) → reduz demanda mal endereçada, a dor operacional do EGP.
3. **Entrega 3**: Fase 5 (autonomia de edição) → destrava a revisão da Carta pelo próprio EGP.
4. **Entrega 4**: Fase 6 (Sobre e Ecossistema) → transparência institucional e articulação com o ecossistema de inovação.
5. **Fechamento**: Fase 7 (Carta na íntegra, impressão, SEO e gates) antes de considerar a feature
   concluída.

Cada entrega passa por `npm run verify` antes do merge em `main`.
