import { getCurrentUser } from "@/lib/session";
// import { redirect } from "next/navigation";
// import { stripe } from "@/lib/stripe";
// import {
//   createCheckoutLink,
//   createCustomerIfNull,
//   hasSubscription,
// } from "@/lib/subscription";
import React from "react";
import axios from "axios";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

type Props = {};

export default async function DashboardPage({}: Props) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  // const customer = await createCustomerIfNull();
  // const hasSub = await hasSubscription();
  // const checkoutLink = await createCheckoutLink(String(customer));

  return (
    <>
      <div className="flex items-center justify-between px-2">
        <div className="grid gap-1">
          <h1 className="font-semibold text-3xl md:text-4xl">Job Posts</h1>
          <p className="text-lg text-muted-foreground">Create and manage your job posts</p>
        </div>
        <Button><Icons.add className="w-3 h-3 mr-2" /> New Post</Button>
      </div>
    </>
  );
}
