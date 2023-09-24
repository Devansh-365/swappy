import db from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { NextResponse } from "next/server";
import * as z from "zod";

const postSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(10),
  companyName: z.string().optional(),
  skills: z.array(
    z.object({
      id: z.string(),
      text: z.string(),
    })
  ),
  location: z.string(),
  country: z.string(),
  city: z.string(),
  employmentType: z.string(),
  opinion: z.string().optional(),
  phoneNum: z.string().optional(),
  email: z.string().optional(),
});

export async function GET(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const jobs = await db.job.findMany({
      where: {
        userId: user?.id,
      },
    });

    return NextResponse.json(jobs);
  } catch (error) {
    console.log("[JOBS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const json = await req.json();
    const data = postSchema.parse(json);

    const job = await db.job.create({
      data: {
        userId: user.id,
        title: data.title,
        description: data.description,
        companyName: data.companyName,
        skills: {
          create: data.skills.map((skill) => ({
            text: skill.text,
          })),
        },
        location: data.location,
        country: data.country,
        city: data.city,
        employmentType: data.employmentType,
        opinion: data.opinion,
        phoneNum: data.phoneNum,
        email: data.email,
      },
    });

    return NextResponse.json(job);
  } catch (error) {
    console.log("[JOBS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
