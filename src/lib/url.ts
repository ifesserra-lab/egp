/**
 * Monta um caminho interno respeitando o `base` de publicação.
 *
 * O site pode ser servido na raiz do domínio ou em um subdiretório (ex.: /egp),
 * conforme a configuração da CTI. Toda rota interna passa por aqui para que o
 * mesmo código funcione nos dois casos.
 */
export function comBase(rota: string): string {
  if (!rota.startsWith('/')) return rota;
  const base = import.meta.env.BASE_URL;
  const prefixo = base.endsWith('/') ? base.slice(0, -1) : base;
  return `${prefixo}${rota}`;
}
