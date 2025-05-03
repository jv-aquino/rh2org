import { handleLogin } from "@/auth";
import clsx from "clsx";
import Image from "next/image";

function LoginButton({ type, className }: { type: 'Email' | 'Google' | 'Slack', className?: string }) { 
  const lowerCaseType = type.toLowerCase();

  return (
      <form
        className={clsx("w-full flex-1", className)}
        action={handleLogin}
      >
        <input type="hidden" name="type" value={lowerCaseType} />

        <button type="submit" className={clsx('login-button tracking-4', lowerCaseType, lowerCaseType === 'email' && 'text-green-700')}>
          {type !== 'Email' && (
            <Image
              src={`/icons/${lowerCaseType}logo.png`}
              alt={`${type} logo`}
              width={24}
              height={24}
            />
          )}

          Entrar com {type}
        </button>
      </form>
   );
}

export default LoginButton;