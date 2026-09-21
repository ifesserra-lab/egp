# Phase 0 — Research: Site Institucional do EGP Campus Serra

**Date**: 2026-09-21 | **Plan**: [plan.md](./plan.md)

Nenhum marcador `NEEDS CLARIFICATION` permaneceu no Technical Context. As decisões abaixo
resolvem cada escolha tecnológica contra os princípios da constituição.

## D1 — Framework: Astro 7.3.x em modo estático

- **Decision**: Astro na versão estável atual (7.3.3 em 2026-09-21), `output: 'static'`.
- **Rationale**: gera HTML puro por rota sem runtime de servidor; envia zero JavaScript por padrão,
  o que atende diretamente aos princípios I (Estático Primeiro) e IV (Orçamento de Performance).
  Content collections nativas cobrem o princípio II sem CMS externo.
- **Alternatives considered**: Hugo/Eleventy (rápidos, mas sem validação de schema tipada
  integrada e sem ecossistema de componentes TypeScript); Next.js/Nuxt (trazem runtime e hidratação
  desnecessários para conteúdo institucional estático); CMS hospedado (custo recorrente e serviço de
  terceiros, incompatível com o custeio zero e com a restrição de LGPD/CTI).

## D2 — Conteúdo: Content Layer com loaders `glob` e `file`

- **Decision**: `src/content.config.ts` definindo collections com `defineCollection`, loader
  `glob({ pattern: '**/*.md', base: './src/content/<col>' })` para itens em prosa (pilares, fluxos,
  ecossistema, textos de página) e `file('src/data/<arquivo>.yaml')` para dados tabulares
  (fronteiras, contatos, institucional). Schemas com `z` de `astro/zod`. Consulta via
  `getCollection()` e `render()` de `astro:content`.
- **Rationale**: separa conteúdo de apresentação (princípio II) e faz o build falhar quando um campo
  obrigatório falta (FR-026). Prosa em Markdown é editável por servidor sem conhecimento de
  programação; YAML mantém tabelas legíveis sem repetir cabeçalhos.
- **Alternatives considered**: texto embutido em `.astro` (viola princípio II); JSON puro (ruidoso
  para editar à mão, sem comentários); um único YAML gigante (conflitos de merge e revisão difícil).

## D3 — Fonte da verdade do conteúdo e destino da Carta original

- **Decision**: `src/content/` + `src/data/` passam a ser a fonte única editável. O arquivo
  `carta_servicos.md` da raiz é movido para `docs/fonte/carta-servicos-original.md`, marcado como
  documento original somente leitura, com aviso apontando para as pastas de conteúdo.
- **Rationale**: duas cópias editáveis do mesmo texto divergem na primeira revisão da Carta
  (documento vivo, seção 9), o que violaria o princípio V. Preservar o original em `docs/fonte/`
  mantém a rastreabilidade da migração sem criar um segundo lugar para editar.
- **Alternatives considered**: publicar o documento original como página do site (quebra o modelo
  de dados por seção); apagar o original (perde o texto de referência para a auditoria item a item
  exigida por SC-001).

## D4 — Estilo: CSS nativo com design tokens, sem framework

- **Decision**: CSS escrito à mão em `src/styles/` — `tokens.css` (custom properties de cor,
  espaçamento, tipografia), `base.css` organizado em `@layer reset, base, layout, components` e
  `print.css`. Estilos de componente escopados no próprio `.astro`.
- **Rationale**: o site tem ~10 rotas e poucos padrões visuais; um framework utilitário adicionaria
  dependência, etapa de build e CSS não usado sem ganho. Tokens centralizados facilitam aplicar o
  manual de identidade do Ifes e garantir contraste 4.5:1 (princípio III).
- **Alternatives considered**: Tailwind (dependência e configuração desproporcionais ao tamanho;
  a constituição exige justificativa para framework adicional); framework de componentes prontos
  (traz JavaScript e marcação genérica, conflitando com princípios I e III).

## D5 — Tipografia: pilha de fontes do sistema

- **Decision**: `font-family` baseada em fontes do sistema operacional; nenhuma webfont carregada.
- **Rationale**: 0 KB transferidos em fonte, sem FOIT/FOUT, sem requisição externa — atende ao
  princípio IV e à proibição de recursos de terceiros. Se o manual de identidade do Ifes exigir uma
  fonte específica, ela será auto-hospedada em `woff2` com `font-display: swap`, conforme já previsto
  na constituição.
