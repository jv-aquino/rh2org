'use client';
import clsx from 'clsx';
import { signIn } from 'next-auth/react';
import { useSearchParams } from "next/navigation";
import { isSafeRedirect } from "@/utils";
import { useState } from 'react';
import ValidatedInput from '@/components/form/ValidatedInput';

function EmailLoginButton() {
  const [email, setEmail] = useState<string>("");
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') ?? "/";
  const safeCallbackUrl = isSafeRedirect(callbackUrl) ? callbackUrl : "/";

  return ( 
    <form onSubmit={async (e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());
      await signIn("resend", data, { callbackUrl: safeCallbackUrl });
    }} className="w-full flex-1">
        <input type="hidden" name="type" value="email" />

        <ValidatedInput
          title="E-mail"
          placeholder="joao@acme.com.br"
          name="email"
          type="email"
          value={email}
          setValue={setEmail}
          containerClassName='mb-8'
          inputClassName='w-[91%] pt-[5px] pb-1.5 text-lg border-b-[3px] border-green-700'
          labelClassName='text-lg sm:text-[22px] font-bold'
        />
        
        <div className="w-full flex-1">
          <button type="submit" className={clsx('login-button tracking-4 email', 'text-green-700')}>
            Entrar com email
          </button>
        </div>
      </form>
   );
}

export default EmailLoginButton;