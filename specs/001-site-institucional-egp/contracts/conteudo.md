# Contrato de Conteúdo (Schemas)

**Feature**: Site Institucional do EGP Campus Serra | **Date**: 2026-09-21
**Modelo**: [../data-model.md](../data-model.md)

Interface entre quem edita o conteúdo (servidores do EGP) e o site. O build valida este contrato e
falha indicando arquivo e campo quando algo não confere (FR-026). Definição em
`src/content.config.ts`.

## Forma dos schemas

```ts
// src/content.config.ts (forma pretendida — implementação em tasks.md)
import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

const pilares = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pilares' }),
  schema: z.object({
    nome: z.string().min(1),
    ordem: z.number().int().min(1).max(4),
    objetivo: z.string().min(1),
    atividades: z.array(z.string().min(1)).min(1),
    entregaveis: z.array(z.string().min(1)).min(1),
    resumo: z.string().min(1).max(160),
  }),
});

const contatos = defineCollection({
  loader: file('src/data/contatos.yaml'),
  schema: z
    .object({
      id: z.string().min(1),
      tipo: z.enum(['email', 'telefone', 'site', 'ferramenta']),
      rotulo: z.string().min(1),
      situacao: z.enum(['ativo', 'pendente']),
      endereco: z.string().min(1).optional(),
      observacao: z.string().optional(),
      avisoPendencia: z.string().min(1).optional(),
    })
    .refine((c) => (c.situacao === 'ativo' ? !!c.endereco : !c.endereco), {
      message: 'Canal ativo exige endereco; canal pendente NÃO pode ter endereco (FR-012).',
      path: ['endereco'],
    })
    .refine((c) => (c.situacao === 'pendente' ? !!c.avisoPendencia : true), {
      message: 'Canal pendente exige avisoPendencia.',
      path: ['avisoPendencia'],
    }),
});

export const collections = { pilares, contatos /* , fluxos, ecossistema, paginas,
  fronteiras, institucional */ };
```

## Formato dos arquivos de conteúdo

### Item em Markdown (`pilares`, `fluxos`, `ecossistema`, `paginas`)

```markdown
---
nome: Gestão de Portfólio
ordem: 3
objetivo: Inteligência de dados, visão unificada e consolidação de indicadores.
atividades:
  - Monitoramento de prazos e dashboards de ciência de dados.
entregaveis:
  - Dashboards no Horizon (Visão interna/Lattes) e Nexo (Ponte com demandas da indústria).
resumo: Visão unificada do portfólio e consolidação de indicadores institucionais.
---

Texto opcional de detalhamento, em Markdown.
```

O nome do arquivo (sem extensão) vira o `id` e a âncora pública da rota correspondente — renomear
arquivo muda URL, portanto é mudança de contrato.

### Dado tabular em YAML (`fronteiras`, `contatos`)

```yaml
- id: email-oficial
  tipo: email
  rotulo: E-mail oficial
  situacao: ativo
  endereco: escritorioprojetos.ser@ifes.edu.br
  observacao: Centralização de demandas e histórico oficial.

- id: exemplo-canal-ativo
  tipo: site
  rotulo: Canal já disponível
  situacao: ativo
  endereco: https://exemplo.ifes.edu.br
  observacao: Um canal "ativo" é obrigado a trazer "endereco".
```

### Registro único em YAML (`institucional`)

Um objeto com os campos descritos no modelo de dados (missão, vínculo, portaria, identidades,
`atualizadoEm`).

## Regras de validação exigidas

| Regra | Efeito quando violada | Origem |
|---|---|---|
| Campo obrigatório ausente | build falha com arquivo e campo | FR-026 |
| `ordem`/`numero` repetido ou fora da faixa | build falha | data-model |
| Canal `pendente` com `endereco` | build falha | FR-012, princípio V |
| Canal `ativo` sem `endereco` | build falha | FR-012 |
| `resumo` acima do limite de caracteres | build falha | metadados/SEO |
| `paginas.id` sem rota correspondente | build falha | contrato de rotas |
| `atualizadoEm` ausente ou não ISO | build falha | FR-013 |

## Contrato de edição (quem mantém o conteúdo)

- Editar conteúdo = alterar arquivo em `src/content/` ou `src/data/` e publicar; nenhum arquivo de
  código é tocado (FR-025, SC-008).
- Incluir item = criar arquivo Markdown na pasta da collection ou acrescentar entrada no YAML; a
  listagem correspondente passa a exibi-lo automaticamente.
- `docs/fonte/carta-servicos-original.md` é documento de referência somente leitura; alterações de
  conteúdo não são feitas nele.
