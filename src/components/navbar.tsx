import Link from "next/link";

import { buttonVariants } from "./ui/button";
import React from "react";
import Image from "next/image";

export default async function Navbar() {
  return (
    <header className="fixed top-0 left-0 z-10 w-full backdrop-blur-[12px]">
      <div className="max-w-[120rem] px-8 text-center h-12 flex">
        <Link className="flex items-center text-md" href="/">
          <Image src="/logo.svg" width={16} height={16} alt="logo" />
        </Link>
        <div className="ml-auto flex h-full items-center space-x-3">
          {true ? (
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
            <Link
              className={buttonVariants({
                size: "sm",
                className: "rounded-full",
              })}
              href="/dashboard"
            >
              Go to Dashboard
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
