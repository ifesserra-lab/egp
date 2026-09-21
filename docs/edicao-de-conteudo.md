# Como editar o conteúdo do site

Guia para servidores do EGP. Não é preciso saber programar: todo o texto publicado está em
arquivos de texto simples, em duas pastas.

- `src/content/` — textos em Markdown, um arquivo por item (pilar, fluxo, unidade do ecossistema,
  abertura de página).
- `src/data/` — listas e dados institucionais em YAML.

Depois de editar, rode `npm run build`. Se algo estiver fora do formato, o comando avisa qual
arquivo e qual campo estão errados, e nada incompleto é publicado.

## Alterar um texto existente

1. Abra o arquivo correspondente (tabela no [README](../README.md)).
2. Altere o texto entre aspas ou abaixo do traço triplo `---`.
3. Salve, rode `npm run build` e confira com `npm run preview`.

## Acrescentar um pilar de serviço

Crie um arquivo em `src/content/pilares/`, por exemplo `novo-pilar.md`. O nome do arquivo vira o
endereço da âncora (`/servicos#novo-pilar`).

```markdown
---
nome: Nome do pilar
ordem: 5
objetivo: Uma frase dizendo o que o pilar busca.
atividades:
  - Primeira atividade.
  - Segunda atividade.
entregaveis:
  - O que o pilar entrega.
resumo: Frase curta (até 160 caracteres) exibida no cartão da página inicial.
---

Parágrafo opcional de detalhamento. Pode ter mais de um parágrafo.
```

## Acrescentar uma unidade do ecossistema

Crie um arquivo em `src/content/ecossistema/`:

```markdown
---
nome: Nome da unidade
ordem: 4
papel: O que a unidade faz.
relacaoComEgp: Como o EGP se relaciona com ela.
---

Texto opcional.
```

## Acrescentar ou alterar um fluxo operacional

Arquivo em `src/content/fluxos/`:

```markdown
---
nome: Nome do fluxo
numero: 5
soWhat: O efeito prático do fluxo — a camada "So What?".
---

Descrição do fluxo.
```

## Alterar os canais de atendimento

Arquivo `src/data/contatos.yaml`. Regra importante: um canal **pendente** não pode ter endereço,
e um canal **ativo** é obrigado a ter. Isso impede que o site publique um endereço inexistente.

Canal ainda em implantação:

```yaml
- id: email-oficial
  ordem: 1
  tipo: email
  rotulo: E-mail oficial
  situacao: pendente
  avisoPendencia: Conta institucional em implantação. O endereço será publicado assim que ativada.
  observacao: Centralização de demandas e histórico oficial.
```

O mesmo canal depois de a conta existir:

```yaml
- id: email-oficial
  ordem: 1
  tipo: email
  rotulo: E-mail oficial
  situacao: ativo
  endereco: egp.serra@ifes.edu.br
  observacao: Centralização de demandas e histórico oficial.
```

`tipo` aceita `email`, `site` ou `ferramenta`.

## Alterar a tabela de limites de atuação

Arquivo `src/data/fronteiras.yaml`. Cada item é uma linha da tabela, e os dois lados são
obrigatórios:

```yaml
- id: identificador-sem-espacos
  ordem: 5
  egp: O que é atribuição do EGP.
  coordenador: O que é responsabilidade do coordenador ou do setor.
```

## Atualizar a data de revisão da Carta

Em `src/data/institucional.yaml`, campo `atualizadoEm`, no formato `AAAA-MM-DD`. A data aparece no
rodapé de todas as páginas.

## Remover um item

Apague o arquivo Markdown ou a entrada do YAML. O item some das listagens e dos menus
automaticamente, sem deixar link quebrado.

## Erros comuns

| Mensagem do build | O que fazer |
| --- | --- |
| `resumo deve ter no máximo 160 caracteres` | encurte o campo `resumo` |
| `Canal "ativo" exige "endereco"` | preencha `endereco` ou volte para `situacao: pendente` |
| `descricao deve ter ao menos 50 caracteres` | escreva uma descrição mais completa da página |
| `atualizadoEm deve ser uma data ISO` | use o formato `AAAA-MM-DD` |
