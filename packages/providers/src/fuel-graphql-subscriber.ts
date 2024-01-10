/* eslint-disable max-classes-per-file */
import { FuelError } from '@fuel-ts/errors';
import type { DocumentNode } from 'graphql';
import { print } from 'graphql';

export type FuelGraphQLSubscriberOptions = {
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

  constructor() {
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
            this.readableStreamController.enqueue(data);
          }
        }
      },
    });
  }
}

export class FuelGraphqlSubscriber implements AsyncIterator<unknown> {
  private stream!: ReadableStreamDefaultReader<Record<string, unknown> | FuelError>;

  public constructor(private options: FuelGraphQLSubscriberOptions) {}

  private async setStream() {
    const { url, query, variables, fetchFn } = this.options;
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
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.stream = response.body!.pipeThrough(new FuelSubscriptionStream()).getReader();
  }

  async next(): Promise<IteratorResult<unknown, unknown>> {
    if (!this.stream) {
      await this.setStream();
    }

    const { value, done } = await this.stream.read();

    if (value instanceof FuelError) {
      throw value;
    }

    return { value, done };
  }

  /**
   * Gets called when `break` is called in a `for-await-of` loop.
   */
  async return(): Promise<IteratorResult<unknown, undefined>> {
    await this.stream.cancel();
    return { done: true, value: undefined };
  }

  [Symbol.asyncIterator](): AsyncIterator<unknown, unknown, undefined> {
    return this;
  }
}
