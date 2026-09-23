# Referência do conteúdo

Descrição dos arquivos que alimentam o site, seus campos e suas regras de validação. Todo
conteúdo é validado durante `npm run build`; um arquivo fora do formato interrompe o build e
nenhuma página incompleta é publicada.

## Onde mora cada conteúdo

| Conteúdo | Arquivo | Formato | Quantidade atual |
| --- | --- | --- | --- |
| Dados institucionais | `src/data/institucional.yaml` | registro único | 1 |
| Limites de atuação | `src/data/fronteiras.yaml` | lista | 4 |
| Canais de atendimento | `src/data/contatos.yaml` | lista | 1 |
| Pilares de serviço | `src/content/pilares/*.md` | um arquivo por item | 4 |
| Fluxos operacionais | `src/content/fluxos/*.md` | um arquivo por item | 4 |
| Unidades do ecossistema | `src/content/ecossistema/*.md` | um arquivo por item | 3 |
| Procedimentos da DOACI | `src/content/procedimentos/*.md` | um arquivo por passo | 6 |
| Faixas de percentual da DOACI | `src/data/doaci.yaml` | lista | 6 |
| Base normativa da DOACI | `src/data/doaci-referencias.yaml` | lista | 6 |
| Rótulos da calculadora | `src/data/calculadora.yaml` | registro único | 1 |
| Texto de abertura das seções | `src/content/paginas/*.md` | um arquivo por seção | 8 |

Em arquivos Markdown, o nome do arquivo sem a extensão é o identificador do item e compõe a
âncora pública da rota correspondente.

## Dados institucionais

Arquivo `src/data/institucional.yaml`, registro único sob a chave `egp`.

| Campo | Tipo | Obrigatório | Descrição |
| --- | --- | --- | --- |
| `nomeUnidade` | texto | sim | Nome completo da unidade, exibido no rodapé |
| `nomeCurto` | texto | sim | Nome exibido no cabeçalho e no título das páginas |
| `campus` | texto | sim | Identificação do campus |
| `vinculo` | texto | sim | Unidade à qual o EGP é vinculado |
| `missao` | texto | sim | Texto da missão, exibido na página inicial |
| `identidades` | lista de texto | sim | Identidades institucionais exibidas como etiquetas |
| `ctaNav` | texto | sim | Rótulo do botão de ação na navegação |
| `rotuloMenu` | texto | sim | Rótulo do botão que abre o menu no celular |
| `chamadaTitulo` | texto | sim | Título da faixa de chamada antes do rodapé |
| `chamadaTexto` | texto | sim | Texto da faixa de chamada antes do rodapé |
| `atualizadoEm` | data `AAAA-MM-DD` | sim | Data da última revisão, exibida no rodapé |

## Pilares de serviço

Arquivos em `src/content/pilares/`.

| Campo | Tipo | Obrigatório | Regra |
| --- | --- | --- | --- |
| `nome` | texto | sim | Não pode ficar vazio |
| `ordem` | número inteiro | sim | Entre 1 e 4; define a posição de exibição |
| `objetivo` | texto | sim | Não pode ficar vazio |
| `atividades` | lista de texto | sim | Mínimo de 1 item |
| `entregaveis` | lista de texto | sim | Mínimo de 1 item |
| `resumo` | texto | sim | Máximo de 160 caracteres; exibido no cartão da página inicial |
| corpo | Markdown | não | Detalhamento exibido na página de Serviços |

## Fluxos operacionais

Arquivos em `src/content/fluxos/`.

| Campo | Tipo | Obrigatório | Regra |
| --- | --- | --- | --- |
| `nome` | texto | sim | Não pode ficar vazio |
| `numero` | número inteiro | sim | Entre 1 e 4 |
| `naPratica` | texto | sim | Conteúdo da bloco "Na prática" |
| corpo | Markdown | sim | Descrição do fluxo |

## Unidades do ecossistema

Arquivos em `src/content/ecossistema/`.

| Campo | Tipo | Obrigatório | Regra |
| --- | --- | --- | --- |
| `nome` | texto | sim | Não pode ficar vazio |
| `ordem` | número inteiro | sim | Maior ou igual a 1 |
| `papel` | texto | sim | O que a unidade faz |
| `relacaoComEgp` | texto | sim | Como o EGP se relaciona com ela |
| corpo | Markdown | não | Detalhamento |

## Texto de abertura das páginas

Arquivos em `src/content/paginas/`. O identificador do arquivo corresponde à rota.

| Campo | Tipo | Obrigatório | Regra |
| --- | --- | --- | --- |
| `titulo` | texto | sim | Usado no `<h1>` e no título do navegador |
| `descricao` | texto | sim | Entre 50 e 160 caracteres; usado na descrição para buscadores |
| `rota` | texto | sim | Começa com `/` (página) ou `#` (âncora de seção) |
| `manchete` | texto | não | Título de destaque da seção inicial; ausente usa `titulo` |
| `chamadaSecao` | texto | não | Título editorial da seção; ausente usa `titulo` |
| `ordemNav` | número inteiro | não | Posição no menu; ausente mantém a seção fora do menu |
| `rotuloNav` | texto | não | Rótulo no menu; ausente usa `titulo` |
| corpo | Markdown | sim | Texto de abertura |

## Procedimentos da DOACI

Arquivos em `src/content/procedimentos/`. Cada arquivo é um passo da lista numerada da seção DOACI.

| Campo | Tipo | Obrigatório | Regra |
| --- | --- | --- | --- |
| `nome` | texto | sim | Título do passo |
| `ordem` | número inteiro | sim | Maior ou igual a 1; define a numeração exibida |
| `resumo` | texto | sim | Máximo de 160 caracteres; frase de destaque do cartão |
| `baseNormativa` | texto | sim | Norma e item que sustentam o passo, exibidos no rodapé do cartão |
| corpo | Markdown | sim | Detalhamento do passo |

