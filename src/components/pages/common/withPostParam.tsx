import { ComponentType } from 'react';
import { withPageData } from './withPageData';
import { IPostProps } from '@components/common/Post/Post';
import { requestOnlyOk } from '@utils/request';

type TParams = { id: string };

export function withPostParam <T>(
  Page: ComponentType<T>,
  PageLoading: ComponentType
) {
  async function loadPost(params: TParams): Promise<IPostProps> {
    const id: number = parseInt(params.id, 10);

    const response = await requestOnlyOk<void, IPostProps>(`/api/blog/${id}`);
    const post = await response.getBody();

    return post;
  }

  return withPageData<T, TParams, IPostProps>(Page, PageLoading, loadPost);
}
