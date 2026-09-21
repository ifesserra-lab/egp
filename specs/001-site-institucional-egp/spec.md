# Feature Specification: Site Institucional do EGP Campus Serra

**Feature Branch**: `001-site-institucional-egp`

**Created**: 2026-09-21

**Status**: Draft

**Input**: User description: "Site institucional estático do Escritório de Gestão de Projetos (EGP) do Campus Serra do Ifes. Conteúdo-fonte: carta_servicos.md. Escopo: institucional + portfólio de serviços, com páginas de Home, Sobre, Serviços (4 pilares), Fluxos Operacionais, Limites de Atuação, Ecossistema de Inovação e Contato. Público: docentes, técnicos administrativos, coordenadores, gestores e cidadãos."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Descobrir o que o EGP faz e como acioná-lo (Priority: P1)

Um docente ou técnico administrativo do Campus Serra ouviu falar do EGP e precisa entender, em
poucos minutos, quais serviços o escritório oferece e por qual canal solicitar apoio para um
projeto que pretende submeter.

**Why this priority**: É a razão de existir do site. Sem isso, o EGP continua dependendo de
divulgação boca a boca e o objetivo de desonerar pesquisadores não se cumpre. Entrega valor
sozinha: uma Home com missão, os quatro pilares de serviço e os canais de atendimento já é um
site publicável.

**Independent Test**: Publicar apenas Home, Serviços e Contato e pedir a um servidor que nunca
viu o site que responda "o que o EGP faz por mim?" e "como peço ajuda?" sem apoio externo.

**Acceptance Scenarios**:

1. **Given** um visitante na página inicial, **When** ele lê a primeira dobra, **Then** vê a
   missão do EGP e uma chamada para cada um dos quatro pilares de serviço.
2. **Given** um visitante na página de Serviços, **When** abre qualquer pilar, **Then** vê o
   objetivo, as atividades e os entregáveis daquele pilar, com o mesmo texto da Carta de Serviços.
3. **Given** um visitante em qualquer página do site, **When** procura como contatar o EGP,
   **Then** encontra o caminho para a página de Contato a partir da navegação principal, sem
   precisar voltar à Home.

---

### User Story 2 - Saber o que é responsabilidade do EGP antes de pedir (Priority: P2)

Um coordenador de projeto quer abrir uma demanda (compra, remanejamento, tramitação na fundação)
e precisa saber se aquilo cabe ao EGP ou a ele próprio, e qual fluxo será aplicado.

**Why this priority**: Reduz retrabalho e demanda mal endereçada — a dor operacional do
escritório. Depende da existência da navegação criada na US1, mas é testável isoladamente.

**Independent Test**: Publicar as páginas de Limites de Atuação e Fluxos Operacionais e pedir a
um coordenador que classifique cinco demandas fictícias entre "EGP" e "minha responsabilidade".

**Acceptance Scenarios**:

1. **Given** um coordenador na página de Limites de Atuação, **When** compara as colunas,
   **Then** vê lado a lado as atribuições do EGP e as responsabilidades do coordenador e dos
   setores, com os quatro pares de itens da Carta.
2. **Given** um coordenador na página de Fluxos Operacionais, **When** percorre a página,
   **Then** encontra os quatro fluxos, cada um com sua descrição e sua camada "So What?".
3. **Given** um coordenador que pretende solicitar compra ou remanejamento, **When** acessa os
   Fluxos Operacionais, **Then** encontra a "Regra de Ouro" em destaque, indicando análise prévia
   obrigatória do EGP.

---

### User Story 3 - Avaliar a maturidade institucional do escritório (Priority: P3)

Um gestor do campus, avaliador externo, parceiro ou cidadão quer entender como o EGP se sustenta
e como ele se articula com as demais unidades de inovação do campus.

**Why this priority**: Sustenta transparência pública e a captação institucional, mas não é
pré-requisito para o uso cotidiano do serviço.

