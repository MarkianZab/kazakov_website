import { LoginForm } from "./LoginForm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Admin Login — Kazakov Chess" };

export default function LoginPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <span className="text-4xl">♟</span>
          <h1 className="mt-3 font-serif text-2xl font-semibold text-[var(--foreground)]">
            Admin Login
          </h1>
          <p className="mt-1 text-sm text-[var(--foreground-muted)]">
            Kazakov Chess Dashboard
          </p>
        </div>
        <div className="rounded-md border border-[var(--border)] bg-[var(--surface)] p-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
