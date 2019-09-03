import React, { useState } from 'react';
import { IPostProps } from '../../common/Post/Post';
import {
  PostForm, IPostFormProps, ISubmitMeta
} from '../../common/PostForm/PostForm';
import fetch from 'cross-fetch';

export function PostFormContainer(props: IPostFormProps) {
  const [loading, setLoading] = useState(false);

  function savePost(post: IPostProps, meta: ISubmitMeta): void {
    setLoading(true);

    fetch(meta.action, {
      method: meta.method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    })
    .catch(console.error)
    .then(() => setLoading(false));
  }

  return (
    <PostForm {...props} onSubmit={savePost} disabled={loading} />
  );
}
