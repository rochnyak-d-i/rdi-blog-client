import React from 'react';
import { PostFormContainer } from '@components/container/PostForm/PostForm';

export interface EditPostPageProps {}

export default function EditPostPage(props: EditPostPageProps) {
  return (
    <div>
      <PostFormContainer action="/api/blog/:id" method="PUT" />
    </div>
  );
}
