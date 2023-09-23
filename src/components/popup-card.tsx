import React from "react";
import { Job, Skill, User } from "@prisma/client";
import { Badge } from "./ui/badge";
import {
  BookOpen,
  Briefcase,
  Building2,
  MapPin,
  Tags,
  User2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import ContactUserBtn from "./contact-user-btn";
import DrawerClient from "./drawer-client";
import { buttonVariants } from "./ui/button";

export default function PopupCard({
  role,
  skills,
  hasSub,
  user,
}: {
  role: Job;
  skills: Skill[];
  hasSub: any;
  user: any;
}) {
  console.log("HAS SUB", hasSub);
  return (
    <DrawerClient
      lowChildren={
        <button className="group relative flex w-full transform-gpu flex-col rounded-3xl border-2 border-gray-200 bg-transparent transition-transform hover:-translate-y-0.5">
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
              {role.title} • {role.city} • Remote
            </h2>
          </span>
        </button>
      }
      upChildren={
        <>
          {hasSub || user.email == "admin2@swappy.com" ? (
            <>
              <div className="relative mx-auto max-w-3xl py-6 lg:py-10 z-[100] overflow-y-scroll">
                <div className="flex items-start justify-between">
                  <h3 className="mt-2 mb-6 inline-block font-bold text-2xl leading-tight lg:text-4xl">
                    {role.title}
                  </h3>
                  <ContactUserBtn userId={role.userId} />
                </div>
                <div className="mb-4">
                  <h5 className="mb-2 flex items-center">
                    <User2 className="w-5 h-5 mr-2 rounded-full text-white p-1 bg-orange-500" />{" "}
                    <span className="font-semibold text-lg">
                      Employement Type{hasSub}
                    </span>
                  </h5>
                  <p className="capitalize">{role.employmentType}</p>
                </div>
                <div className="mb-4">
                  <h5 className="mb-2 flex items-center">
                    <Briefcase className="w-5 h-5 mr-2 rounded-full text-white p-1 bg-purple-500" />{" "}
                    <span className="font-semibold text-lg">Work Mode</span>
                  </h5>
                  <p className="capitalize">{role.location}</p>
                </div>
                <div className="mb-4">
                  <h5 className="mb-2 flex items-center">
                    <MapPin className="w-5 h-5 mr-2 rounded-full text-white p-1 bg-green-500" />{" "}
                    <span className="font-semibold text-lg">Location</span>
                  </h5>
                  <p className="capitalize">
                    {role.country}, {role.city}
                  </p>
                </div>
                <div className="mb-4">
                  <h5 className="mb-2 flex items-center">
                    <BookOpen className="w-5 h-5 mr-2 rounded-full text-white p-1 bg-blue-500" />{" "}
                    <span className="font-semibold text-lg">My post</span>
                  </h5>
                  <p>{role.description}</p>
                </div>
                <div>
                  <h5 className="mb-2 flex items-center">
                    <Tags className="w-5 h-5 mr-2 rounded-full text-white p-1 bg-yellow-500" />{" "}
                    <span className="font-semibold text-lg">Skills</span>
                  </h5>
                  <div className="flex gap-2">
                    {skills.map((skill) => (
                      <Badge
                        variant="secondary"
                        key={skill.id}
                        className="px-2 py-1 capitalize"
                      >
                        {skill.text}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <Card className="mt-8 max-w-xl mx-auto">
              <CardHeader>
                <CardTitle>Wanted to view job post</CardTitle>
                <CardDescription>
                  Get access to exclusive benefits
                </CardDescription>
              </CardHeader>
              <CardContent>
                Join the community of job swappers. Create your job posting and
                start networking with professionals seeking new opportunities.
              </CardContent>
              <CardFooter className="flex flex-col items-start space-y-2 md:flex-row md:justify-between md:space-x-0">
                <Link href="/dashboard/billing" className={buttonVariants({})}>
                  Go to Billing
                </Link>
              </CardFooter>
            </Card>
          )}
        </>
      }
    />
    // <Drawer.Root>
    //   <DrawerTrigger asChild>
    //     <button className="group relative flex w-full transform-gpu flex-col rounded-3xl border-2 border-gray-200 bg-transparent transition-transform hover:-translate-y-0.5">
    //       <span
    //         className="relative overflow-hidden rounded-3xl aspect-[240/135] text-center z-10 flex justify-center items-center w-full flex-1 shrink-0 gap-0.5 bg-cover bg-bottom bg-no-repeat p-4 bg-blend-overlay [background-image:var(--post-image)] before:pointer-events-none before:absolute before:inset-0 before:z-10 before:select-none before:rounded-b-[calc(1.5rem-1px)] before:rounded-t-[calc(1.5rem-1px)] before:bg-[--post-image-bg] before:opacity-70 before:transition-opacity after:pointer-events-none after:absolute after:inset-0 after:z-10 after:select-none after:rounded-b-[calc(1.5rem-1px)] after:bg-gradient-to-b after:from-transparent after:to-[--post-image-bg] after:backdrop-blur after:transition-opacity group-hover:underline group-hover:before:opacity-30 md:p-5"
    //         style={
    //           {
    //             "--post-image":
    //               "url(https://img.freepik.com/free-vector/blue-pink-halftone-background_53876-99004.jpg?w=2000)",
    //           } as React.CSSProperties
    //         }
    //       >
    //         <h2 className="z-20 text-lg font-bold tracking-tight opacity-70 transition-opacity group-hover:opacity-100 md:text-lg">
    //           {role.title} • {role.city} • Remote
    //         </h2>
    //       </span>
    //     </button>
    //   </DrawerTrigger>
    //   <DrawerContent className="h-[85%] px-2 pt-10 pb-2 overflow-y-scroll scrolling-smooth">
    //     <div className="relative mx-auto max-w-3xl py-6 lg:py-10 z-[100] overflow-y-scroll">
    //       <div className="flex items-start justify-between">
    //         <h3 className="mt-2 mb-6 inline-block font-bold text-2xl leading-tight lg:text-4xl">
    //           {role.title}
    //         </h3>
    //         <ContactUserBtn userId={role.userId} />
    //       </div>
    //       <div className="mb-4">
    //         <h5 className="mb-2 flex items-center">
    //           <Building2 className="w-5 h-5 mr-2 rounded-full text-white p-1 bg-red-500" />{" "}
    //           <span className="font-semibold text-lg">Company Name</span>
    //         </h5>
    //         <p className="capitalize">{role.companyName}</p>
    //       </div>
    //       <div className="mb-4">
    //         <h5 className="mb-2 flex items-center">
    //           <User2 className="w-5 h-5 mr-2 rounded-full text-white p-1 bg-orange-500" />{" "}
    //           <span className="font-semibold text-lg">Employement Type</span>
    //         </h5>
    //         <p className="capitalize">{role.employmentType}</p>
    //       </div>
    //       <div className="mb-4">
    //         <h5 className="mb-2 flex items-center">
    //           <Briefcase className="w-5 h-5 mr-2 rounded-full text-white p-1 bg-purple-500" />{" "}
    //           <span className="font-semibold text-lg">Work Mode</span>
    //         </h5>
    //         <p className="capitalize">{role.location}</p>
    //       </div>
    //       <div className="mb-4">
    //         <h5 className="mb-2 flex items-center">
    //           <MapPin className="w-5 h-5 mr-2 rounded-full text-white p-1 bg-green-500" />{" "}
    //           <span className="font-semibold text-lg">Location</span>
    //         </h5>
    //         <p className="capitalize">
    //           {role.country}, {role.city}
    //         </p>
    //       </div>
    //       <div className="mb-4">
    //         <h5 className="mb-2 flex items-center">
    //           <BookOpen className="w-5 h-5 mr-2 rounded-full text-white p-1 bg-blue-500" />{" "}
    //           <span className="font-semibold text-lg">My post</span>
    //         </h5>
    //         <p>{role.description}</p>
    //       </div>
    //       <div>
    //         <h5 className="mb-2 flex items-center">
    //           <Tags className="w-5 h-5 mr-2 rounded-full text-white p-1 bg-yellow-500" />{" "}
    //           <span className="font-semibold text-lg">Skills</span>
    //         </h5>
    //         <div className="flex gap-2">
    //           {skills.map((skill) => (
    //             <Badge
    //               variant="secondary"
    //               key={skill.id}
    //               className="px-2 py-1 capitalize"
    //             >
    //               {skill.text}
    //             </Badge>
    //           ))}
    //         </div>
    //       </div>
    //     </div>
    //   </DrawerContent>
    // </Drawer.Root>
  );
}
