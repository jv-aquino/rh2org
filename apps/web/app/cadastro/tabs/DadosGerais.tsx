import { cnpjMask } from "@/utils";
import { InputMask } from "@react-input/mask";
import ValidatedInput from '@/components/form/ValidatedInput';

function DadosGerais() {
  
  return ( 
    <div className="flex flex-col gap-4 w-full">
      <InputMask mask={cnpjMask} placeholder="12.345.678/0001-70" />
      <ValidatedInput 
        title='Razão Social' 
        placeholder="ACME LTDA" 
        name="razaoSocial" 
        overrideValidate={(value: string) => value.length > 1}
        labelClassName="tabs-label"
        inputClassName="tabs-input"
        iconContainerClassName="tabs-icon"
      />
    </div>
   );
}

export default DadosGerais;