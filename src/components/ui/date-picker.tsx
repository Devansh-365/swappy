"use client";

import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePickerDemo() {
  const [date, setDate] = React.useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild className="border-none">
        <Button
          variant={"outline"}
          className={cn(
            "justify-start text-left font-normal border-none",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-0 lg:mr-2 h-4 w-4" />
          {date ? (
            format(date, "PPP")
          ) : (
            <span className="hidden lg:flex px-2 flex-col items-start">
              <h6 className="font-bold">Date</h6>
              <p className="text-sm">Choose a date</p>
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
