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
    console.log(e);
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
      console.log(e);
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
