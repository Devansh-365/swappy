"use client";

import * as React from "react";
import { CheckIcon, DollarSign } from "lucide-react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const priceRanges = [
  {
    value: "range1",
    label: "$0 - $50,000",
  },
  {
    value: "range2",
    label: "$50,001 - $100,000",
  },
  {
    value: "range3",
    label: "$100,001 - $150,000",
  },
  {
    value: "range4",
    label: "$150,001 - $200,000",
  },
  {
    value: "range5",
    label: "$200,001 and above",
  },
];

export function PricePicker() {
  const [date, setDate] = React.useState<Date>();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

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
          <DollarSign className="mr-0 lg:mr-2 h-4 w-4" />
          {date ? (
            format(date, "PPP")
          ) : (
            <span className="hidden lg:flex px-2 flex-col items-start">
              <h6 className="font-bold">Price</h6>
              <p className="text-sm">Choose your budget</p>
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Command>
          <CommandGroup>
            {priceRanges.map((region) => (
              <CommandItem
                key={region.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                {region.label}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === region.value ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
