// app/signup/page.tsx
import SignupForm from '@/app/ui/signup';

export default function SignupPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-white">
      <div className="max-w-md w-full p-4">
        <SignupForm />
      </div>
    </main>
  );
}
