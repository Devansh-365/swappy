import RegisterForm from "@/components/forms/register-form";
import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

import Link from "next/link";
import React from "react";

export default function RegisterPage() {
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
        <div className="flex flex-col items-center justify-center space-y-3 px-4 py-6 pt-8 text-center sm:px-16">
          <Image src="/logo.svg" alt="logo" width={24} height={24} />
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50">
            Create your Swappy account
          </h3>
          <p className="text-sm font-medium text-gray-500">
            {`Welcome to Swappy, the platform for IT talents, whether you're a
          freelancer or an employee!`}
          </p>
        </div>
        <div className="flex flex-col space-y-3 px-4 py-6 sm:px-16">
          <RegisterForm />

          <p className="text-center text-sm text-gray-500">
            {`Already have an account?`}{" "}
            <Link
              href="/login"
              className="font-semibold text-gray-500 transition-colors hover:text-black"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
