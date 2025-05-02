import LoginButton from "@/components/auth/LoginButton";

export default function Home() {
  return (
    <div className="p-8 w-100 flex flex-col gap-4">
      <LoginButton type="Email" />
      <LoginButton type="Google" />
      <LoginButton type="Slack" />
    </div>
  );
}
