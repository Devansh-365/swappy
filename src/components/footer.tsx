import { Facebook, Github, InstagramIcon, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="mt-12 px-8 w-full py-6 flex flex-col items-center justify-center bg-[#1E2833]">
      <Link className="flex items-center text-md" href="/">
        <Image src="/logo.svg" width={20} height={20} alt="logo" />
      </Link>
      <p className="mx-auto mt-4 text-center max-w-md text-xs lg:text-sm text-gray-400">
        {`Welcome to Swappy, the platform for IT talents, whether you're a freelancer or an employee!`}{" "}
      </p>
      <div className="mt-6 flex gap-3 tex-white">
        <Link href="#">
          <Facebook className="w-5 h-5 text-white" />
        </Link>
        <Link href="#">
          <Twitter className="w-5 h-5 text-white" />
        </Link>
        <Link href="#">
          <InstagramIcon className="w-5 h-5 text-white" />
        </Link>
      </div>
    </footer>
  );
}
