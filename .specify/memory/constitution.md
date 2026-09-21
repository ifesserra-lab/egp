<!--
Sync Impact Report (scratch — remover antes do commit final da emenda)
- Version change: TEMPLATE (não versionado) → 1.0.0
- Bump rationale: MAJOR inicial — primeira ratificação do documento de governança.
- Principles defined (5): I. Estático Primeiro; II. Conteúdo como Dado Versionado;
  III. Acessibilidade Não-Negociável; IV. Orçamento de Performance;
  V. Fidelidade Institucional
- Sections filled: Restrições Técnicas e de Privacidade; Fluxo de Desenvolvimento e Quality Gates; Governança
- Removed sections: nenhuma
- Deferred TODOs: nenhum
-->

# Site do EGP Campus Serra — Constituição

## Core Principles

### I. Estático Primeiro

O site MUST ser gerado estaticamente com Astro (`output: 'static'`) e servido como HTML/CSS
pré-renderizado. JavaScript no cliente MUST ser exceção justificada por interação real do
usuário, entregue via ilhas (`client:*`) com a diretiva mais preguiçosa que atenda ao caso.
Nenhuma página institucional MUST depender de JavaScript para exibir seu conteúdo textual.

Rationale: o EGP opera sob restrição fiscal e hospedagem em ambiente oficial da CTI; um
artefato estático elimina runtime de servidor, reduz superfície de ataque e custo de
manutenção a praticamente zero.

### II. Conteúdo como Dado Versionado

Todo conteúdo institucional (serviços, pilares, fluxos, KPIs, cases, contatos) MUST viver em
content collections tipadas do Astro (Markdown/MDX ou JSON/YAML sob `src/content/`), com
schema Zod validado em build. Texto institucional MUST NOT ser embutido direto em componentes
`.astro`. Toda alteração de conteúdo MUST passar por commit no git.

Rationale: a Carta de Serviços é documento vivo e revisado periodicamente; separar conteúdo de
apresentação permite que servidores do EGP atualizem texto sem tocar em código, e o git provê
histórico auditável das revisões.

### III. Acessibilidade Não-Negociável

Toda página MUST atender WCAG 2.1 nível AA e às diretrizes do eMAG para sítios públicos:
HTML semântico, hierarquia de headings sem saltos, `lang="pt-BR"`, contraste mínimo 4.5:1 em
texto corrente, foco visível, navegação completa por teclado, texto alternativo em toda imagem
informativa e skip link para o conteúdo principal. Violação de acessibilidade MUST bloquear o
merge.

Rationale: acesso a serviço público não pode depender de capacidade sensorial ou motora do
cidadão; conformidade é obrigação legal (LBI, Decreto 5.296/2004), não melhoria opcional.

### IV. Orçamento de Performance

Build de produção MUST atingir Lighthouse >= 95 em Performance, Accessibility, Best Practices e
SEO. Orçamento por página: <= 150 KB de JS transferido e <= 100 KB de CSS. Imagens MUST usar o
componente `<Image />` do Astro com dimensões explícitas e formatos modernos. Fontes MUST ser
auto-hospedadas com `font-display: swap`.

Rationale: o público inclui servidores, docentes e cidadãos em redes institucionais e móveis
saturadas; peso de página é barreira de acesso, e orçamento numérico torna a regra testável.

### V. Fidelidade Institucional

Todo conteúdo publicado MUST derivar da Carta de Serviços do EGP ou de documento institucional
citável (portaria, PDI, edital). Números, valores de portfólio, nomes de setores e fronteiras de
responsabilidade MUST NOT ser inventados, arredondados ou parafraseados de modo a alterar
sentido. Dado ainda indisponível MUST aparecer como placeholder explícito marcado no conteúdo,
nunca como valor plausível inventado.

Rationale: o site é peça de comunicação oficial de órgão público; informação incorreta sobre
limites de atuação ou canais de atendimento gera retrabalho, risco jurídico e perda de
confiança institucional.

## Restrições Técnicas e de Privacidade

- Stack: Astro (última versão estável) + TypeScript em modo `strict`. Nenhum framework de UI
  adicional (React/Vue/Svelte) MUST ser introduzido sem justificativa registrada no plano.
- Idioma: pt-BR em todo conteúdo, metadados, URLs e `alt`.
- Hospedagem: artefato estático em ambiente oficial da CTI do Ifes. Nenhum serviço de terceiros
  MUST ser adicionado como dependência de runtime.
- LGPD: proibido embutir scripts de rastreamento de terceiros, cookies de marketing, fontes ou
  assets carregados de CDN externa e formulários que coletem dado pessoal sem base legal
  registrada. Analytics, se existir, MUST ser solução sem cookies auto-hospedada pela CTI.
- Identidade visual: MUST respeitar o manual de identidade do Ifes; logo e nome institucional
  MUST NOT ser alterados ou recriados.

## Fluxo de Desenvolvimento e Quality Gates

- Desenvolvimento segue o ciclo Spec-Driven do Spec Kit: `constitution` → `specify` → `plan` →
  `tasks` → `implement`. Código MUST NOT ser escrito antes de existirem `spec.md` e `tasks.md`
  aprovados para a feature.
- Trabalho ocorre em branch por feature; `main` MUST permanecer sempre publicável.
- Quality gates obrigatórios antes de merge: `astro check` sem erros, build de produção sem
  warnings, verificação automática de acessibilidade nas páginas alteradas e verificação de
  links internos.
- Revisão de conteúdo: mudança em texto institucional MUST ser aprovada por servidor do EGP
  antes de ir para `main`.
- Complexidade adicional (nova dependência, nova ilha interativa, novo serviço) MUST ser
  justificada no plano da feature contra os princípios I e IV.

## Governance

Esta constituição supersede qualquer outra prática do projeto. Em conflito entre um pedido e um
princípio aqui declarado, o princípio prevalece até ser formalmente emendado.

Emendas: propostas em PR que altere este arquivo, contendo justificativa, impacto nas features
existentes e plano de migração quando houver quebra. Aprovação exige concordância da
coordenação do EGP.

Versionamento semântico do documento: MAJOR para remoção ou redefinição incompatível de
princípio; MINOR para novo princípio ou seção materialmente expandida; PATCH para
esclarecimento, redação ou correção não-semântica.

Conformidade: toda revisão de PR MUST verificar aderência aos princípios I–V e aos quality
gates. Revisões periódicas do conteúdo acompanham o caráter vivo da Carta de Serviços.

**Version**: 1.0.0 | **Ratified**: 2026-09-21 | **Last Amended**: 2026-09-21
