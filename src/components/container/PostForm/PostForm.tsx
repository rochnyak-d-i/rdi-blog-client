import React, { useState } from 'react';
import { IPostProps } from '@components/common/Post/Post';
import {
  PostForm, IPostFormProps, ISubmitMeta
} from '@components/common/PostForm/PostForm';
import { savePost } from '@services/savePost';

export function PostFormContainer(props: IPostFormProps) {
  const [loading, setLoading] = useState(false);

  function handleSubmit(post: IPostProps, meta: ISubmitMeta): void {
    setLoading(true);

    savePost(meta.action, meta.method, post)
      .catch(console.error)
      .then(() => setLoading(false));
  }

  return (
    <PostForm {...props} onSubmit={handleSubmit} disabled={loading} />
  );
}
