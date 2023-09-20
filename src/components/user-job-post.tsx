import Link from "next/link";

import { formatDate } from "@/lib/utils";
import { PostOperations } from "@/components/post-operation";
import { Job } from "@prisma/client";

interface UserJobPostItemProps {
  post: Pick<Job, "id" | "title" | "updatedAt" | "createdAt">;
}

export function UserJobPostItem({ post }: UserJobPostItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <Link
          href={`/post/${post.id}`}
          className="font-semibold hover:underline"
        >
          {post.title}
        </Link>
        <div>
          <p className="text-sm text-muted-foreground">
            {formatDate(post.createdAt?.toDateString())}
          </p>
        </div>
      </div>
      <PostOperations post={{ id: post.id, title: post.title }} />
    </div>
  );
}
