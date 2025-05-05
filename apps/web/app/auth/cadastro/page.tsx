'use client';
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import TabsSteps from "./tabssteps";
import Tabs from "./tabs";

function CadastroPage() {
  const [tab, setTab] = useState(1);
  const [actualComplete, setActualComplete] = useState(0);

  return ( 
    <>
      <div className="px-3 sm:px-6 md:px-0">
        <TabsSteps tab={tab} />
      </div>

      <Tabs tab={tab} actualComplete={actualComplete} setActualComplete={setActualComplete} />

      <div className="mt-6 flex justify-between items-center">
        <button type="button" disabled={tab === 1}  className={`opacityTransition ${tab === 1 ? '' : 'open'}`}
        onClick={() => setTab((prev) => Math.max(prev - 1, 1))}>
          <ArrowLeft className="text-gray-400" />
        </button>

        <button type="button" disabled={tab === 3 || tab > actualComplete} className={`px-3 py-1.5 textBgTransition border rounded-lg 
        flex gap-1.5 items-center justify-center text-lg 
        ${tab <= actualComplete ? 'text-green-200 bg-green-500 hover:text-green-600 hover:bg-green-200' : 'text-gray-400 border-transparent'}`}
          onClick={() => {
            if (tab <= actualComplete) {
              setTab((prev) => Math.min(prev + 1, 3));
            }
          }}>
          Próximo
          <ArrowRight className="relative top-[1px]" />
        </button>
      </div>
    </>
   );
}

export default CadastroPage;