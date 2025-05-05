import DadosGerais from "./DadosGerais";

interface TabsProps { 
  tab: number;
  actualComplete: number;
  setActualComplete: (actualComplete: number) => void;
}

export default function Tabs({ tab, actualComplete, setActualComplete }: TabsProps) {
  return ( 
    <form className="mt-7">
      <DadosGerais />
    </form>
   );
}