**Independent Test**: Publicar Sobre e Ecossistema e verificar se um leitor externo consegue
descrever o modelo de custeio do EGP e dizer o que cabe ao EGP e o que cabe à Agifes.

**Acceptance Scenarios**:

1. **Given** um visitante na página Sobre, **When** lê a seção de modelo operacional, **Then**
   entende que a manutenção do EGP é custeada por recursos de projetos aprovados, com custo zero
   para o orçamento regular, e vê o vínculo com a DPPGE e a Portaria nº 190/2026.
2. **Given** um visitante interessado em inovação, **When** acessa a página de Ecossistema,
   **Then** distingue os papéis do Parque de Inovação Alvo Serra, do Núcleo Incubador e a divisão
   de competências entre EGP e Agifes.

---

### User Story 4 - Atualizar o conteúdo sem depender de desenvolvedor (Priority: P2)

Um servidor do EGP revisa a Carta de Serviços (documento vivo) e precisa publicar o texto novo —
por exemplo, preencher o e-mail oficial quando a conta for criada, ou incluir uma nova unidade
do ecossistema de inovação.

**Why this priority**: A Carta é revisada periodicamente; se cada revisão exigir um
desenvolvedor, o site envelhece e perde confiabilidade. Testável isoladamente sobre qualquer
página já publicada.

**Independent Test**: Pedir a um servidor sem experiência em programação que altere um texto e
acrescente uma unidade do ecossistema, seguindo a documentação do repositório, e verificar que a mudança aparece no
site publicado.

**Acceptance Scenarios**:

1. **Given** um servidor com acesso ao repositório, **When** edita o texto de um pilar de serviço
   no arquivo de conteúdo correspondente, **Then** a alteração aparece no site publicado sem que
   nenhum arquivo de código precise ser tocado.
2. **Given** um servidor que acrescenta uma nova unidade do ecossistema, **When** segue o formato
   documentado, **Then** o item passa a aparecer na listagem correspondente automaticamente.
3. **Given** um servidor que preenche um campo de contato antes vazio, **When** publica a
   alteração, **Then** o aviso de canal indisponível desaparece e o canal passa a ser exibido em
   todas as páginas que o citam.
4. **Given** um conteúdo salvo fora do formato esperado (campo obrigatório ausente), **When** a
   publicação é gerada, **Then** o processo falha com mensagem indicando o arquivo e o campo, em
   vez de publicar uma página quebrada.

---

### Edge Cases

- **Canais ainda não ativos**: e-mail oficial e endereço do site estão pendentes na Carta. O site
  MUST exibir aviso explícito de canal em implantação, nunca um endereço inventado ou um link
  morto.
- **Visitante sem mouse ou usando leitor de tela**: toda a navegação, incluindo menus e tabelas
  comparativas, MUST ser operável por teclado e anunciada corretamente.
- **Conexão institucional lenta ou rede móvel saturada**: o conteúdo textual MUST ser legível sem
  esperar por scripts, fontes ou imagens.
- **Navegador sem JavaScript**: nenhuma informação da Carta MUST depender de JavaScript para ser
  exibida.
- **Tabelas largas em tela de celular**: as tabelas de limites de atuação e de pilares MUST
  permanecer legíveis em telas estreitas, sem rolagem horizontal da página inteira.
- **Seção removida na revisão da Carta**: quando um item deixa de existir, links internos para ele
  MUST deixar de ser gerados, em vez de apontar para página inexistente.
- **Impressão ou compartilhamento em PDF**: as páginas MUST imprimir de forma legível, sem cortar
  texto de tabelas.

## Requirements *(mandatory)*

### Functional Requirements

> **FR-009** (indicadores), **FR-010** (cases) e **FR-014** (página com a Carta em leitura corrida)
> foram retiradas do escopo em 2026-09-21 a pedido do EGP. Os identificadores permanecem
> aposentados para não deslocar as demais referências.

**Conteúdo institucional**

