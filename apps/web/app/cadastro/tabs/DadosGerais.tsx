import { useState, useEffect } from "react";
import { cnpjMask, isValidCNPJ, validateEmailDomain, validateSite } from "@/utils";
import { InputMask } from "@react-input/mask";
import ValidatedInput from '@/components/form/ValidatedInput';
import RequiredTag from "@/components/form/RequiredTag";
import { Check, X } from "lucide-react";

interface DadosGeraisProps {
  setAllValid: (valid: boolean) => void;
}

function DadosGerais({ setAllValid }: DadosGeraisProps) {
  const [validName, setValidName] = useState<boolean | null>(null);
  const [validRazaoSocial, setValidRazaoSocial] = useState<boolean | null>(null);
  const [validCnpj, setValidCnpj] = useState<boolean | null>(null);
  const [validDominio, setValidDominio] = useState<boolean | null>(null);
  const [validSite, setValidSite] = useState<boolean | null>(null);

  const [cnpj, setCnpj] = useState<string>('');
  const [site, setSite] = useState('');

  useEffect(() => {
    const isValid =
      validName &&
      validRazaoSocial &&
      validCnpj &&
      (site === '' || validSite) &&
      validDominio;

    setAllValid(!!isValid);
  }, [validName, validRazaoSocial, validCnpj, validSite, site, validDominio, setAllValid]);


  useEffect(() => {
    setValidCnpj(isValidCNPJ(cnpj));
  }, [cnpj]);
  
  useEffect(() => {
    setValidCnpj(null);
  }, []);
  
  return ( 
    <div className="flex flex-col gap-4 w-full">
        <ValidatedInput
          title='Nome Comercial'
          placeholder="Acme Empreendimentos"
          name="name"
          type="text"
          required
          labelClassName="tabs-label"
          inputClassName="tabs-input"
          iconContainerClassName="tabs-icon"

          isValid={validName}
          onValidChange={setValidName}
        ><RequiredTag /></ValidatedInput>

        <ValidatedInput
          title='Razão Social'
          placeholder="ACME LTDA"
          name="razaoSocial"
          required
          overrideValidate={(value: string) => value.length > 1}
          labelClassName="tabs-label"
          inputClassName="tabs-input"
          iconContainerClassName="tabs-icon"

          isValid={validRazaoSocial}
          onValidChange={setValidRazaoSocial}
          ><RequiredTag /></ValidatedInput>
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 w-full">
        <div className="flex flex-col w-full">
          <label className="tabs-label text-lg font-medium" htmlFor="cnpj">CNPJ<RequiredTag /></label>
          <div className="relative inline-block">
            <InputMask 
            mask={cnpjMask} 
            replacement={{ _: /\d/ }}
            value={cnpj}
            onChange={(e) => setCnpj(e.target.value)}
            placeholder="12.345.678/0001-70" 
            required
            className="tabs-input text-slate-900 placeholder:text-gray-400 outline-none" 
          />
            {validCnpj !== null && (
              <span className="absolute right-0 top-1/2 -translate-y-1/2 pr-3">
                {validCnpj ? (
                  <Check className="text-green-500 font-bold" />
                ) : (
                  <X className="text-red-500 font-bold" />
                )}
              </span>
            )}
          </div>
        </div>

        <ValidatedInput
          title='Site'
          placeholder="https://acme.com.br"
          name="site"
          containerClassName="w-full"
          labelClassName="tabs-label"
          inputClassName="tabs-input"
          iconContainerClassName="tabs-icon"
          
          overrideValidate={validateSite}
          value={site}
          setValue={setSite}
          isValid={validSite}
          onValidChange={setValidSite}
        ><span className="optional-label">(opcional)</span></ValidatedInput>
      </div>
      
      <ValidatedInput
          title='Domínio de Email'
          placeholder="acme.com.br"
          name="dominio"
          required
          labelClassName="tabs-label"
          inputClassName="tabs-input"
          iconContainerClassName="tabs-icon"
          
          overrideValidate={validateEmailDomain}
          isValid={validDominio}
          onValidChange={setValidDominio}
        ><RequiredTag /><span className="optional-label">(exemplo@<b>acme.com.br</b>)</span></ValidatedInput>
    </div>
   );
}

export default DadosGerais;