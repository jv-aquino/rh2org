export const isValidDomain = (d: unknown): d is string =>
  typeof d === "string" &&
  // must have at least one “.”, no spaces/@, not start/end with “.”
  /^[^@\s.][^@\s]*\.[^@\s.]+$/.test(d);
  
export const isSafeRedirect = (url: string | null) => {
  return typeof url === "string" && /^\/(?!\/)/.test(url);
};

export function isValidCNPJ(cnpj: string) {
  const cleaned = cnpj.replace(/\D/g, '');
  return cleaned.length === 14;
}

export function isValidCEP(cep: string) {
  const cleaned = cep.replace(/\D/g, '');
  return cleaned.length === 8;
}