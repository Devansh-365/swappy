import db from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { NextResponse } from "next/server";
import * as z from "zod";

const postSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(10),
  companyName: z.string().min(2),
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
});

export async function DELETE(
  req: Request,
  { params }: { params: { postId: string } }
) {
  try {
    if (!params.postId) {
      return new NextResponse("Post id is required", { status: 400 });
    }

    await db.skill.deleteMany({
      where: { jobId: params.postId },
    });

    const post = await db.job.delete({
      where: {
        id: params.postId,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.log("[POST_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const json = await req.json();
    const data = postSchema.parse(json);

    const job = await db.job.update({
      where: {
        id: params.postId,
      },
      data: {
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
      },
    });

    return NextResponse.json(job);
  } catch (error) {
    console.log("[JOBS_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
