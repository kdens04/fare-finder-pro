import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, LoaderCircle, LockKeyhole, Mail } from "lucide-react";

import { Brand } from "@/components/Brand";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";

type AuthMode = "sign-in" | "sign-up";

export function AuthForm({ mode }: { mode: AuthMode }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const isSignUp = mode === "sign-up";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    const result = isSignUp
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });

    setSubmitting(false);
    if (result.error) {
      setError(result.error.message);
      return;
    }
    await navigate({ to: "/app", replace: true });
  }

  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-background">
      <div className="absolute inset-0 auth-grid opacity-40" aria-hidden="true" />
      <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-6 sm:px-8">
        <Brand />
        <Link
          to={isSignUp ? "/auth" : "/sign-up"}
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          {isSignUp ? "已有帳號？登入" : "還沒有帳號？註冊"}
        </Link>
      </header>

      <section className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 items-center px-5 pb-16 sm:px-8 lg:grid-cols-[1fr_30rem] lg:gap-20">
        <div className="hidden lg:block">
          <p className="mb-6 text-xs font-semibold uppercase text-primary tracking-widest">Flight alerts, simplified</p>
          <h1 className="max-w-xl font-display text-5xl font-semibold leading-tight text-foreground">
            好價格出現時，<br />我們會通知你。
          </h1>
          <p className="mt-6 max-w-md text-base leading-7 text-muted-foreground">
            不必每天搜尋機票。設定預算，讓 Flight Price Notifier 替你持續留意。
          </p>
        </div>

        <div className="mx-auto w-full max-w-md animate-rise rounded-lg border border-border bg-card p-6 shadow-panel sm:p-8">
          <div className="mb-8">
            <p className="text-sm font-medium text-primary">{isSignUp ? "Create account" : "Welcome back"}</p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-card-foreground">
              {isSignUp ? "建立你的帳號" : "登入 Flight Price Notifier"}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {isSignUp ? "註冊後即可進入航線追蹤儀表板。" : "使用你的 email 和密碼繼續。"}
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <label className="block space-y-2 text-sm font-medium text-foreground">
              Email
              <span className="relative block">
                <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                <Input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="h-11 pl-10"
                />
              </span>
            </label>
            <label className="block space-y-2 text-sm font-medium text-foreground">
              密碼 / Password
              <span className="relative block">
                <LockKeyhole className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                <Input
                  type="password"
                  required
                  minLength={6}
                  autoComplete={isSignUp ? "new-password" : "current-password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="至少 6 個字元"
                  className="h-11 pl-10"
                />
              </span>
            </label>

            {error ? <p className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p> : null}

            <Button type="submit" size="lg" className="w-full" disabled={submitting}>
              {submitting ? <LoaderCircle className="animate-spin" /> : null}
              {isSignUp ? "Sign up / 註冊" : "Sign in / 登入"}
              {!submitting ? <ArrowRight aria-hidden="true" /> : null}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {isSignUp ? "已經有帳號？" : "第一次使用？"}{" "}
            <Link to={isSignUp ? "/auth" : "/sign-up"} className="font-medium text-primary hover:underline">
              {isSignUp ? "登入" : "免費註冊"}
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}