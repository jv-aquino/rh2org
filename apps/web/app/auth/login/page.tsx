import RHLogo from "@/components/common/RHLogo";
import LoginForm from "./LoginForm";
import Image from "next/image";

function Login() {
  return ( 
    <main className="h-screen overflow-y-hidden flex items-center justify-center lg:justify-between relative">
      <img src="/greenellipse.png" alt="" className="absolute left-0 -top-20 hidden lg:block w-[53%] h-[135vh]" />
      
      <RHLogo className="absolute top-4 left-4 text-[22px] lg:hidden" imgClassName="mx-1" />

      <div className="font-sansation text-green-300 hidden
      lg:flex flex-col items-center justify-center z-10 w-[55%] h-full"> 
        <h1 className="text-7xl text-center font-bold text-green-800 
        flex items-center justify-between">
          R<span className="text-lightBlue">H</span>
          <Image src={'/icons/gota.png'} alt="" width={41} height={72} className="mx-2"  />
          <span className="text-lightBlue">O</span>rgânico
        </h1>
          
        <p className="text-xl text-center pt-8 leading-[26px]">Gestão de RH, cultura organizacional<br /> e desenvolvimento de pessoas</p>
      </div>

      <div className="font-sansation flex flex-col items-center justify-center z-10 px-5 w-full sm:w-xl g:w-[45%] h-full">
        <h2 className="font-bold text-center text-4xl lg:text-[40px] lg:leading-12 mb-10">Entrar na plataforma</h2>

        <LoginForm />
      </div>
    </main>
   );
}

export default Login;
