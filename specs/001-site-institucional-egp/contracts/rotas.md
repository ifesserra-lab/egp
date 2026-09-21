# Contrato de Rotas Públicas

**Feature**: Site Institucional do EGP Campus Serra | **Date**: 2026-09-21
**Revisão**: 2026-09-21 — o site passou de 7 rotas para página única com âncoras, por decisão do EGP.

Contrato de interface do site: 1 rota pública mais a página de erro. O conteúdo da Carta está
todo na página inicial, em seções com âncora estável, citáveis em ofício ou apresentação.

| Rota | Conteúdo | Requisitos |
|---|---|---|
| `/` | Todas as seções publicadas da Carta, em leitura corrida | FR-001 a FR-012 |
| `/404` | Mensagem e caminho de volta ao início | FR-016 |

## Âncoras estáveis

| Âncora | Conteúdo | No menu |
|---|---|---|
| `/#sobre` | Apresentação, vínculo, portaria e modelo operacional | sim (1) |
| `/#servicos` | Os quatro pilares, com objetivo, atividades e entregáveis | sim (2) |
| `/#fluxos` | Regra de Ouro e os quatro fluxos, com a camada "So What?" | sim (3) |
| `/#limites` | Tabela comparativa de fronteiras de responsabilidade | sim (4) |
| `/#ecossistema` | Parque Alvo Serra, Núcleo Incubador e divisão EGP/Agifes | sim (5) |
| `/#contato` | Canais oficiais e sua situação | sim (6) |

Âncoras de item, geradas a partir do conteúdo:

| Padrão | Origem | Exemplo |
|---|---|---|
| `/#<id-do-pilar>` | `id` da collection `pilares` | `/#gestao-de-portfolio` |
| `/#<id-do-fluxo>` | `id` da collection `fluxos` | `/#hospital-de-projetos` |
| `/#<id-da-unidade>` | `id` da collection `ecossistema` | `/#nucleo-incubador` |

Quando um item deixa de existir na Carta, o link some da navegação em vez de apontar para destino
inexistente.

## Contrato do documento HTML

- `<html lang="pt-BR">`; `<title>` sem repetir o nome da unidade; `<meta name="description">` vindo
  do conteúdo (FR-018).
- Primeiro elemento focável = skip link para `#conteudo-principal`; landmarks `header`, `nav`,
  `main#conteudo-principal`, `footer` (FR-019).
- Exatamente um `<h1>`; seções em `<h2>`, itens em `<h3>`, listas de item em `<h4>`, sem salto de
  nível (FR-019).
- Navegação principal por âncoras, idêntica no topo de qualquer visita (FR-015).
- Rodapé com nome da unidade, canais e data da última atualização (FR-013).
- Zero `<script>`; nenhum recurso de host externo (FR-020, FR-023).
- Tabelas com `<caption>` e `<th scope>`; em telas estreitas, rolagem própria do bloco com
  `tabindex="0"` e rótulo acessível (FR-021).
- Folha de impressão que preserva conteúdo de tabela e exibe o endereço dos links (FR-022).
- URL canônica e entrada no `sitemap.xml` derivadas da configuração `site`.

## Contrato de publicação

- Artefato: diretório `dist/` com arquivos estáticos; nenhum processo de servidor.
- `base` configurável, para servir o site em subdiretório do domínio institucional.
- `robots.txt` e `sitemap.xml` gerados no build.
- Sem cookies, sem armazenamento local, sem requisição a terceiros (FR-023, FR-024).
