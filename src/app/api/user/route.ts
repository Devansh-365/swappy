import db from "@/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";

const formSchema = z.object({
  userId: z.string(),
});

export async function POST(req: Request) {
  try {
    // const user = await getCurrentUser();

    // if (!user) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }

    const json = await req.json();
    const data = formSchema.parse(json);

    const user = await db.user.findFirst({
      where: {
        id: data.userId,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log("[JOBS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
