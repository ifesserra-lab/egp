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
| Texto de abertura das seções | `src/content/paginas/*.md` | um arquivo por seção | 7 |

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

A mensagem inclui o nome do arquivo e, quando aplicável, o identificador do item.
