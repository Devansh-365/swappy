import JobList from "@/components/job-list";
import { UserAvatar } from "@/components/user-avatar";
import db from "@/lib/db";
import {
  createCheckoutLink,
  createCustomerIfNull,
  hasSubscription,
} from "@/lib/subscription";
import { Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const countries = [
  "asia",
  "europe",
  "latin america",
  "north america",
  "oceanina",
  "africa",
  "middle east",
];

const roles = [
  {
    value: "front-end developer",
    label: "Front-end developer",
    country: "Paris",
  },
  {
    value: "back-end developer",
    label: "Back-end developer",
    country: "Paris",
  },
  {
    value: "fullstack developer",
    label: "Fullstack developer",
    country: "Paris",
  },
  {
    value: "ios developer",
    label: "IOS developer",
    country: "Paris",
  },
  {
    value: "blockchain developer",
    label: "Blockchain developer",
    country: "Paris",
  },
  {
    value: "ux designer",
    label: "UX designer",
    country: "Paris",
  },
  {
    value: "product owner",
    label: "Product Owner",
    country: "Paris",
  },
  {
    value: "product manager",
    label: "Product Manager",
    country: "Paris",
  },
  {
    value: "scrum master",
    label: "Scrum Master",
    country: "Paris",
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

export default async function Home() {
  const jobPosts = await db.job.findMany({
    include: {
      skills: true,
    },
  });

  const customer = await createCustomerIfNull();
  const hasSub = await hasSubscription();
  const checkoutLink = await createCheckoutLink(String(customer));

  return (
    <>
      <section className="relative w-screen h-[660px] lg:h-[562px]">
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
          <h1 className="my-6 text-3xl text-gray-50 dark:text-gray-50 md:text-5xl font-bold">
            Would you consider changing your job? Find someone to swap with you!
          </h1>
          <p className="mx-auto mb-12 max-w-2xl font-semibold leading-6 text-md md:text-xl text-gray-200 dark:text-gray-200">
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
        <JobList jobs={jobPosts} />
      </section>
    </>
  );
}
