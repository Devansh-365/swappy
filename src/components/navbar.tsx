import Link from "next/link";

import { buttonVariants } from "./ui/button";
import React from "react";
import Image from "next/image";
import { UserAccountNav } from "./user-account-nav";
import { getCurrentUser } from "@/lib/session";
import db from "@/lib/db";

export default async function Navbar() {
  const user = await getCurrentUser();

  console.log("USER: ", user);

  return (
    <header className="fixed top-0 left-0 z-10 w-full backdrop-blur-[12px]">
      <div className="max-w-[120rem] px-8 text-center h-12 flex">
        <Link className="flex items-center text-md" href="/">
          <Image src="/logo.svg" width={16} height={16} alt="logo" />
        </Link>
        <div className="ml-auto flex h-full items-center space-x-3">
          {!user ? (
            <React.Fragment>
              <Link
                className={buttonVariants({
                  size: "sm",
                  variant: "swappy",
                  className: "rounded-full mr-2 lg:mr-4 bg-[#F03D4E]",
                })}
                href="/login"
              >
                Join to Swappy
              </Link>
              {/* <Link
                className={buttonVariants({
                  size: "sm",
                  className: "rounded-full",
                })}
                href="/register"
              >
                Sign up
              </Link> */}
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Link
                className={buttonVariants({
                  size: "sm",
                  variant: "swappy",
                  className: "rounded-full mr-2 bg-[#F03D4E]",
                })}
                href="/dashboard"
              >
                Post Job
              </Link>
              <UserAccountNav
                user={{
                  name: user?.name,
                  image: user?.image,
                  email: user?.email,
                }}
              />
            </React.Fragment>
          )}
        </div>
      </div>
    </header>
  );
}
