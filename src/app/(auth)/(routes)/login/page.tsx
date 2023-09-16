import AuthForm from "@/components/forms/login-form";
import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

import Link from "next/link";
import React from "react";

export default function LoginPage() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 top-4 md:left-8 md:top-8"
        )}
      >
        <>
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          Back
        </>
      </Link>
      <div className="relative z-10 my-auto h-fit w-full max-w-sm overflow-hidden">
        <div className="flex flex-col items-center justify-center space-y-3 px-4 py-2 pt-8 text-center sm:px-16">
          <Image src="/logo.svg" alt="logo" width={24} height={24} />
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50">
            Sign in to Swappy
          </h3>
          <p className="text-sm font-medium text-gray-500">
            {`Welcome to Swappy, the platform for IT talents, whether you're a
          freelancer or an employee!`}
          </p>
        </div>
        <div className="flex flex-col space-y-3 px-4 py-6 sm:px-16">
          <AuthForm />

          <p className="text-center text-sm underline text-gray-500">
            {`Don't have an account?`}{" "}
            <Link
              href="/register"
              className="font-semibold text-gray-500 transition-colors hover:text-black"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
