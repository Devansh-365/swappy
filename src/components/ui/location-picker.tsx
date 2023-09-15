"use client";

import * as React from "react";
import { CheckIcon, MapPin } from "lucide-react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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

const regions = [
  {
    value: "asia",
    label: "Asia",
  },
  {
    value: "europe",
    label: "Europe",
  },
  {
    value: "latin america",
    label: "Latin America",
  },
  {
    value: "north america",
    label: "North America",
  },
  {
    value: "oceanina",
    label: "Oceanina",
  },
  {
    value: "africa",
    label: "Africa",
  },
  {
    value: "middle east",
    label: "Middle East",
  },
];

export function LocationPicker() {
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
          <MapPin className="mr-0 lg:mr-2 h-4 w-4" />
          {date ? (
            format(date, "PPP")
          ) : (
            <span className="hidden lg:flex px-2 flex-col items-start">
              <h6 className="font-bold">Location</h6>
              <p className="text-sm">Where do you want to go?</p>
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Command>
          <CommandInput placeholder="Search region..." className="h-9" />
          <CommandEmpty>No region found.</CommandEmpty>
          <CommandGroup>
            {regions.map((region) => (
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
