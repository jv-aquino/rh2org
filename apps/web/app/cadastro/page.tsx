'use client';
import { useState } from "react";
import TabsSteps from "./tabssteps";
import { ArrowLeft, ArrowRight } from "lucide-react";

function CadastroPage() {
  const [tab, setTab] = useState(1);
  const [actualComplete, setActualComplete] = useState(0);

  return ( 
    <>
      <TabsSteps tab={tab} />

      <div className="mt-4 flex justify-between items-center">
        <button type="button" disabled={tab === 1}  className={`opacityTransition ${tab === 1 ? '' : 'open'}`}
        onClick={() => setTab((prev) => Math.max(prev - 1, 1))}>
          <ArrowLeft className="text-gray-400" />
        </button>

        <button type="button" disabled={tab === 3 || tab > actualComplete} className={`px-3 py-1.5 textBgTransition border rounded-lg 
        flex gap-1.5 items-center justify-center text-lg 
        ${tab <= actualComplete ? 'text-green-700 hover:text-green-800 hover:bg-green-500' : 'text-gray-400 border-transparent'}`}
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