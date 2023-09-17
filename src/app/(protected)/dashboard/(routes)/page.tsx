import { getCurrentUser } from "@/lib/session";
import React from "react";
import { redirect } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <>
      <div className="flex items-center justify-between px-2">
        <div className="grid gap-1">
          <h1 className="font-semibold text-3xl md:text-4xl">Job Posts</h1>
          <p className="text-lg text-muted-foreground">
            Create and manage your job posts
          </p>
        </div>
        <Link href="/post/new" className={cn(buttonVariants({}))}>
          <Icons.add className="w-3 h-3 mr-2" /> New Post
        </Link>
      </div>
    </>
  );
}
