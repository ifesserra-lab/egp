import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Modelo de conteúdo do site do EGP — Campus Serra.
 *
 * Todo texto institucional vive aqui embaixo, em `src/content/` (Markdown) e `src/data/` (YAML).
 * Nenhum componente `.astro` contém texto institucional (constituição, princípio II).
 * Conteúdo fora do formato faz o build falhar indicando arquivo e campo (FR-026).
 */

const naoVazio = (campo: string) => z.string({ error: `${campo} é obrigatório.` }).trim().min(1, `${campo} não pode ficar vazio.`);

const pilares = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pilares' }),
  schema: z.object({
    nome: naoVazio('nome'),
    ordem: z.number().int().min(1).max(4),
    objetivo: naoVazio('objetivo'),
    atividades: z.array(naoVazio('atividade')).min(1, 'informe ao menos uma atividade.'),
    entregaveis: z.array(naoVazio('entregável')).min(1, 'informe ao menos um entregável.'),
    resumo: naoVazio('resumo').max(160, 'resumo deve ter no máximo 160 caracteres.'),
  }),
});

const fluxos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/fluxos' }),
  schema: z.object({
    nome: naoVazio('nome'),
    numero: z.number().int().min(1).max(4),
    soWhat: naoVazio('soWhat'),
  }),
});

const ecossistema = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/ecossistema' }),
  schema: z.object({
    nome: naoVazio('nome'),
    ordem: z.number().int().min(1),
    papel: naoVazio('papel'),
    relacaoComEgp: naoVazio('relacaoComEgp'),
  }),
});

const paginas = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/paginas' }),
  schema: z.object({
    titulo: naoVazio('titulo'),
    descricao: naoVazio('descricao')
      .min(50, 'descricao deve ter ao menos 50 caracteres (usada em <meta description>).')
      .max(160, 'descricao deve ter no máximo 160 caracteres.'),
    rota: naoVazio('rota').regex(/^[#/]/, 'rota deve começar com "/" ou "#".'),
    manchete: z.string().trim().min(1).optional(),
    chamadaSecao: z.string().trim().min(1).optional(),
    ordemNav: z.number().int().min(1).optional(),
    rotuloNav: z.string().trim().min(1).optional(),
  }),
});

const fronteiras = defineCollection({
  loader: file('src/data/fronteiras.yaml'),
  schema: z.object({
    id: naoVazio('id'),
    ordem: z.number().int().min(1),
    egp: naoVazio('egp'),
    coordenador: naoVazio('coordenador'),
  }),
});

const contatos = defineCollection({
  loader: file('src/data/contatos.yaml'),
  schema: z
    .object({
      id: naoVazio('id'),
      ordem: z.number().int().min(1),
      tipo: z.enum(['email', 'telefone', 'site', 'ferramenta']),
      rotulo: naoVazio('rotulo'),
      situacao: z.enum(['ativo', 'pendente']),
      endereco: z.string().trim().min(1).optional(),
      observacao: z.string().trim().min(1).optional(),
      avisoPendencia: z.string().trim().min(1).optional(),
    })
    // FR-012 / princípio V: nunca publicar endereço que ainda não existe.
    .refine((canal) => (canal.situacao === 'ativo' ? Boolean(canal.endereco) : !canal.endereco), {
      message: 'Canal "ativo" exige "endereco"; canal "pendente" não pode ter "endereco" (FR-012).',
      path: ['endereco'],
    })
    .refine((canal) => (canal.situacao === 'pendente' ? Boolean(canal.avisoPendencia) : true), {
      message: 'Canal "pendente" exige "avisoPendencia" explicando a indisponibilidade (FR-012).',
      path: ['avisoPendencia'],
    }),
});

const institucional = defineCollection({
  loader: file('src/data/institucional.yaml'),
  schema: z.object({
    nomeUnidade: naoVazio('nomeUnidade'),
    nomeCurto: naoVazio('nomeCurto'),
    campus: naoVazio('campus'),
    vinculo: naoVazio('vinculo'),
    missao: naoVazio('missao'),
    identidades: z.array(naoVazio('identidade')).min(1),
    regraDeOuro: naoVazio('regraDeOuro'),
    ctaNav: naoVazio('ctaNav'),
    chamadaTitulo: naoVazio('chamadaTitulo'),
    chamadaTexto: naoVazio('chamadaTexto'),
    atualizadoEm: z.coerce.date({ error: 'atualizadoEm deve ser uma data ISO (AAAA-MM-DD).' }),
  }),
});

export const collections = {
  pilares,
  fluxos,
  ecossistema,
  paginas,
  fronteiras,
  contatos,
  institucional,
};
