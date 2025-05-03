'use client';
import { useState } from "react";

import ValidatedInput from "@/components/form/ValidatedInput";
import LoginButton from "@/components/form/LoginButton";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState<boolean | null>(null);
  
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(email));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    validateEmail(e.target.value);
  };

  return ( 
    <div className="w-[420px]">
      <ValidatedInput title="E-mail" placeholder="joao@acme.com.br" name="email" 
        type="email" value={email} onChange={handleEmailChange} isValid={isValidEmail}  
      />
      <LoginButton type="Email" />

      <div className="flex items-center gap-4 py-5">
        <div className="flex-grow h-0.5 bg-gray-300" />
        <p className="text-gray-400 text-lg">ou</p>
        <div className="flex-grow h-0.5 bg-gray-300" />
      </div>
      
      <LoginButton type="Google" />
      <LoginButton type="Slack" className="pt-5" />
    </div>
   );
}

export default LoginForm;