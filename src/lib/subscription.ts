import { getServerSession } from "next-auth";
import Stripe from "stripe";

import { PrismaClient } from "@prisma/client";
import { authOptions } from "./auth";
const prisma = new PrismaClient();

export const stripe = new Stripe(String(process.env.STRIPE_SECRET), {
  apiVersion: "2023-08-16",
});

export async function hasSubscription() {
  const session = await getServerSession(authOptions);

  if (session) {
    const user = await prisma.user.findFirst({
      where: { email: String(session.user?.email) },
    });

    const subscriptions = await stripe.subscriptions.list({
      customer: String(user?.stripeCustomerId),
    });

    return subscriptions.data.length > 0;
  }

  return false;
}

export async function createCheckoutLink(customer: string) {
  const checkout = await stripe.checkout.sessions.create({
    success_url: `http://localhost:3000/dashboard/billing?success=true`,
    cancel_url: "http://localhost:3000/dashboard/billing?success=true",
    customer: customer,
    line_items: [
      {
        price: "price_1NrGyhDpyNfKyzDyDxxFVfjA",
        quantity: 1,
      },
    ],
    mode: "payment",
  });

  return checkout.url;
}

export async function createCustomerIfNull() {
  const session = await getServerSession(authOptions);

  if (session) {
    const user = await prisma.user.findFirst({
      where: { email: String(session.user?.email) },
    });

    if (!user?.stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: String(user?.email),
      });

      await prisma.user.update({
        where: {
          id: user?.id,
        },
        data: {
          stripeCustomerId: customer.id,
        },
      });
    }
    const user2 = await prisma.user.findFirst({
      where: { email: String(session.user?.email) },
    });
    return user2?.stripeCustomerId;
  }
}
