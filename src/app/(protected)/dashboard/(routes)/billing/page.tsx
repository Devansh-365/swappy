import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import {
  createCheckoutLink,
  createCustomerIfNull,
  hasSubscription,
} from "@/lib/subscription";
import Link from "next/link";

export default async function BillingPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const customer = await createCustomerIfNull();
  const hasSub = await hasSubscription();
  const checkoutLink = await createCheckoutLink(String(customer));

  return (
    <>
      <div className="flex items-center justify-between px-2">
        <div className="grid gap-1">
          <h1 className="font-semibold text-3xl md:text-4xl">Billing</h1>
          <p className="text-lg text-muted-foreground">
            Manage billing and your subscription plan.
          </p>
        </div>
      </div>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Unlock Premium Features</CardTitle>
          <CardDescription>Get access to exclusive benefits</CardDescription>
        </CardHeader>
        <CardContent>
          Join the community of job swappers. Create your job posting and start
          networking with professionals seeking new opportunities.
        </CardContent>
        <CardFooter className="flex flex-col items-start space-y-2 md:flex-row md:justify-between md:space-x-0">
          <Link
            target="_blank"
            href={checkoutLink ? checkoutLink : "/"}
            className={buttonVariants({})}
          >
            {" "}
            Upgrade Now
          </Link>
        </CardFooter>
      </Card>
    </>
  );
}
