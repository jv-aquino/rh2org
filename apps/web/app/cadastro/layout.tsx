import RHLogo from "@/components/common/RHLogo";
import Link from "next/link";

function CadastroLayout({ children }: { children: React.ReactNode }) {
  return ( 
    <main className="w-full h-screen flex items-center justify-center bg-green-100">
      <Link href={'/'} className="absolute top-4 left-4"><RHLogo className="text-xl" imgClassName="mx-0.5" /></Link>
      <div className="w-full rounded-lg shadow-lg bg-green-50 
      lg:w-4xl lg:p-10">
        <h1 className="font-sansation font-bold text-4xl text-center mb-4">Cadastro da Empresa</h1>
        {children}
      </div>
    </main>
   );
}

export default CadastroLayout;