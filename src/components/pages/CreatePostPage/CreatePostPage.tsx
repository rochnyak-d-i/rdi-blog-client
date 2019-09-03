import React from 'react';
import { PostFormContainer } from '@components/container/PostForm/PostForm';

export interface CreatePostPageProps {}

export default function CreatePostPage(props: CreatePostPageProps) {
  return (
    <div className="create-post-page">
      {/* TODO: after publishing, make a redirect to the edit page */}
      <PostFormContainer action="/api/blog/create" />
    </div>
  );
}
