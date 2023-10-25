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

export async function* fuelGraphQLSubscriber({
  url,
  variables,
  query,
  fetchFn,
}: FuelGraphQLSubscriberOptions) {
  const streamReader = await fetchFn(`${url}-sub`, {
    method: 'POST',
    keepalive: true,
    body: JSON.stringify({
      query: print(query),
      variables,
    }),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'text/event-stream',
    },
  }).then((x) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const reader = x.body!.pipeThrough(new TextDecoderStream()).getReader();

    return new ReadableStream({
      start(controller) {
        reader.read().then(function push(result) {
          const { done, value } = result;
          if (done) {
            controller.close();
            return;
          }
          if (value.startsWith('data:')) {
            const { data, errors } = JSON.parse(value.split('data:')[1]);
            if (Array.isArray(errors)) {
              controller.enqueue(
                new FuelError(
                  FuelError.CODES.INVALID_REQUEST,
                  errors.map((err) => err.message).join('\n\n')
                )
              );
            } else controller.enqueue(data);
          }

          reader.read().then(push);
        });
      },
    }).getReader();
  });

  for (;;) {
    const { value, done } = await streamReader.read();
    if (value instanceof FuelError) throw value;
    yield value;
    if (done) break;
  }
}
