import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, BellRing, Eye, Plane, XCircle } from "lucide-react";

import flightHero from "@/assets/flight-hero.jpg";
import { Brand } from "@/components/Brand";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Flight Price Notifier — 機票降價通知" },
      { name: "description", content: "設定航線與目標價，機票降價就通知你。Set a route and target price, and get an email when fares drop." },
      { property: "og:title", content: "Flight Price Notifier — 機票降價通知" },
      { property: "og:description", content: "設定航線與目標價，機票降價就通知你。" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const features = [
    {
      icon: Eye,
      number: "01",
      title: "盯緊熱門航線",
      english: "Always-on route watching",
      copy: "持續監控台北出發的熱門航線（東京、首爾），自動抓最低票價。",
    },
    {
      icon: BellRing,
      number: "02",
      title: "達標自動通知",
      english: "Target-price email alerts",
      copy: "低於你設定的目標價，就寄 email 提醒你，附上立即訂購連結。",
    },
    {
      icon: XCircle,
      number: "03",
      title: "隨時取消",
      english: "Cancel anytime",
      copy: "月訂閱制，不想用隨時停，沒有綁約。",
    },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-background">
      <section className="relative min-h-[82vh] border-b border-border">
        <img src={flightHero} alt="Airplane flying over Taipei at violet dawn" width={1920} height={1080} className="absolute inset-0 size-full object-cover object-center" />
        <div className="hero-overlay absolute inset-0" aria-hidden="true" />

        <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-6 sm:px-8">
          <Brand />
          <Button asChild>
            <Link to="/auth">Sign in / 登入 <ArrowRight aria-hidden="true" /></Link>
          </Button>
        </header>

        <div className="relative z-10 mx-auto flex min-h-[calc(82vh-88px)] max-w-7xl items-center px-5 pb-16 sm:px-8">
          <div className="max-w-3xl animate-rise">
            <div className="mb-7 flex items-center gap-3 text-xs font-semibold uppercase text-primary tracking-widest">
              <span className="h-px w-8 bg-primary" /> From Taipei, for flexible travelers
            </div>
            <h1 className="font-display text-5xl font-semibold leading-none text-foreground sm:text-7xl lg:text-8xl">
              Flight Price<br /><span className="text-primary">Notifier</span>
            </h1>
            <p className="mt-8 max-w-2xl font-display text-2xl font-medium leading-snug text-foreground sm:text-3xl">
              設定航線與目標價，機票降價就通知你
            </p>
            <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              Set a route and a target price — we email you when the fare drops.
            </p>
            <Button asChild size="lg" className="mt-9">
              <Link to="/sign-up">Start watching fares <ArrowRight aria-hidden="true" /></Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-12 max-w-2xl">
            <p className="text-xs font-semibold uppercase text-primary tracking-widest">Built around your budget</p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-foreground sm:text-5xl">把找票的時間，留給旅程。</h2>
          </div>

          <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <article key={feature.number} className="group relative min-h-80 bg-card p-7 transition-colors hover:bg-accent sm:p-9">
                  <div className="flex items-start justify-between">
                    <span className="grid size-11 place-items-center rounded-md bg-primary/15 text-primary"><Icon aria-hidden="true" /></span>
                    <span className="font-display text-sm text-muted-foreground">{feature.number}</span>
                  </div>
                  <h3 className="mt-14 font-display text-2xl font-semibold text-card-foreground">{feature.title}</h3>
                  <p className="mt-2 text-sm font-medium text-primary">{feature.english}</p>
                  <p className="mt-5 text-sm leading-7 text-muted-foreground">{feature.copy}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-background">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© 2026 Flight Price Notifier</p>
          <div className="flex items-center gap-2"><Plane className="size-4 -rotate-12 text-primary" aria-hidden="true" /> Taipei → wherever your budget takes you</div>
        </div>
      </footer>
    </main>
  );
}
