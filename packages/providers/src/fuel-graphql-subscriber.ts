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

class FuelSubscriptionStream implements TransformStream {
  readable: ReadableStream<FuelError | Record<string, unknown>>;
  writable: WritableStream<Uint8Array>;
  private readableStreamController!: ReadableStreamController<FuelError | Record<string, unknown>>;
  private static textDecoder = new TextDecoder();

  constructor(subscriptionName: string) {
    this.readable = new ReadableStream({
      start: (controller) => {
        this.readableStreamController = controller;
      },
    });

    this.writable = new WritableStream<Uint8Array>({
      write: (bytes) => {
        const text = FuelSubscriptionStream.textDecoder.decode(bytes);
        // the fuel node sends keep-alive messages that should be ignored
        if (text.startsWith('data:')) {
          const { data, errors } = JSON.parse(text.split('data:')[1]);
          if (Array.isArray(errors)) {
            this.readableStreamController.enqueue(
              new FuelError(
                FuelError.CODES.INVALID_REQUEST,
                errors.map((err) => err.message).join('\n\n')
              )
            );
          } else {
            this.readableStreamController.enqueue(data[subscriptionName]);
          }
        }
      },
    });
  }
}

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

  const subscriptionName = (
    query.definitions.find((q) => q.kind === 'OperationDefinition') as { name: { value: string } }
  )?.name.value;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const subscriptionStreamReader = response
    .body!.pipeThrough(new FuelSubscriptionStream(subscriptionName))
    .getReader();

  while (true) {
    const { value, done } = await subscriptionStreamReader.read();
    if (value instanceof FuelError) {
      throw value;
    }
    yield value;
    if (done) {
      break;
    }
  }
}
