import type { MockInstance } from 'vitest';

interface FetchOperation {
  url: string | URL | Request;
  method: string;
  operationName: string;
  extensions: {
    required_fuel_block_height: number;
    [key: string]: unknown;
  };
}

export const getFetchOperationBody = (fetchSpy: MockInstance<typeof fetch>): FetchOperation[] =>
  fetchSpy.mock.calls.map(([url, init]) => {
    const body = init?.body?.toString();
    const parsedBody = JSON.parse(body as string);
    return {
      url,
      method: init?.method ?? 'UNKNOWN',
      operationName: parsedBody.operationName,
      extensions: parsedBody.extensions ?? {},
    };
  });

export const getFetchOperationsByName = (
  fetchSpy: MockInstance<typeof fetch>,
  name: string
): FetchOperation[] =>
  getFetchOperationBody(fetchSpy).filter((operation) => operation.operationName === name);
