import { signIn } from "@/auth";
import clsx from "clsx";
import Image from "next/image";

function LoginButton({ type }: { type: 'Email' | 'Google' | 'Slack' }) {
  const lowerCaseType = type.toLowerCase();

  return (
      <form
        className="w-full flex-1"
        action={async () => {
          "use server"
          if (lowerCaseType === 'email') {
            await signIn();
          } else {
            await signIn(lowerCaseType);
          }
        }}
      >
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