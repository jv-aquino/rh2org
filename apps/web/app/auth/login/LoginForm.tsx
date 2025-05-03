import ValidatedInput from '@/components/form/ValidatedInput';
import LoginButton from '@/components/form/LoginButton';

function LoginForm() {
  return (
    <div className="w-full lg:w-[420px]">
      <ValidatedInput
        title="E-mail"
        placeholder="joao@acme.com.br"
        name="email"
        type="email"
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
