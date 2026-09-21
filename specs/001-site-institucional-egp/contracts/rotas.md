# Contrato de Rotas Públicas

**Feature**: Site Institucional do EGP Campus Serra | **Date**: 2026-09-21

Contrato de interface do site (7 rotas públicas + 404): URLs estáveis, citáveis em ofício ou apresentação (FR-017). Toda
rota é pré-renderizada em HTML, alcançável em no máximo 2 cliques a partir da Home (FR-015) e
presente no `sitemap.xml`. Alterar ou remover uma rota desta tabela é mudança de contrato e exige
redirecionamento acordado com a CTI.

| Rota | Título (`h1`) | Conteúdo | No menu | Requisitos |
|---|---|---|---|---|
| `/` | Escritório de Gestão de Projetos – Campus Serra | Missão, identidades "Motor Tático" e "Engrenagem de Maturidade Institucional", cartão de cada pilar, canais de atendimento | sim (1) | FR-003, FR-011 |
| `/sobre` | Sobre o EGP | Apresentação, vínculo com a DPPGE, Portaria nº 190/2026, equipe, modelo de custeio autossustentável, protagonismo dos TAs | sim (2) | FR-004 |
| `/servicos` | Serviços | Os 4 pilares, cada um com objetivo, atividades e entregáveis, com âncora própria | sim (3) | FR-005 |
| `/fluxos` | Fluxos Operacionais | Os 4 fluxos com camada "So What?" e a Regra de Ouro em destaque | sim (4) | FR-006 |
| `/limites` | Limites de Atuação | Tabela comparativa EGP × Coordenador/Setores | sim (5) | FR-007 |
| `/ecossistema` | Ecossistema de Inovação | Parque Alvo Serra, Núcleo Incubador, divisão EGP × Agifes | sim (6) | FR-008 |
| `/contato` | Contato | Canais oficiais com situação (ativo ou em implantação) e ferramenta de gestão de fluxos | sim (7) | FR-011, FR-012 |
| `/404` | Página não encontrada | Mensagem e caminho de volta à Home | não | FR-016 |

## Âncoras estáveis

| Padrão | Origem do fragmento | Exemplo |
|---|---|---|
| `/servicos#<id-do-pilar>` | `id` da collection `pilares` | `/servicos#gestao-de-portfolio` |
| `/fluxos#<id-do-fluxo>` | `id` da collection `fluxos` | `/fluxos#hospital-de-projetos` |
| `/ecossistema#<id>` | `id` da collection `ecossistema` | `/ecossistema#nucleo-incubador` |

Âncoras são geradas a partir do conteúdo: quando um item deixa de existir na Carta, o link some da
navegação em vez de apontar para destino inexistente (edge case de seção removida, SC-010).

## Contrato de cada documento HTML

Aplica-se a todas as rotas:

- `<html lang="pt-BR">`; `<title>` = título da página + nome da unidade; `<meta name="description">`
  vindo do conteúdo (FR-018).
- Primeiro elemento focável = skip link para `#conteudo-principal`; landmarks `header`, `nav`,
  `main#conteudo-principal`, `footer` (FR-019).
- Exatamente um `<h1>` por página; hierarquia de títulos sem salto de nível (FR-019).
- Navegação principal idêntica em todas as rotas, com o item atual marcado por `aria-current="page"`
  (FR-015, FR-016).
- Rodapé com nome da unidade, canais e data da última atualização (FR-013).
- Zero `<script>` de página institucional; nenhum recurso de host externo (FR-020, FR-023).
- Tabelas com `<caption>` e `<th scope>`; em telas estreitas, rolagem própria do bloco com
  `tabindex="0"` e rótulo acessível — nunca rolagem horizontal da página (FR-021, edge case de
  tabela larga).
- Folha de impressão que preserva conteúdo de tabela e exibe o endereço dos links (FR-022).
- URL canônica e entrada no `sitemap.xml` derivadas da configuração `site`, preenchida quando a CTI
  confirmar o domínio.

## Contrato de publicação

- Artefato: diretório `dist/` com arquivos estáticos; nenhum processo de servidor.
- `base` configurável, caso o site seja servido em subdiretório do domínio institucional.
- `robots.txt` e `sitemap.xml` gerados no build.
- Sem cookies, sem armazenamento local, sem requisição a terceiros (FR-023, FR-024).
