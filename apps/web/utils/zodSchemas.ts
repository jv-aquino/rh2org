import { z } from "zod";
import { isValidCEP, isValidCNPJ, isValidDomain } from "./isValid";
import { validateSite } from ".";

export const companySchema = z.object({
  name: z.string().min(1, 'Nome comercial é obrigatório'),
  bairro: z.string().min(1, 'Bairro é obrigatório'),
  cep: z.string().refine(isValidCEP, {
    message: 'CEP inválido',
  }),
  cnpj: z.string().refine(isValidCNPJ, {
    message: 'CNPJ inválido',
  }),
  uf: z.string().length(2, 'UF é obrigatório'),
  razaoSocial: z.string().min(1, 'Razão Social é obrigatório'),
  localidade: z.string().min(1, 'Localidade é obrigatório'),
  logradouro: z.string().min(1, 'Logradouro é obrigatório'),
  emailDomains: z.array(
    z.string()
      .max(255, 'O domínio deve ter no máximo 255 caracteres')
      .refine(isValidDomain, 'Invalid domain format')
  ).length(1, 'Um email por empresa é obrigatório'),
  site: z.string().refine(validateSite, { message: 'Formato inválido de site' }).optional(),
});
