# Phase 1 — Data Model: Site Institucional do EGP Campus Serra

**Date**: 2026-09-21 | **Plan**: [plan.md](./plan.md) | **Schemas**: [contracts/conteudo.md](./contracts/conteudo.md)

Todo o modelo é estático e versionado em git. Não há banco de dados, escrita em runtime nem estado
de sessão. Cada entidade da spec vira uma content collection validada por Zod no build.

## Visão geral

| Entidade (spec) | Collection | Loader | Origem | Cardinalidade |
|---|---|---|---|---|
| Pilar de Serviço | `pilares` | `glob` | `src/content/pilares/*.md` | 4 |
| Fluxo Operacional | `fluxos` | `glob` | `src/content/fluxos/*.md` | 4 |
| Unidade do Ecossistema | `ecossistema` | `glob` | `src/content/ecossistema/*.md` | 3 |
| — (texto de abertura por página) | `paginas` | `glob` | `src/content/paginas/*.md` | 1 por rota |
| Fronteira de Responsabilidade | `fronteiras` | `file` | `src/data/fronteiras.yaml` | 4 |
| Canal de Atendimento | `contatos` | `file` | `src/data/contatos.yaml` | 1 |
| Identidade institucional | `institucional` | `file` | `src/data/institucional.yaml` | 1 |

## Entidades

### Pilar de Serviço (`pilares`)

Uma das quatro frentes da Matriz de Serviços (Carta, seção 4).

| Campo | Tipo | Obrigatório | Regra |
|---|---|---|---|
| `id` | slug do arquivo | sim | único; usado como âncora em `/servicos#<id>` |
| `nome` | string | sim | não vazio; texto literal da Carta |
| `ordem` | inteiro 1–4 | sim | único entre os pilares; define a ordem de exibição |
| `objetivo` | string | sim | uma frase, literal da Carta |
| `atividades` | lista de string | sim | mínimo 1 item |
| `entregaveis` | lista de string | sim | mínimo 1 item |
| `resumo` | string | sim | até 160 caracteres; usado no cartão da Home e em metadados |
| corpo Markdown | texto | não | detalhamento opcional exibido na página de Serviços |

**Regras**: exatamente 4 registros; `ordem` sem lacuna nem repetição (validado em build).

### Fluxo Operacional (`fluxos`)

Os quatro fluxos da seção 5 da Carta.

| Campo | Tipo | Obrigatório | Regra |
|---|---|---|---|
| `id` | slug do arquivo | sim | âncora em `/fluxos#<id>` |
| `numero` | inteiro 1–4 | sim | único; corresponde a "Fluxo N" na Carta |
| `nome` | string | sim | literal da Carta |
| `soWhat` | string | sim | conteúdo da camada "So What?"; não vazio |
| corpo Markdown | texto | sim | descrição do fluxo |

**Regras**: exatamente 4 registros; `numero` de 1 a 4 sem repetição. A "Regra de Ouro" não é um
fluxo — vive em `institucional.regraDeOuro` e é exibida em destaque na página de fluxos.

### Unidade do Ecossistema (`ecossistema`)

Parceiros institucionais de inovação (Carta, seção 6).

| Campo | Tipo | Obrigatório | Regra |
|---|---|---|---|
| `id` | slug do arquivo | sim | âncora em `/ecossistema#<id>` |
| `nome` | string | sim | literal da Carta |
| `ordem` | inteiro >= 1 | sim | único |
| `papel` | string | sim | o que a unidade faz |
| `relacaoComEgp` | string | sim | como o EGP se relaciona com ela |
| corpo Markdown | texto | não | detalhamento |

### Texto de página (`paginas`)

Prosa de abertura de cada rota, mantida fora dos componentes (princípio II).

| Campo | Tipo | Obrigatório | Regra |
|---|---|---|---|
| `id` | slug do arquivo | sim | deve corresponder a uma rota do contrato de rotas |
| `titulo` | string | sim | usado em `<h1>` e no `<title>` |
| `descricao` | string | sim | 50–160 caracteres; vira `<meta name="description">` |
| `ordemNav` | inteiro | não | posição na navegação principal; ausente = fora do menu |
| corpo Markdown | texto | sim | texto de abertura |

