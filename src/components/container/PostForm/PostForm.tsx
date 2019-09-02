import React from 'react';
import { IPostProps } from '../../common/Post/Post';
import {
  PostForm, IPostFormProps, ISubmitMeta
} from '../../common/PostForm/PostForm';

export function PostFormContainer(props: IPostFormProps) {
  function savePost(post: IPostProps, meta: ISubmitMeta): void {
    // fetch(meta.action, {
    //   method: meta.method,
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(post)
    // });
  }

  return (
    <PostForm {...props} onSubmit={savePost} />
  );
}
