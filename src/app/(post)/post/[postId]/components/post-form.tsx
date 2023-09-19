"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Icons } from "@/components/icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { CheckIcon, Trash } from "lucide-react";
import Link from "next/link";
import React from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Tag, TagInput } from "@/components/ui/tag-input";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Textarea } from "@/components/ui/textarea";
import { City, Country } from "country-state-city";
import axios from "axios";
import toast from "react-hot-toast";
import { redirect, useRouter } from "next/navigation";
import { Job } from "@prisma/client";

const locations = [
  { label: "Remote work", value: "remote" },
  { label: "Hybrid Remote Work", value: "hybrid" },
  { label: "On-Site Work", value: "on-site" },
] as const;

const employmentTypes = [
  { label: "Freelance", value: "freelance" },
  { label: "Contract Employee", value: "contract" },
  { label: "Permanent Employee", value: "permanent" },
] as const;

const formSchema = z.object({
  title: z.string().min(2, {
    message: "title must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Job description must be at least 10 characters.",
  }),
  companyName: z.string().min(2, {
    message: "Comapany Name be at least 2 characters.",
  }),
  skills: z.array(
    z.object({
      id: z.string(),
      text: z.string(),
    })
  ),
  location: z.string({
    required_error: "Please select a location.",
  }),
  country: z.string({
    required_error: "Please select a country.",
  }),
  city: z.string({
    required_error: "Please select a city.",
  }),
  employmentType: z.string({
    required_error: "Please select a employment type.",
  }),
  opinion: z.string().optional(),
});

export default function PostForm({ initialData }: any) {
  console.log("INTial: ", initialData)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      title: "",
      description: "",
      companyName: "",
      skills: [],
      location: "",
      country: "",
      city: "",
      employmentType: "",
      opinion: "",
    },
  });

  const [tags, setTags] = React.useState<Tag[]>(initialData.skills || []);

  const { getValues, setValue } = form;

  const countries = Country.getAllCountries();
  const [countryCode, setcountryCode] = React.useState("");
  const states = City.getCitiesOfCountry(countryCode);

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post("/api/posts", values);

      form.reset();
      toast.success(toastMessage);
      redirect("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    }
  };

  const title = initialData ? "Edit post" : "Create post";
  const description = initialData ? "Edit a post." : "Add a new post";
  const toastMessage = initialData ? "Post updated." : "Post created.";
  const action = initialData ? "Save changes" : "Create";

  return (
    <>
      <div className="flex items-center justify-between">
        <Link
          href="/dashboard"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute left-4 top-14 md:left-8 md:top-16"
          )}
        >
          <>
            <Icons.chevronLeft className="mr-2 h-4 w-4" />
            Back
          </>
        </Link>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        {initialData && (
          <Button variant="destructive" size="sm">
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full flex flex-col"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title</FormLabel>
                <FormControl>
                  <Input placeholder="Job Title" {...field} />
                </FormControl>
                <FormDescription>Enter your job title.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about your job"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Describe your job.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="Company Name" {...field} />
                </FormControl>
                <FormDescription>Enter your company name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="skills"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start">
                <FormLabel className="text-left">Skills</FormLabel>
                <FormControl>
                  <TagInput
                    {...field}
                    placeholder="Enter a skill"
                    tags={tags}
                    className="min-w-[326px] md:w-[448px]"
                    setTags={(newTags) => {
                      setTags(newTags);
                      setValue("skills", newTags as [Tag, ...Tag[]]);
                    }}
                  />
                </FormControl>
                <FormDescription>Add your skills.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Location</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "justify-between rounded-md",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? locations.find(
                              (location) => location.value === field.value
                            )?.label
                          : "Select location"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="min-w-[326px] md:w-[448px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search location..."
                        className="h-9"
                      />
                      <CommandEmpty>No location found.</CommandEmpty>
                      <CommandGroup>
                        {locations.map((location) => (
                          <CommandItem
                            value={location.label}
                            key={location.value}
                            onSelect={() => {
                              form.setValue("location", location.value);
                            }}
                          >
                            {location.label}
                            <CheckIcon
                              className={cn(
                                "ml-auto h-4 w-4",
                                location.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>Select your location.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Country</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "justify-between rounded-md",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? countries.find((city) => city.name === field.value)
                              ?.name
                          : "Select Country"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="min-w-[326px] md:w-[448px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search country..."
                        className="h-9"
                      />
                      <CommandEmpty>No country found.</CommandEmpty>
                      <CommandGroup className=" overflow-y-scroll max-h-[200px]">
                        {countries.map((location) => (
                          <CommandItem
                            value={location.name}
                            key={location.name}
                            onSelect={() => {
                              setcountryCode(location.isoCode);
                              form.setValue("country", location.name);
                            }}
                          >
                            {location.name}
                            <CheckIcon
                              className={cn(
                                "ml-auto h-4 w-4",
                                location.name === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>Choose your country.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>City</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "justify-between rounded-md",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? states &&
                            states.find((city) => city.name === field.value)
                              ?.name
                          : "Select City"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="min-w-[326px] md:w-[448px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search city..."
                        className="h-9"
                      />
                      <CommandEmpty>No city found.</CommandEmpty>
                      <CommandGroup className=" overflow-y-scroll max-h-[200px]">
                        {states &&
                          states.map((location) => (
                            <CommandItem
                              value={location.name}
                              key={location.name}
                              onSelect={() => {
                                form.setValue("city", location.name);
                              }}
                            >
                              {location.name}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  location.name === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>Select your city.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="employmentType"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Employment Type</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "justify-between rounded-md",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? employmentTypes.find(
                              (employmentType) =>
                                employmentType.value === field.value
                            )?.label
                          : "Select Employment Type"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="min-w-[326px] md:w-[448px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search employment type..."
                        className="h-9"
                      />
                      <CommandEmpty>No employment type.</CommandEmpty>
                      <CommandGroup>
                        {employmentTypes.map((employmentType) => (
                          <CommandItem
                            value={employmentType.label}
                            key={employmentType.value}
                            onSelect={() => {
                              form.setValue(
                                "employmentType",
                                employmentType.value
                              );
                            }}
                          >
                            {employmentType.label}
                            <CheckIcon
                              className={cn(
                                "ml-auto h-4 w-4",
                                employmentType.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>Select your employment type.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="opinion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Share your opinion</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about your job"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Share your opinion about this job (optional).
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-fit ml-auto">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
}
