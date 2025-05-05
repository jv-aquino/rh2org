import DadosGerais from "./DadosGerais";

interface TabsProps { 
  tab: number;
  actualComplete: number;
  setActualComplete: (actualComplete: number) => void;
}

export default function Tabs({ tab, setActualComplete }: TabsProps) {
  const handleAllValid = (valid: boolean, complete: number) => {
    if (valid) {
      setActualComplete(complete);
    } else {
      setActualComplete(complete - 1);
    }
  }

  return ( 
    <form className="mt-7">
      <DadosGerais setAllValid={(valid: boolean) => {
        handleAllValid(valid, 1);
      }} />
    </form>
   );
}