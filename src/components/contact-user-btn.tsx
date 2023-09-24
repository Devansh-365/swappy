"use client";

import React, { useEffect, useState } from "react";
import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import axios from "axios";
import Link from "next/link";

export default function ContactUserBtn({ userId }: { userId: string }) {
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const response = await axios.post(`/api/user`, {
          userId: userId,
        });
        setEmail(response.data.email);
      } catch (error) {
        console.error("Error fetching user email:", error);
      }
    };

    fetchUserEmail();
  }, [userId]);

  return (
    <Link
      className={buttonVariants({
        size: "sm",
        className: "cursor-hover",
      })}
      target="_blank"
      href={`mailto:${email ? email : ""}`}
    >
      <Icons.link className="w-3 h-3 mr-2" /> Contact User
    </Link>
  );
}
