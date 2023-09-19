import React from "react";
import PostForm from "./components/post-form";
import db from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

type Props = {};

export default async function PostPage({
  params,
}: {
  params: { postId: string };
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const job = await db.job.findUnique({
    where: {
      id: params.postId,
    },
    include: {
      skills: true,
    },
  });

  return (
    <div className="flex-col max-w-lg mx-auto">
      <div className="flex-1 space-y-4 p-8 pt-28 md:pt-24">
        <PostForm initialData={job} />
      </div>
    </div>
  );
}
