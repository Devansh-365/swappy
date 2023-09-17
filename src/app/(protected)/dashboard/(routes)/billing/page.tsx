import React from "react";

type Props = {};

export default function BillingPage({}: Props) {
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
    </>
  );
}
