import { Icons } from "@/components/icons";
import { UserNameForm } from "@/components/user-name-form";
import { authOptions } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import React from "react";

export default async function SettingsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  return (
    <>
      <div className="flex flex-col px-2">
        <div className="grid gap-1">
          <h1 className="font-semibold text-3xl md:text-4xl">Settings</h1>
          <p className="text-lg text-muted-foreground">
            Manage account and website settings.
          </p>
        </div>
        <div className="grid gap-10 mt-8">
          <UserNameForm user={{ id: user.id, name: user.name || "" }} />
        </div>
      </div>
    </>
  );
}
