'use client'
import clsx from "clsx";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { isSafeRedirect } from "@/utils";

function LoginButton({ type, className }: { type: 'Google' | 'Slack', className?: string }) { 
  const lowerCaseType = type.toLowerCase();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') ?? "/";
  const safeCallbackUrl = isSafeRedirect(callbackUrl) ? callbackUrl : "/";

  return (
      <form
        className={clsx("w-full flex-1", className)}
        action={() => signIn(lowerCaseType, { callbackUrl: safeCallbackUrl })}
      >
        <input type="hidden" name="type" value={lowerCaseType} />

        <button type="submit" className={clsx('login-button tracking-4', lowerCaseType)}>
            <Image
              src={`/icons/${lowerCaseType}logo.png`}
              alt={`${type} logo`}
              width={24}
              height={24}
            />

          Entrar com {type}
        </button>
      </form>
   );
}

export default LoginButton;