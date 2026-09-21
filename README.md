# Site do Escritório de Gestão de Projetos (EGP) — Campus Serra

Site institucional do EGP do Campus Serra do Ifes, gerado estaticamente com [Astro](https://astro.build).
O conteúdo vem da Carta de Serviços do escritório e é editável por qualquer servidor do EGP, sem
precisar mexer em código.

## Como editar o conteúdo

Todo o texto publicado está em duas pastas:

| O que você quer mudar | Onde editar |
| --- | --- |
| Missão, portaria, portfólio, Regra de Ouro, data de atualização | `src/data/institucional.yaml` |
| Tabela de limites de atuação | `src/data/fronteiras.yaml` |
| Canais de atendimento | `src/data/contatos.yaml` |
| Pilares de serviço | `src/content/pilares/` (um arquivo por pilar) |
| Fluxos operacionais | `src/content/fluxos/` (um arquivo por fluxo) |
| Unidades do ecossistema de inovação | `src/content/ecossistema/` |
| Texto de abertura de cada página | `src/content/paginas/` |

Passo a passo detalhado, com exemplos copiáveis: [docs/edicao-de-conteudo.md](docs/edicao-de-conteudo.md).

**Canais pendentes.** Um canal com `situacao: pendente` aparece no site como "Em implantação",
sem endereço. Ao ficar disponível, troque para `situacao: ativo` e preencha `endereco` — o aviso
some sozinho. O site nunca publica um endereço que ainda não existe.

## Como rodar

Requer Node.js 22 LTS ou superior.

```bash
npm install     # uma vez
npm run dev     # servidor local em http://localhost:4321
npm run build   # gera o site em dist/
npm run preview # serve o dist/ para conferência
```

## Verificação antes de publicar

```bash
npm run check      # tipos e conteúdo
npm run build      # valida o formato de todo o conteúdo
npm run test:links # links internos quebrados
npm run test:a11y  # acessibilidade WCAG 2.1 AA (requer o preview rodando)
npm run test:perf  # desempenho (Lighthouse >= 95)
npm run verify     # check + build + links
```

Se um arquivo de conteúdo estiver fora do formato, o `build` falha indicando o arquivo e o campo —
nada incompleto vai para o ar.

## Publicação

O site é um conjunto de arquivos estáticos em `dist/`, publicado no ambiente oficial da CTI.
Procedimento e variáveis de ambiente: [docs/publicacao.md](docs/publicacao.md).

## Documentos do projeto

- Carta de Serviços original (somente leitura): [docs/fonte/carta-servicos-original.md](docs/fonte/carta-servicos-original.md)
- Princípios do projeto: [.specify/memory/constitution.md](.specify/memory/constitution.md)
- Especificação, plano e tarefas: [specs/001-site-institucional-egp/](specs/001-site-institucional-egp/)
