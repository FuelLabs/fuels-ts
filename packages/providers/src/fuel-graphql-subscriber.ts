import { FuelError } from '@fuel-ts/errors';
import type { DocumentNode } from 'graphql';
import { print } from 'graphql';

type FuelGraphQLSubscriberOptions = {
  url: string;
  query: DocumentNode;
  variables?: Record<string, unknown>;
  fetchFn: typeof fetch;
  abortController?: AbortController;
};

const decoder = new TextDecoder();

export async function* fuelGraphQLSubscriber({
  url,
  variables,
  query,
  fetchFn,
}: FuelGraphQLSubscriberOptions) {
  const response = await fetchFn(`${url}-sub`, {
    method: 'POST',
    body: JSON.stringify({
      query: print(query),
      variables,
    }),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'text/event-stream',
    },
  });

  const body = response.body as ReadableStream<Uint8Array> & AsyncIterable<Uint8Array>;

  for await (const bytes of body) {
    const text = decoder.decode(bytes);

    if (text.startsWith('data:')) {
      const { data, errors } = JSON.parse(text.split('data:')[1]);
      if (Array.isArray(errors)) {
        throw new FuelError(
          FuelError.CODES.INVALID_REQUEST,
          errors.map((err) => err.message).join('\n\n')
        );
      } else {
        yield data;
      }
    }
  }
}
