import React from 'react';
import { IPostProps } from '../../common/Post/Post';
import {
  PostForm, IPostFormProps, ISubmitMeta
} from '../../common/PostForm/PostForm';
import fetch from 'cross-fetch';

export function PostFormContainer(props: IPostFormProps) {
  function savePost(post: IPostProps, meta: ISubmitMeta): void {
    fetch(meta.action, {
      method: meta.method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    })
    .catch(console.error);
  }

  return (
    <PostForm {...props} onSubmit={savePost} />
  );
}
