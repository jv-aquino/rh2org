import OAuthLoginButton from '@/components/form/OAuthLoginButton';
import EmailLoginButton from '@/components/form/EmailLoginButton';

function LoginForm() {
  return (
    <div className="w-full lg:w-[420px]">
      <EmailLoginButton />

      <div className="flex items-center gap-4 py-5">
        <div className="flex-grow h-0.5 bg-gray-300" />
        <p className="text-gray-400 text-lg">ou</p>
        <div className="flex-grow h-0.5 bg-gray-300" />
      </div>

      <OAuthLoginButton type="Google" />
      <OAuthLoginButton type="Slack" className="pt-5" />
    </div>
  );
}

export default LoginForm;
