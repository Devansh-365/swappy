"use client";

import React from "react";
import { Drawer } from "vaul";
import { DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

interface PostLayoutProps {
  lowChildren: React.ReactNode;
  upChildren: React.ReactNode;
}

export default function DrawerClient({
  lowChildren,
  upChildren,
}: PostLayoutProps) {
  return (
    <Drawer.Root>
      <DrawerTrigger asChild>{lowChildren}</DrawerTrigger>
      <DrawerContent className="h-[85%] px-2 pt-10 pb-2 overflow-y-scroll scrolling-smooth">
        {upChildren}
      </DrawerContent>
    </Drawer.Root>
  );
}
