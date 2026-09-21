// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

/**
 * Endereço definitivo ainda não confirmado pela CTI (ver research.md, decisão D10).
 * Preencher SITE_URL e SITE_BASE quando o domínio institucional existir; nenhum outro
 * arquivo precisa ser alterado.
 */
const site = process.env.SITE_URL ?? 'https://exemplo-pendente.ifes.edu.br';
const base = process.env.SITE_BASE ?? '/';

export default defineConfig({
  site,
  base,
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [mdx(), sitemap()],
  build: { format: 'directory' },
});
