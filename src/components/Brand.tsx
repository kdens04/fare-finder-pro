import { Link } from "@tanstack/react-router";
import { Plane } from "lucide-react";

export function Brand() {
  return (
    <Link to="/" className="flex items-center gap-3 text-foreground" aria-label="Flight Price Notifier home">
      <span className="grid size-9 place-items-center rounded-md bg-primary text-primary-foreground shadow-glow">
        <Plane className="size-4 -rotate-12" aria-hidden="true" />
      </span>
      <span className="hidden text-sm font-semibold sm:inline">Flight Price Notifier</span>
    </Link>
  );
}