import React from 'react'
import PostForm from './components/post-form';

type Props = {}

export default function PostPage({}: Props) {
  return (
    <div className="flex-col max-w-lg mx-auto">
      <div className="flex-1 space-y-4 p-8 pt-28 md:pt-24">
        <PostForm initialData={null} />
      </div>
    </div>
  );
}