import ValidatedInput from '@/components/form/ValidatedInput';
import clsx from 'clsx';
import { handleLogin } from "@/auth";

function EmailLoginButton() {
  return ( 
    <form action={handleLogin}>
        <input type="hidden" name="type" value="email" />

        <ValidatedInput
          title="E-mail"
          placeholder="joao@acme.com.br"
          name="email"
          type="email"
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