import fetch from 'cross-fetch';
import { IPostProps } from '@components/common/Post/Post';

export async function savePost(
  url: string,
  method: string,
  post: IPostProps
): Promise<any> {
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  });

  const status = response.status;

  if (status < 200 || status >= 300) {
    // if Content-Type === 'application/json' need take errors from body

    throw new Error(`Request error - "${response.statusText}"`);
  }

  return response.json();
}
