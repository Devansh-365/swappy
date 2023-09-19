"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
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
import { Country } from "country-state-city";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface FilterProps {
  onFilter: (filters: {
    title: string;
    location: string;
    country: string;
  }) => void;
}

type Filters = {
  title: string;
  location: string;
  country: string;
};

const employmentTypes = [
  { label: "Remote work", value: "remote" },
  { label: "Hybrid Remote Work", value: "hybrid" },
  { label: "On-Site Work", value: "on-site" },
] as const;

const JobFilter: React.FC<FilterProps> = ({ onFilter }) => {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const countries = Country.getAllCountries();

  const [locationValue, setlocationValue] = useState("");
  const [locationOpen, setLocationOpen] = useState(false);

  const [filters, setFilters] = useState({
    title: "",
    location: "",
    country: value,
  });

  const handleChange = (
    name: keyof Filters,
    value: string | undefined | null
  ) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters, [name]: value || "" };
      setFilters(updatedFilters);
      onFilter(updatedFilters); // You can call onFilter directly with the updated filters
      return updatedFilters; // Return the updated filters
    });
  };

  return (
    <div className="mt-8 w-full md:w-fit bg-[#EAF2F6] flex flex-col md:flex-row justify-center items-center p-3 mx-auto rounded-3xl md:rounded-full gap-2 lg:gap-4">
      <Input
        className="bg-white w-full md:min-w-[326px] rounded-full col-span-2 md:col-span-1"
        name="title"
        placeholder="Search job title"
        value={filters.title}
        onChange={(e) => handleChange("title", e.target.value)}
      />
      <div className="flex flex-col md:flex-row gap-2 lg:gap-4 w-full">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild className="bg-white w-full">
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full md:w-[250px] justify-between capitalize"
            >
              {value ? value : "Select countries..."}
              {/* {value
              ? countries.find((framework) => framework.name === value)?.name
              : "Select countries..."} */}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search framework..." />
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup className="overflow-y-scroll max-h-[200px]">
                {countries.map((framework) => (
                  <CommandItem
                    key={framework.name}
                    onSelect={(currentValue) => {
                      handleChange("country", currentValue);
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === framework.name ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {framework.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
        <Popover open={locationOpen} onOpenChange={setLocationOpen}>
          <PopoverTrigger asChild className="bg-white w-full">
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full md:w-[250px] justify-between capitalize"
            >
              {locationValue ? locationValue : "Choose work mode..."}
              {/* {value
              ? countries.find((framework) => framework.name === value)?.name
              : "Select countries..."} */}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search work mode..." />
              <CommandEmpty>No work mode found.</CommandEmpty>
              <CommandGroup className="overflow-y-scroll max-h-[200px]">
                {employmentTypes.map((framework) => (
                  <CommandItem
                    key={framework.value}
                    onSelect={(currentValue) => {
                      handleChange("location", currentValue);
                      setlocationValue(
                        currentValue === value ? "" : currentValue
                      );
                      setLocationOpen(false);
                    }}
                    className="capitalize"
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === framework.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {framework.value}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      {/* <input
        type="text"
        name="country"
        value={filters.country}
        onChange={handleChange}
        placeholder="Filter by country"
      /> */}
    </div>
  );
};

export default JobFilter;
