import { request } from '@/shared/http/request';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { RequestError } from '@/shared/http/request-error';
import { BASE_URL } from '@/shared/http/request-constants';

describe('Request', () => {
  describe('#get', () => {
    it('calls axios.get with the given path', async () => {
      const path = '/foo';

      vi.spyOn(axios, 'get').mockResolvedValueOnce({ data: {} });

      await request.get(path);

      expect(axios.get).toHaveBeenNthCalledWith(1, `${BASE_URL}/${path}`, {});
    });

    describe('when the request is successful and has a 2xx status code', () => {
      it('returns the response data', async () => {
        const response = { foo: 'bar' };

        vi.spyOn(axios, 'get').mockResolvedValueOnce({ data: response });

        const result = await request.get('/foo');

        expect(result).toStrictEqual(response);
      });
    });

    describe('when the request fails due to a status >= 400', () => {
      const mockAxiosResponse: Partial<AxiosResponse> = {
        data: { message: 'invalid_data' },
        status: 400,
        statusText: 'Bad Request',
        headers: {},
        // @ts-expect-error: This is a mock object, so we don't need to provide all the properties.
        config: {},
      };

      test('returns a request error with data about the error', async () => {
        vi.spyOn(axios, 'get').mockImplementationOnce(() =>
          Promise.reject(
            new AxiosError(
              'invalid_data',
              '400',
              undefined,
              {},
              // @ts-expect-error: This is a mock object, so we don't need to provide all the properties.
              mockAxiosResponse
            )
          )
        );

        expect(await request.get('/foo')).toStrictEqual(
          new RequestError('invalid_data', 400, { message: 'invalid_data' })
        );
      });
    });
  });

  describe('#post', () => {
    it('calls axios.post with the given path and payload', async () => {
      const path = '/foo';
      const payload = { foo: 'bar' };
      const config = { headers: { 'Content-Type': 'application/json' } };

      vi.spyOn(axios, 'post').mockResolvedValueOnce({ data: {} });

      await request.post(path, payload, config);

      expect(axios.post).toHaveBeenNthCalledWith(
        1,
        `${BASE_URL}/${path}`,
        payload,
        config
      );
    });

    describe('when the request is successful and has a 2xx status code', () => {
      it('returns the response data', async () => {
        const response = { foo: 'bar' };

        vi.spyOn(axios, 'post').mockResolvedValueOnce({ data: response });

        const result = await request.post('/foo', {});

        expect(result).toStrictEqual(response);
      });
    });

    describe('when the request fails due to a status >= 400', () => {
      const mockAxiosResponse: Partial<AxiosResponse> = {
        data: { message: 'invalid_data' },
        status: 400,
        statusText: 'Bad Request',
        headers: {},
        // @ts-expect-error: This is a mock object, so we don't need to provide all the properties.
        config: {},
      };

      test('returns a request error with data about the error', async () => {
        vi.spyOn(axios, 'post').mockImplementationOnce(() =>
          Promise.reject(
            new AxiosError(
              'invalid_data',
              '400',
              undefined,
              {},
              // @ts-expect-error: This is a mock object, so we don't need to provide all the properties.
              mockAxiosResponse
            )
          )
        );

        expect(await request.post('/foo', {})).toStrictEqual(
          new RequestError('invalid_data', 400, { message: 'invalid_data' })
        );
      });
    });
  });
});
