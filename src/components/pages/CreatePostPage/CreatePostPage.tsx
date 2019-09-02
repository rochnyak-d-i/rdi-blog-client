import React from 'react';
import { PostFormContainer } from '../../container/PostForm/PostForm';

export interface CreatePostPageProps {}

export default function CreatePostPage(props: CreatePostPageProps) {
  return (
    <div className="create-post-page">
      <PostFormContainer action="/api/blog/create" />
    </div>
  );
}
