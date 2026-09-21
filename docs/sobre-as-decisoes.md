# Sobre as decisões do projeto

Por que o site do EGP é como é. Este documento registra as razões, não os procedimentos — para
executar tarefas, veja os guias listados no [índice](index.md).

## Por que um site estático

O site é gerado uma vez, como HTML pronto, e servido como arquivo. Não há aplicação em execução,
banco de dados nem painel administrativo.

A razão principal é o modelo de sustentação do próprio EGP: o escritório se mantém com recursos
de projetos aprovados, sem orçamento ordinário de custeio. Um site estático custa
aproximadamente nada para manter, não exige janela de atualização de segurança e não quebra
quando ninguém olha para ele por seis meses. A alternativa — um CMS institucional — traria
servidor, banco, usuários e atualizações periódicas, que alguém precisaria manter.

O efeito colateral é bem-vindo: páginas que carregam depressa em rede móvel e continuam legíveis
quando o JavaScript não roda.

## Por que o conteúdo mora no repositório

Todo texto institucional está em `src/content/` e `src/data/`, versionado junto com o código.
Não existe tela de edição.

A escolha resolve três problemas de uma vez. Primeiro, a Carta de Serviços é um documento vivo,
revisado periodicamente: o histórico do Git registra quem mudou o quê e quando, o que um campo de
texto em um painel não faria. Segundo, a separação entre conteúdo e apresentação permite que um
servidor sem perfil técnico altere o site sem tocar em código — nenhum componente contém texto
institucional. Terceiro, a validação é automática: o formato do conteúdo é verificado a cada
build, e um campo faltando derruba a publicação em vez de gerar uma página quebrada.

O custo é real e está declarado: quem edita precisa aprender o básico de Git. O
[tutorial de primeira edição](tutorial-primeira-edicao.md) existe justamente para pagar esse
custo uma vez só.

## Por que um canal pendente não pode exibir endereço

Em `src/data/contatos.yaml`, um canal marcado como `pendente` é proibido de ter `endereco`, e um
canal `ativo` é obrigado a ter. A regra não é burocracia: é a tradução em código de um princípio
do projeto — o site nunca publica informação que ainda não foi confirmada.

Endereço errado em site de órgão público gera demanda perdida, retrabalho e desconfiança. Deixar
o campo "quase pronto", com um endereço provável, é o caminho mais curto para isso acontecer. Com
a regra, o estado intermediário fica visível para o leitor ("Em implantação") e impossível de
virar um link que não funciona.

Quando um canal existe mas não deve aparecer — um número ainda não confirmado, por exemplo — o
bloco é comentado no arquivo em vez de apagado. O dado não se perde e o site não o publica.

## Por que nenhum recurso de terceiros

O site não carrega fontes, scripts, estilos nem rastreadores de fora do próprio domínio. Usa as
fontes já instaladas no dispositivo do visitante.

Isso atende à LGPD sem depender de aviso de cookies: se nada sai para terceiros, não há dado
pessoal do visitante trafegando para lugar nenhum. Também elimina a dependência de um serviço
externo que pode sair do ar, mudar de licença ou ficar bloqueado na rede institucional. E reduz o
peso da página, o que importa para quem acessa em rede móvel saturada.

A mesma lógica vale para a hospedagem: a decisão do campus é hospedar ferramentas em ambiente
oficial da CTI.

## Por que o GitHub Pages é homologação, e não o destino final

O site publicado em <https://ifesserra-lab.github.io/egp/> serve para o EGP ver o resultado e
revisar o conteúdo com facilidade. Não é o endereço definitivo: os princípios do projeto pedem
hospedagem em ambiente oficial da CTI, e um domínio institucional comunica melhor a natureza
pública do serviço.

A migração foi antecipada no desenho. O endereço não está escrito no código: `SITE_URL` e
`SITE_BASE` são lidos no build, e todo caminho interno passa pela função `comBase()`. Trocar de
endereço é alterar duas variáveis, não revisar dezenas de links.

## Por que o site não publica todas as seções da Carta

As seções de indicadores de desempenho e de casos práticos, e a página que reunia a Carta em
leitura corrida, ficaram fora do escopo por decisão do EGP. O texto permanece no documento-fonte
em [`docs/fonte/carta-servicos-original.md`](fonte/carta-servicos-original.md), preservado como
recebido, para auditoria e para eventual retomada.

O documento-fonte é somente leitura por um motivo: duas cópias editáveis do mesmo texto divergem
na primeira revisão. A fonte do que está no ar é o conteúdo em `src/content/` e `src/data/`.

## Onde estão as demais decisões

Este projeto foi desenvolvido pelo método spec-driven. O registro completo está em
`specs/001-site-institucional-egp/`: a especificação com os requisitos, o plano técnico, as
decisões de tecnologia com as alternativas descartadas, o modelo de dados e os contratos de rotas
e de conteúdo. Os princípios que regem o projeto estão em `.specify/memory/constitution.md`.

Aqueles documentos servem a quem desenvolve o site. Este serve a quem quer entender o site.
