import axios, { AxiosError } from 'axios';
import { RequestError } from './request-error';
import { RequestConfig } from './request-config';
import { BASE_URL } from './request-constants';

async function get<T>(
  path: string,
  config: RequestConfig = {}
): Promise<T | RequestError> {
  try {
    const response = await axios.get<T>(`${BASE_URL}/${path}`, config);
    return response.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      // This has  a really bad smell. It's already hard to understand the construction of the RequestError.
      // This is happening because the backend has two different formats for error responses:
      // One provided by NestJS, and one custom provided by me, when there is an error during a service execution.
      // Ideally I would have only one error model returning from the backend.
      // And since I'm building this RequestError in more than one place, maybe a Factory or a constructor could help.
      return new RequestError(
        e.response?.data.message
          ? e.response?.data.message[0]
          : e.response?.data.error,
        e.response?.status || -1,
        e.response?.data
      );
    }

    return new RequestError(JSON.stringify(e), -1, null);
  }
}

async function post<P, R>(
  path: string,
  payload: P,
  config?: RequestConfig
): Promise<R | RequestError> {
  try {
    const response = await axios.post<R>(
      `${BASE_URL}/${path}`,
      payload,
      config
    );
    return response.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      return new RequestError(
        e.response?.data.message
          ? e.response?.data.message[0]
          : e.response?.data.error,
        e.response?.status || -1,
        e.response?.data
      );
    }

    return new RequestError(JSON.stringify(e), -1, null);
  }
}

export const request = { get, post };