**Regras**: toda rota do contrato tem exatamente um registro; `ordemNav` único quando presente.

### Fronteira de Responsabilidade (`fronteiras`)

Pares comparativos da seção 3 da Carta.

| Campo | Tipo | Obrigatório | Regra |
|---|---|---|---|
| `id` | string | sim | único |
| `ordem` | inteiro >= 1 | sim | único |
| `egp` | string | sim | atribuição do EGP |
| `coordenador` | string | sim | responsabilidade do coordenador ou setor |

**Regras**: cada registro é uma linha da tabela comparativa; os dois lados são obrigatórios, para
que a tabela nunca renderize célula vazia.

### Canal de Atendimento (`contatos`)

| Campo | Tipo | Obrigatório | Regra |
|---|---|---|---|
| `id` | string | sim | único |
| `tipo` | enum `email` \| `telefone` \| `site` \| `ferramenta` | sim | define como o canal é renderizado (`mailto:`, `tel:` ou link comum) |
| `rotulo` | string | sim | nome exibido |
| `situacao` | enum `ativo` \| `pendente` | sim | governa a exibição |
| `endereco` | string | condicional | **obrigatório quando `situacao = ativo`; proibido quando `pendente`** |
| `observacao` | string | não | uso do canal (ex.: "centralização de demandas e histórico oficial") |
| `avisoPendencia` | string | condicional | **obrigatório quando `situacao = pendente`**; texto do aviso de canal em implantação |

**Regras (FR-012, princípio V)**: a validação cruzada `situacao × endereco` falha o build se um canal
pendente trouxer endereço ou se um canal ativo não trouxer. Canal `pendente` renderiza aviso, nunca
link. Estado atual: apenas o e-mail oficial, `ativo`. O telefone está desabilitado no YAML
(bloco comentado) até que o número seja confirmado. O endereço do próprio site e
ferramentas internas de trabalho não são listados como canais.

**Transição de estado**: `pendente → ativo` ocorre por edição do YAML quando a conta ou o domínio
existir; nenhuma outra transição é prevista.

### Identidade institucional (`institucional`)

Registro único com os dados transversais da Carta (seções 1 e 2).

| Campo | Tipo | Obrigatório | Regra |
|---|---|---|---|
| `nomeUnidade` | string | sim | "Escritório de Gestão de Projetos (EGP) – Campus Serra" |
| `nomeAnterior` | string | não | "PMO" |
| `vinculo` | string | sim | "Diretoria de Pesquisa, Pós-Graduação e Extensão (DPPGE)" |
| `portaria` | string | sim | "Portaria nº 190/2026" |
| `cargaHoraria` | string | sim | "4h semanais" |
| `missao` | string | sim | texto literal da missão |
| `identidades` | lista de string | sim | "Motor Tático", "Engrenagem de Maturidade Institucional" |
| `regraDeOuro` | string | sim | texto da Regra de Ouro |
| `atualizadoEm` | data ISO | sim | última revisão do conteúdo; exibido no rodapé |

## Invariantes globais

1. **Nenhum texto institucional em componente**: qualquer string exibida ao visitante vem de uma
   collection (princípio II, FR-025).
2. **Contagens da Carta**: 4 pilares, 4 fluxos, 4 fronteiras, 3 unidades de ecossistema. As seções
   de indicadores e de cases estão fora do escopo por decisão do EGP (2026-09-21). Divergência é intencional apenas quando a Carta for revisada.
3. **Fidelidade**: todo valor publicado é transcrito da Carta, nunca recalculado nem estimado
   (princípio V, FR-002). A cifra aproximada do portfólio ficou fora do escopo em 2026-09-21.
4. **Sem endereço inventado**: ver regra cruzada de `contatos` (FR-012).
5. **Falha explícita**: conteúdo fora do schema aborta o build com arquivo e campo (FR-026), em vez
   de publicar página incompleta.