- **FR-001**: O site MUST publicar a totalidade das seções da Carta de Serviços: apresentação e
  identidade, modelo operacional, limites de atuação, matriz de serviços, fluxos operacionais,
  ecossistema de inovação e contatos. As seções 7 (indicadores) e 8 (cases) da Carta ficam fora
  do escopo desta entrega, por decisão do EGP.
- **FR-002**: O texto institucional publicado MUST ser fiel à Carta de Serviços, preservando
  números, nomes de unidades, siglas e a redação de missão, sem paráfrase que altere sentido.
- **FR-003**: A página inicial MUST apresentar a missão do EGP, a identidade "Motor Tático" e
  "Engrenagem de Maturidade Institucional" e uma chamada para cada um dos quatro pilares.
- **FR-004**: A página Sobre MUST informar o vínculo com a DPPGE, a Portaria nº 190/2026, a
  composição colaborativa da equipe, o modelo de custeio autossustentável, o protagonismo dos
  Técnicos Administrativos.
- **FR-005**: A seção de serviços MUST apresentar os quatro pilares, cada um com objetivo,
  atividades e entregáveis.
- **FR-006**: A seção de fluxos operacionais MUST apresentar os quatro fluxos, cada um com sua
  camada "So What?", e destacar a "Regra de Ouro" de análise prévia obrigatória.
- **FR-007**: A seção de limites de atuação MUST apresentar, em formato comparativo, as
  atribuições do EGP e as responsabilidades do coordenador e dos setores.
- **FR-008**: A seção de ecossistema MUST descrever o Parque de Inovação Alvo Serra, o Núcleo
  Incubador e a divisão de competências entre EGP e Agifes.
- **FR-011**: A página de Contato MUST listar os canais oficiais de atendimento e a ferramenta de
  gestão de fluxos adotada.
- **FR-012**: Canais ainda não ativos MUST ser exibidos com aviso explícito de indisponibilidade
  temporária; o site MUST NOT exibir endereço de e-mail ou URL não confirmados.
- **FR-013**: O site MUST exibir a data da última atualização do conteúdo.

**Navegação e uso**

- **FR-015**: Toda seção MUST ser alcançável em um clique a partir da navegação principal.
- **FR-016**: O site MUST oferecer caminho de volta ao início a partir da página de erro.
- **FR-017**: O site MUST oferecer âncoras estáveis e legíveis por seção, de modo que qualquer
  seção possa ser citada em ofício, e-mail ou apresentação.
- **FR-018**: O site MUST estar integralmente em português do Brasil, incluindo títulos,
  descrições e textos alternativos.

**Acessibilidade e desempenho**

- **FR-019**: Toda página MUST atender WCAG 2.1 nível AA e às diretrizes do eMAG, incluindo
  operação completa por teclado, foco visível, contraste mínimo de 4.5:1 e estrutura de títulos
  sem saltos de nível.
- **FR-020**: Todo conteúdo textual MUST ser exibido sem depender de execução de scripts no
  navegador do visitante.
- **FR-021**: O site MUST permanecer legível e navegável em telas de 320 px de largura, sem
  rolagem horizontal da página.
- **FR-022**: As páginas MUST ser legíveis quando impressas, preservando o conteúdo das tabelas.

**Privacidade e publicação**

- **FR-023**: O site MUST NOT carregar rastreadores, cookies de marketing ou recursos servidos por
  terceiros; todo recurso MUST ser servido pelo ambiente oficial de hospedagem.
- **FR-024**: O site MUST NOT coletar dados pessoais do visitante.
- **FR-025**: O conteúdo institucional MUST ser mantido separado da apresentação, de modo que um
  servidor sem conhecimento de programação possa editá-lo seguindo documentação do repositório.
- **FR-026**: A publicação MUST falhar, indicando arquivo e campo, quando um conteúdo estiver fora
  do formato esperado ou com campo obrigatório ausente, em vez de publicar página incompleta.
- **FR-027**: O repositório MUST conter instruções de como editar conteúdo e publicar o site.

### Key Entities

