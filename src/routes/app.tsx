import { useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { BellRing, LogOut, Plane, Route as RouteIcon } from "lucide-react";

import { Brand } from "@/components/Brand";
import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/app")({
  head: () => ({
    meta: [
      { title: "Dashboard — Flight Price Notifier" },
      { name: "description", content: "Your Flight Price Notifier dashboard." },
      { property: "og:title", content: "Dashboard — Flight Price Notifier" },
      { property: "og:description", content: "Manage future route tracking and fare alerts." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AppDashboard,
});

function AppDashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) void navigate({ to: "/auth", replace: true });
  }, [loading, navigate, user]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    await navigate({ to: "/auth", replace: true });
  }

  if (loading || !user) {
    return <div className="grid min-h-screen place-items-center bg-background text-sm text-muted-foreground">Loading…</div>;
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/90">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Brand />
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut aria-hidden="true" /> Sign Out
          </Button>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="text-sm font-medium text-primary">Your dashboard</p>
        <h1 className="mt-3 break-words font-display text-3xl font-semibold text-foreground sm:text-5xl">
          Hi {user.email}
        </h1>

        <div className="mt-12 grid overflow-hidden rounded-lg border border-border bg-card lg:grid-cols-[1.25fr_0.75fr]">
          <div className="p-7 sm:p-12">
            <span className="grid size-12 place-items-center rounded-md bg-primary/15 text-primary">
              <BellRing aria-hidden="true" />
            </span>
            <h2 className="mt-8 max-w-2xl font-display text-2xl font-semibold leading-snug text-card-foreground sm:text-3xl">
              你的航線追蹤儀表板即將上線 — 下一個里程碑會加上訂閱航線的功能。
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
              Your dashboard is coming soon. Route-subscription will be added in the next milestone.
            </p>
          </div>
          <div className="dashboard-panel relative min-h-72 border-t border-border lg:border-l lg:border-t-0">
            <div className="absolute inset-0 grid place-items-center">
              <div className="relative grid size-40 place-items-center rounded-full border border-primary/30">
                <div className="absolute size-28 rounded-full border border-primary/20" />
                <Plane className="size-10 -rotate-12 text-primary" aria-hidden="true" />
                <RouteIcon className="absolute -right-3 top-8 size-5 text-muted-foreground" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}