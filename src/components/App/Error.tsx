import React, { useMemo, ReactElement } from 'react';
import { HttpError } from '@utils/HttpError';
import { HttpResponse } from '@utils/HttpResponse';
import { Response } from 'cross-fetch';

export interface IAppErrorProps {
  error: Error
}

export function AppError({ error }: IAppErrorProps): ReactElement {
  // const isWebpackChunkError = error.name = 'ChunkLoadError';

  if (error instanceof HttpError) {
    if (error.isNotFound()) {
      return (<h1>404 Page not Found!</h1>);
    }

    if (error.isServerError()) {
      return (<h1>Server error!</h1>);
    }
  }

  return (<h1>Application Error!</h1>);
}

export function NotFoundPage() {
  const httpError = useMemo(() => {
    const response = new Response(null, {status: 404, statusText: 'Not Found'});
    const httpResponse = new HttpResponse(response);
    const error = new HttpError(httpResponse);

    return error;
  }, [])

  return (<AppError error={httpError} />);
}