## Faixas de percentual da DOACI

Arquivo `src/data/doaci.yaml`, lista. Alimenta ao mesmo tempo a tabela publicada e o cálculo feito
pela calculadora — mexer aqui muda os dois.

| Campo | Tipo | Obrigatório | Regra |
| --- | --- | --- | --- |
| `id` | texto | sim | Identificador único |
| `ordem` | número inteiro | sim | Posição na tabela |
| `rotulo` | texto | sim | Faixa como aparece na tabela |
| `de` | número | sim | Início da faixa em reais, sem separador de milhar |
| `ate` | número ou `null` | sim | Fim da faixa; `null` apenas na última faixa, que é aberta |
| `percentual` | número | sim | Maior que zero e no máximo 15 |

Os valores de `de` e `ate` são escritos como número puro (`50000.01`, com ponto decimal), não no
formato brasileiro. As faixas precisam cobrir a tabela inteira sem buraco: o `de` de uma faixa é o
centavo seguinte ao `ate` da anterior.

## Base normativa da DOACI

Arquivo `src/data/doaci-referencias.yaml`, lista.

| Campo | Tipo | Obrigatório | Regra |
| --- | --- | --- | --- |
| `id` | texto | sim | Identificador único |
| `ordem` | número inteiro | sim | Posição de exibição |
| `titulo` | texto | sim | Nome da norma, com o item citado |
| `orgao` | texto | sim | Quem editou a norma |
| `url` | texto | sim | Endereço completo, começando por `https://` |
| `formato` | `PDF`, `DOC` ou `XLS` | não | Tipo do arquivo, exibido como etiqueta ao lado do link |
| `destaque` | `true` ou `false` | não | `true` repete o documento no bloco de atalhos, acima da calculadora |
| `oQueDefine` | texto | sim | O que essa norma resolve sobre a DOACI |

## Rótulos da calculadora

Arquivo `src/data/calculadora.yaml`, registro único sob a chave `doaci`. Guarda todo o texto que a
calculadora exibe — rótulos de campo, textos de ajuda, títulos do resultado e mensagens de erro.
Todos os campos são obrigatórios e nenhum pode ficar vazio; a lista completa está no schema, em
`src/content.config.ts`.

Aqui também moram o `tituloEscopo` e o `avisoEscopo`, que formam o aviso de que a DOACI só vale
para projetos financiados pela FAPES e pelo FUNCITEC, e o `tituloDocumentos`, que encabeça o bloco
de atalhos para as normas.

Trocar uma mensagem de erro aqui muda o que o usuário lê quando digita um valor inválido. A fórmula
e os percentuais **não** moram neste arquivo: percentuais estão em `src/data/doaci.yaml` e a
fórmula é fixa no componente.

## Limites de atuação

Arquivo `src/data/fronteiras.yaml`, lista.

| Campo | Tipo | Obrigatório | Regra |
| --- | --- | --- | --- |
| `id` | texto | sim | Identificador único |
| `ordem` | número inteiro | sim | Maior ou igual a 1 |
| `egp` | texto | sim | Coluna de atribuições do EGP |
| `coordenador` | texto | sim | Coluna de responsabilidades do coordenador ou setor |

## Canais de atendimento

Arquivo `src/data/contatos.yaml`, lista.

| Campo | Tipo | Obrigatório | Regra |
| --- | --- | --- | --- |
| `id` | texto | sim | Identificador único |
| `ordem` | número inteiro | sim | Posição de exibição |
| `tipo` | `email`, `telefone`, `site` ou `ferramenta` | sim | Determina o formato do link: `mailto:`, `tel:` ou link comum |
| `rotulo` | texto | sim | Nome exibido |
| `situacao` | `ativo` ou `pendente` | sim | Determina a exibição do endereço |
| `endereco` | texto | condicional | Obrigatório quando `situacao` é `ativo`; proibido quando é `pendente` |
| `observacao` | texto | não | Nota sobre o uso do canal |
| `avisoPendencia` | texto | condicional | Obrigatório quando `situacao` é `pendente` |

Um canal `pendente` é exibido com o selo "Em implantação" e o texto de `avisoPendencia`, sem
link. Um canal `ativo` é exibido com o endereço clicável.

## Mensagens de erro do build

| Mensagem | Causa |
| --- | --- |
| `<campo> é obrigatório` | O campo não existe no arquivo |
| `<campo> não pode ficar vazio` | O campo existe, mas está em branco |
| `resumo deve ter no máximo 160 caracteres` | O campo `resumo` excede o limite |
| `descricao deve ter ao menos 50 caracteres` | A descrição da página é curta demais para os metadados |
| `Canal "ativo" exige "endereco"; canal "pendente" não pode ter "endereco"` | A combinação de `situacao` e `endereco` é inválida |
| `Canal "pendente" exige "avisoPendencia"` | Falta o texto do aviso de indisponibilidade |
| `atualizadoEm deve ser uma data ISO (AAAA-MM-DD)` | O formato da data está incorreto |
| `percentual não pode exceder 15% (Decreto nº 9.283/2018, art. 74)` | Uma faixa de DOACI passou do teto legal |
| `ate deve ser maior que de, ou null para a última faixa (aberta)` | Os limites da faixa de DOACI estão invertidos ou incompletos |
| `url deve ser um endereço completo (https://...)` | A referência normativa não tem endereço válido |

A mensagem inclui o nome do arquivo e, quando aplicável, o identificador do item.
