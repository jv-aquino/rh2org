export interface Endereco {
  cep: string;
  uf: string;
  localidade: string;
  bairro: string;
  logradouro: string;
  complemento?: string;
}