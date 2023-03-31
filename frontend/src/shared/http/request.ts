import axios, { AxiosError } from 'axios';
import { RequestError } from './request-error';

async function get<T>(path: string): Promise<T | RequestError> {
  try {
    const response = await axios.get<T>(path);
    return response.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      return new RequestError(
        e.message,
        e.response?.status || -1,
        e.response?.data
      );
    }

    return new RequestError(JSON.stringify(e), -1, null);
  }
}

export const request = { get };
