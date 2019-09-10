import fetch from 'cross-fetch';
import { HttpError } from './HttpError';
import { HttpResponse } from './HttpResponse';

export type ResponseFetchData <T> = {
  body: T,
  response: Response
}

/**
 * Send request to the server
 *
 * @param {string}  url
 * @param {string}  method
 * @param {*}       requestBody
 *
 * @returns {Promise<ResponseFetchData>}
 */
export async function request <T, R = null>(
  url: string,
  method: string,
  requestBody: T
): Promise<HttpResponse<R>> {
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  });
  const httpResponse = new HttpResponse<R>(response);

  if (httpResponse.isError()) {
    throw new HttpError<R>(httpResponse);
  }

  return httpResponse;
}

/**
 * Sends a request to the server and return the data
 *
 * params - @see _request
 *
 * @returns {Promise<ResponseData>}
 */
export async function requestOnlyOk <T, R = null>(
  url: string,
  method: string,
  requestBody: T
): Promise<HttpResponse<R>> {
  const response = await request<T, R>(url, method, requestBody);

  if (!response.isSuccessful()) {
    throw new HttpError<R>(response);
  }

  return response;
}
