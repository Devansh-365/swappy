"use client";

import { useModal } from "@/hooks/use-modal";
import React from "react";
import { Drawer } from "vaul";
import { DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

export default function PopupCard({
  role,
}: {
  role: { label: string; country: string };
}) {
  const { onOpen } = useModal();

  return (
    <Drawer.Root>
      <DrawerTrigger asChild>
        <button
          className="group relative flex w-full transform-gpu flex-col rounded-3xl border-2 border-gray-200 bg-transparent transition-transform hover:-translate-y-0.5"
        >
          <span
            className="relative overflow-hidden rounded-3xl aspect-[240/135] text-center z-10 flex justify-center items-center w-full flex-1 shrink-0 gap-0.5 bg-cover bg-bottom bg-no-repeat p-4 bg-blend-overlay [background-image:var(--post-image)] before:pointer-events-none before:absolute before:inset-0 before:z-10 before:select-none before:rounded-b-[calc(1.5rem-1px)] before:rounded-t-[calc(1.5rem-1px)] before:bg-[--post-image-bg] before:opacity-70 before:transition-opacity after:pointer-events-none after:absolute after:inset-0 after:z-10 after:select-none after:rounded-b-[calc(1.5rem-1px)] after:bg-gradient-to-b after:from-transparent after:to-[--post-image-bg] after:backdrop-blur after:transition-opacity group-hover:underline group-hover:before:opacity-30 md:p-5"
            style={
              {
                "--post-image":
                  "url(https://img.freepik.com/free-vector/blue-pink-halftone-background_53876-99004.jpg?w=2000)",
              } as React.CSSProperties
            }
          >
            <h2 className="z-20 text-lg font-bold tracking-tight opacity-70 transition-opacity group-hover:opacity-100 md:text-lg">
              {role.label} • {role.country} • Remote
            </h2>
          </span>
        </button>
      </DrawerTrigger>
      <DrawerContent className="h-[85%] px-2 pt-10 pb-2">
        <h3>{role.label}</h3>
      </DrawerContent>
    </Drawer.Root>
  );
}
