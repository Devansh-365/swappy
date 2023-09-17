"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export function DashboardNav() {
  const path = usePathname();

  return (
    <nav className="grid items-start gap-2">
      <Link href="/dashboard">
        <span
          className={cn(
            "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
            path === "/dashboard" ? "bg-accent" : "transparent"
          )}
        >
          <span>Dashboard</span>
        </span>
      </Link>
      <Link href="/dashboard/billing">
        <span
          className={cn(
            "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
            path === "/dashboard/billing" ? "bg-accent" : "transparent"
          )}
        >
          <span>Billing</span>
        </span>
      </Link>
      <Link href="/dashboard/settings">
        <span
          className={cn(
            "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
            path === "/dashboard/settings" ? "bg-accent" : "transparent"
          )}
        >
          <span>Settings</span>
        </span>
      </Link>
    </nav>
  );
}