- **Pilar de Serviço**: uma das quatro frentes de oferta do EGP. Atributos: nome, objetivo,
  atividades, entregáveis, ordem de exibição.
- **Fluxo Operacional**: procedimento aplicado pelo EGP. Atributos: número, nome, descrição,
  camada "So What?".
- **Fronteira de Responsabilidade**: par comparativo. Atributos: atribuição do EGP,
  responsabilidade correspondente do coordenador ou setor.
- **Unidade do Ecossistema**: parceiro institucional de inovação. Atributos: nome, papel, relação
  com o EGP.
- **Canal de Atendimento**: meio oficial de contato. Atributos: tipo, endereço, situação
  (ativo ou em implantação), observação de uso.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% das seções da Carta de Serviços dentro do escopo (todas exceto indicadores e
  cases) estão publicadas nas páginas temáticas e conferem com o documento-fonte em auditoria item a item.
- **SC-002**: Um servidor que nunca viu o site identifica o que o EGP faz e por qual canal
  solicitar apoio em menos de 2 minutos e no máximo 3 cliques.
- **SC-003**: Em teste com coordenadores, 8 de 10 demandas fictícias são corretamente
  classificadas entre "responsabilidade do EGP" e "responsabilidade do coordenador" usando apenas
  o site.
- **SC-004**: Toda página é navegável do início ao fim usando somente o teclado, com foco sempre
  visível, e nenhuma violação de acessibilidade é apontada em verificação automatizada.
- **SC-005**: Em conexão móvel típica (3G), qualquer página exibe seu conteúdo textual em menos de
  2 segundos.
- **SC-006**: Avaliação de qualidade de página atinge no mínimo 95 pontos em desempenho,
  acessibilidade, boas práticas e SEO.
- **SC-007**: Nenhuma requisição a domínio de terceiros é registrada ao carregar qualquer página.
- **SC-008**: Um servidor do EGP sem experiência em programação conclui a alteração de um texto e
  a inclusão de uma nova unidade do ecossistema em menos de 15 minutos seguindo a documentação do
  repositório.
- **SC-009**: Todo conteúdo é exibido corretamente com JavaScript desativado no navegador.
- **SC-010**: Nenhum link interno quebrado existe no site publicado.

## Assumptions

- O e-mail oficial e o endereço do site ainda não existem; até serem definidos, são tratados como
  pendências visíveis ("em implantação"), conforme os placeholders da Carta.
- A hospedagem será em ambiente oficial da CTI do Campus Serra, servindo arquivos estáticos; não há
  servidor de aplicação, banco de dados nem área autenticada.
- A edição de conteúdo ocorre no repositório git do projeto; não há painel administrativo, e essa
  escolha é compatível com o modelo de custeio zero do EGP.
- O site é monolíngue (pt-BR). Versão em outro idioma está fora do escopo desta entrega.
- Identidade visual segue o manual do Ifes; logotipos e marcas institucionais serão fornecidos pelo
  EGP e não serão recriados.
- O site é uma página única com âncoras por seção, por decisão do EGP em 2026-09-21; a estrutura
  anterior, de uma rota por seção, foi descontinuada e aqueles endereços não respondem mais.
- Ferramentas internas de trabalho da equipe (como o quadro de gestão de fluxos) não são citadas
  no site, por decisão do EGP em 2026-09-21.
- Dashboards Horizon e Nexo são sistemas próprios citados como entregáveis; a exibição dos dados
  deles está fora do escopo desta entrega.
- Não há notícias, blog nem biblioteca de documentos para download nesta entrega — escopo definido
  como institucional + portfólio de serviços.
- As seções de indicadores (KPIs) e de cases de sucesso da Carta não são publicadas no site por
  decisão do EGP. Permanecem no
  documento-fonte e podem voltar ao escopo em revisão futura da spec.
- O porte financeiro do portfólio (a cifra aproximada citada na Carta) não é publicado no site,
  por decisão do EGP em 2026-09-21; permanece no documento-fonte.
