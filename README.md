# Site do Escritório de Gestão de Projetos (EGP) — Campus Serra

Site institucional do EGP do Campus Serra do Ifes, construído a partir da Carta de Serviços do
escritório.

**No ar:** <https://ifesserra-lab.github.io/egp/> (homologação)

O conteúdo do site vive em arquivos de texto no próprio repositório, para que servidores do EGP
possam atualizá-lo sem mexer em código.

## Por onde começar

| Se você quer… | Leia |
| --- | --- |
| aprender a editar o site, do zero | [Primeira edição no site](docs/tutorial-primeira-edicao.md) |
| resolver uma tarefa agora | [Como editar o conteúdo](docs/como-editar-conteudo.md) · [Como publicar](docs/como-publicar.md) |
| consultar um campo ou comando | [Referência do conteúdo](docs/referencia-conteudo.md) · [Referência dos comandos](docs/referencia-comandos.md) |
| entender por que o site é assim | [Sobre as decisões do projeto](docs/sobre-as-decisoes.md) |

O índice completo está em [docs/index.md](docs/index.md).

## Rodando localmente

Requer Node.js 22 ou superior.

```bash
npm install
npm run dev      # http://localhost:4321
npm run verify   # confere conteúdo, tipos, links e acessibilidade
```

## Como o projeto está organizado

- `src/content/` e `src/data/` — todo o conteúdo institucional
- `src/pages/` — uma rota por arquivo
- `docs/` — documentação
- `specs/001-site-institucional-egp/` — especificação, plano e tarefas do desenvolvimento
- `.specify/memory/constitution.md` — princípios que regem o projeto

## Pendências para o EGP

- Confirmar o telefone de atendimento, hoje desabilitado em `src/data/contatos.yaml`
- Definir com a CTI o domínio institucional e migrar a hospedagem
- Substituir a paleta provisória pelos valores do manual de identidade do Ifes
