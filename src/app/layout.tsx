import { ModalProvider } from "@/components/providers/modal-provider";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import type { Metadata } from "next";
import { Inter, Quicksand } from "next/font/google";
import { NextAuthProvider } from "@/components/providers/auth-provider";

const inter = Inter({ subsets: ["latin"] });
const quicksand = Quicksand({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "swapIswap",
  description: `The platform for IT talents, whether you're a freelancer or an employee!`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={quicksand.className}>
        <NextAuthProvider>
          <Toaster />
          <ModalProvider />
        </NextAuthProvider>
        {children}
      </body>
    </html>
  );
}
