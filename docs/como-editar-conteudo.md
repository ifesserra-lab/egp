# Como editar o conteúdo do site

Receitas para as alterações mais comuns. Cada uma assume que você já tem o repositório na máquina
e sabe rodar `npm run dev` — se ainda não for o caso, faça antes o
[tutorial de primeira edição](tutorial-primeira-edicao.md).

Todos os campos, limites e mensagens de erro estão na
[referência do conteúdo](referencia-conteudo.md).

## Como alterar um texto que já existe

1. Localize o arquivo na [referência do conteúdo](referencia-conteudo.md#onde-mora-cada-conteúdo).
2. Altere o texto e salve.
3. `npm run dev` e confira no navegador.
4. Commit, push e pull request.

## Como acrescentar um pilar de serviço

Crie um arquivo em `src/content/pilares/`. O nome do arquivo vira o endereço da âncora pública —
`novo-pilar.md` responde em `/#novo-pilar`, então use apenas letras minúsculas, números e
hífens.

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
resumo: Frase curta exibida no cartão da página inicial.
---

Parágrafo opcional de detalhamento.
```

O pilar entra sozinho na seção de Serviços, na posição indicada por `ordem`.

## Como acrescentar uma unidade do ecossistema

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

## Como acrescentar ou alterar um fluxo operacional

Crie ou edite um arquivo em `src/content/fluxos/`:

```markdown
---
nome: Nome do fluxo
numero: 5
soWhat: O efeito prático do fluxo — a camada "So What?".
---

Descrição do fluxo.
```

## Como publicar um canal de atendimento que ficou disponível

Canais vivem em `src/data/contatos.yaml`. Um canal em implantação aparece no site com o aviso e
sem endereço; um canal disponível aparece com o endereço clicável.

Para publicar o endereço, troque `situacao` para `ativo`, acrescente `endereco` e remova
`avisoPendencia`:

```yaml
- id: email-oficial
  ordem: 1
  tipo: email
  rotulo: E-mail oficial
  situacao: ativo
  endereco: escritorioprojetos.ser@ifes.edu.br
  observacao: Centralização de demandas e histórico oficial.
```

Se o build recusar a alteração, confira as duas regras em
[referência do conteúdo](referencia-conteudo.md#canais-de-atendimento) — elas existem para impedir
que o site publique um endereço que ainda não existe.

## Como suspender um canal sem perder o dado

Comente o bloco inteiro com `#` no começo de cada linha e deixe uma nota dizendo o motivo. O canal
some do site e o registro fica no arquivo, pronto para voltar:

```yaml
# Canal de telefone desabilitado em 2026-09-21: número pendente de confirmação.
# - id: telefone
#   ordem: 2
#   tipo: telefone
#   rotulo: Telefone
#   situacao: ativo
#   endereco: (27) 3333-3333
```

## Como alterar a tabela de limites de atuação

Edite `src/data/fronteiras.yaml`. Cada item é uma linha da tabela e os dois lados são
obrigatórios:

```yaml
- id: identificador-sem-espacos
  ordem: 5
  egp: O que é atribuição do EGP.
  coordenador: O que é responsabilidade do coordenador ou do setor.
```

## Como atualizar a data de revisão da Carta

Em `src/data/institucional.yaml`, altere `atualizadoEm` para a data da revisão, no formato
`AAAA-MM-DD`. A data aparece no rodapé de todas as páginas.

## Como remover um item

Apague o arquivo Markdown ou a entrada do YAML. O item some das listagens e dos menus, sem deixar
link quebrado. Para conferir, rode `npm run verify`.

## Como descobrir o que quebrou

Rode `npm run build`. A mensagem de erro cita o arquivo e o campo. As mensagens mais comuns estão
listadas na [referência do conteúdo](referencia-conteudo.md#mensagens-de-erro-do-build).
