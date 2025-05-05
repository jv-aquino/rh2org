import { cnpjMask } from "@/utils";
import { InputMask } from "@react-input/mask";
import ValidatedInput from '@/components/form/ValidatedInput';
import RequiredTag from "@/components/form/RequiredTag";

function DadosGerais() {
  
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
          ><RequiredTag /></ValidatedInput>
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 w-full">
        <div className="flex flex-col w-full">
          <label className="tabs-label text-lg font-medium" htmlFor="cnpj">CNPJ<RequiredTag /></label>
          <div className="relative inline-block">
            <InputMask mask={cnpjMask} placeholder="12.345.678/0001-70" className="tabs-input text-slate-900 placeholder:text-gray-400" />
          </div>
        </div>

        <ValidatedInput
          title='Site'
          placeholder="https://acme.com.br"
          name="site"
          overrideValidate={(value: string) => value.length > 1}
          containerClassName="w-full"
          labelClassName="tabs-label"
          inputClassName="tabs-input"
          iconContainerClassName="tabs-icon"
        ><span className="optional-label">(opcional)</span></ValidatedInput>
      </div>
      
      <ValidatedInput
          title='Domínio de Email'
          placeholder="acme.com.br"
          name="dominio"
          overrideValidate={(value: string) => value.length > 1}
          labelClassName="tabs-label"
          inputClassName="tabs-input"
          iconContainerClassName="tabs-icon"
          required
        ><RequiredTag /><span className="optional-label">(exemplo@<b>acme.com.br</b>)</span></ValidatedInput>
    </div>
   );
}

export default DadosGerais;