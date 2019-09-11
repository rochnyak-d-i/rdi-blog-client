import React, { useState, useCallback } from 'react';
import { IPostProps } from '@components/common/Post/Post';
import {
  PostForm, IPostFormProps, ISubmitMeta
} from '@components/common/PostForm/PostForm';
import { request } from '@utils/request';
import { useDispatch } from '@state/index';
import { setError } from '@state/actions/setError';

export function PostFormContainer(props: IPostFormProps) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleSubmit = useCallback(
    (post: IPostProps, meta: ISubmitMeta): void => {
      setLoading(true);

      request<IPostProps>(meta.action, meta.method, post)
        .catch(error => dispatch(setError(error)))
        .then(() => setLoading(false));
    },
    [setLoading, dispatch]
  );

  return (
    <PostForm {...props} onSubmit={handleSubmit} disabled={loading} />
  );
}