- **Alternatives considered**: Google Fonts (requisição a terceiro, proibido por LGPD/constituição);
  webfont auto-hospedada desde já (custo de bytes sem exigência institucional confirmada).

## D6 — Acessibilidade: `pa11y-ci` como gate de build

- **Decision**: `pa11y-ci` 4.x rodando axe-core e HTML CodeSniffer (WCAG2AA) contra o `dist/`
  servido localmente, cobrindo todas as rotas do contrato; falha derruba o build.
- **Rationale**: o princípio III exige bloqueio de merge por violação; `pa11y-ci` aceita lista de
  URLs e limiar zero, e roda offline no ambiente de build.
- **Alternatives considered**: `@axe-core/cli` (só axe, exige Chromedriver separado); auditoria
  manual apenas (não repetível, não bloqueia merge); apenas a seção Accessibility do Lighthouse
  (cobre menos regras que axe + HTMLCS combinados).

## D7 — Links internos: `linkinator`

- **Decision**: `linkinator` 8.x varrendo o `dist/` servido localmente, com falha em qualquer link
  interno quebrado; links externos verificados em modo não bloqueante.
- **Rationale**: atende SC-010 e ao edge case de seção removida na revisão da Carta. Executa sem
  rede quando restrito ao escopo interno.
- **Alternatives considered**: `lychee` (binário Rust, instalação fora do npm no ambiente da CTI);
  script próprio (reinventa tratamento de âncoras e redirecionamentos).

## D8 — Performance: `@lhci/cli` com asserções numéricas

- **Decision**: `@lhci/cli` 0.15.x em modo `assert`, exigindo >= 0.95 nas quatro categorias, sobre o
  build de produção servido localmente.
- **Rationale**: converte o orçamento do princípio IV e o SC-006 em gate automatizado e reprodutível.
- **Alternatives considered**: medição manual no navegador (não reprodutível); apenas orçamento de
  bytes (não cobre acessibilidade e boas práticas).

## D9 — Imagens e marcas institucionais

- **Decision**: componente `<Image />` do Astro com `sharp`, dimensões explícitas, formatos modernos;
  arquivos em `src/assets/`. Marcas do Ifes usadas como fornecidas, sem recriação.
- **Rationale**: evita layout shift (CLS) e peso desnecessário (princípio IV); respeita a restrição
  de identidade visual da constituição.
- **Alternatives considered**: `<img>` cru em `public/` (sem otimização nem dimensionamento
  automático); SVG recriado das marcas (proibido pela constituição).

## D10 — Publicação e URL ainda indefinida

- **Decision**: build gera `dist/`; `site` e `base` ficam em variáveis de configuração do projeto,
  preenchidas quando a CTI confirmar o endereço. `@astrojs/sitemap` e `robots.txt` são gerados a
  partir dessa configuração. Enquanto a URL não existir, o valor fica documentado como pendência.
- **Rationale**: o princípio V proíbe inventar endereço; parametrizar evita retrabalho em todas as
  rotas quando o domínio for definido.
- **Alternatives considered**: fixar um domínio provável (risco de publicar URL incorreta, viola
  princípio V); adiar sitemap (perde SEO exigido por SC-006).

## D11 — Sem analytics, sem formulário, sem cookies

- **Decision**: nenhuma coleta de dados do visitante; contato por e-mail institucional, citado
  como texto ou link.
- **Rationale**: FR-023/FR-024 e a seção de LGPD da constituição; também elimina a necessidade de
  aviso de cookies.
- **Alternatives considered**: analytics auto-hospedado pela CTI (possível no futuro, exige
  infraestrutura e base legal registrada — fora do escopo desta entrega).

## D12 — TypeScript estrito e verificação de tipos

- **Decision**: `extends: 'astro/tsconfigs/strict'`, com `astro check` no gate de build.
- **Rationale**: schemas Zod geram tipos das collections; o modo estrito faz erro de conteúdo
  aparecer em tempo de build, não em produção.
- **Alternatives considered**: preset `base` (permite `any` implícito, enfraquece a validação de
  conteúdo).
