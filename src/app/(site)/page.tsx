import { Button } from "@/components/ui/button";
import { DatePickerDemo } from "@/components/ui/date-picker";
import { LocationPicker } from "@/components/ui/location-picker";
import { PricePicker } from "@/components/ui/price-picker";
import { UserAvatar } from "@/components/user-avatar";
import { Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const countries = [
  "asia",
  "europe",
  "latin america",
  "north america",
  "oceanina",
  "oceanina",
  "africa",
  "middle east",
];

const roles = [
  {
    value: "front-end developer",
    label: "Front-end developer",
  },
  {
    value: "back-end developer",
    label: "Back-end developer",
  },
  {
    value: "fullstack developer",
    label: "Fullstack developer",
  },
  {
    value: "ios developer",
    label: "IOS developer",
  },
  {
    value: "blockchain developer",
    label: "Blockchain developer",
  },
  {
    value: "ux designer",
    label: "UX designer",
  },
  {
    value: "product owner",
    label: "Product Owner",
  },
  {
    value: "product manager",
    label: "Product Manager",
  },
  {
    value: "scrum master",
    label: "Scrum Master",
  },
];

const users = [
  {
    name: "John Doe",
    image: "https://randomuser.me/api/portraits/lego/3.jpg",
  },
  {
    name: "Jane Smith",
    image: "https://randomuser.me/api/portraits/lego/2.jpg",
  },
  {
    name: "Bob Johnson",
    image: "https://randomuser.me/api/portraits/lego/7.jpg",
  },
  {
    name: "Alice Williams",
    image: "https://randomuser.me/api/portraits/lego/4.jpg",
  },
  {
    name: "Charlie Brown",
    image: "https://randomuser.me/api/portraits/lego/0.jpg",
  },
];

export default function Home() {
  return (
    <>
      <section className="relative w-screen h-[562px]">
        <div className="-z-10">
          <Image
            priority
            src="/herobg.png"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            alt="hero image"
          />
        </div>
        <div className="mx-auto max-w-[120rem] px-8 text-center pt-24 relative">
          <h1 className="my-6 text-4xl text-gray-50 dark:text-gray-50 md:text-6xl font-bold">
            Exchange your position
          </h1>
          <p className="mx-auto mb-12 max-w-2xl font-semibold leading-6 text-lg md:text-xl text-gray-200 dark:text-gray-200">
            {`Welcome to Swappy, the platform for IT talents, whether you're a freelancer or an employee!`}{" "}
          </p>
          <div className="mx-auto text-center group w-full flex justify-center items-center">
            {users.map((user, i) => (
              <UserAvatar
                key={i}
                user={user}
                className="-ml-3 relative hover:ml-1 ease-in-out transition-all delay-100"
              />
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-[120rem] px-8 -mt-12 lg:-mt-4">
        <div className="w-full flex flex-wrap justify-center max-w-6xl lg:justify-between items-center gap-2 mx-auto">
          {countries.map((c, i) => (
            <button
              className="border border-dotted flex text-sm items-center py-1 md:py-2 px-3 lg:px-5 capitalize rounded-full border-gray-400 hover:bg-gray-100 ease-in-out transition-all"
              key={i}
            >
              <Globe className="w-3 h-3 mr-2" />
              {c}
            </button>
          ))}
        </div>
        <div className="mt-8 w-fit bg-[#EAF2F6] flex justify-center items-center p-3 mx-auto rounded-full gap-2 lg:gap-6">
          <LocationPicker />
          <DatePickerDemo />
          <PricePicker />
          <Button variant="swappy">Explore Now</Button>
        </div>
        <div className="pt-12 grid grid-cols-1 gap-6 md:gid-cols-3 lg:grid-cols-4 lg:gap-8">
          {roles.map((role, i) => (
            <Link
              href={`#`}
              key={i}
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
                <h2 className="z-20 text-lg font-bold tracking-tight opacity-70 transition-opacity group-hover:opacity-100 md:text-xl">
                  {role.label}
                </h2>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
