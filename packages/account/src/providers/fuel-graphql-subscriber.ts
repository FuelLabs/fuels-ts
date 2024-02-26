import { FuelError } from '@fuel-ts/errors';
import type { DocumentNode } from 'graphql';
import { print } from 'graphql';

type FuelGraphQLSubscriberOptions = {
  url: string;
  query: DocumentNode;
  variables?: Record<string, unknown>;
  fetchFn: typeof fetch;
};

export class FuelGraphqlSubscriber implements AsyncIterator<unknown> {
  private stream!: ReadableStreamDefaultReader<Uint8Array>;
  private static textDecoder = new TextDecoder();

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
    this.stream = response.body!.getReader();
  }

  async next(): Promise<IteratorResult<unknown, unknown>> {
    if (!this.stream) {
      await this.setStream();
    }

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const { value, done } = await this.stream.read();
      if (done) {
        return { value, done };
      }

      const text = FuelGraphqlSubscriber.textDecoder.decode(value);

      /**
       * We don't care about responses that don't start with 'data:' like keep-alive messages.
       * The only responses that I came across from the node are either 200 responses with data or keep-alive messages.
       * You can find the keep-alive message in the fuel-core codebase:
       * https://github.com/FuelLabs/fuel-core/blob/e1e631902f762081d2124d9c457ddfe13ac366dc/crates/fuel-core/src/graphql_api/service.rs#L247
       * */
      if (!text.startsWith('data:')) {
        // eslint-disable-next-line no-continue
        continue;
      }

      const { data, errors } = JSON.parse(text.split('data:')[1]);

      if (Array.isArray(errors)) {
        throw new FuelError(
          FuelError.CODES.INVALID_REQUEST,
          errors.map((err) => err.message).join('\n\n')
        );
      }

      return { value: data, done: false };
    }
  }

  /**
   * Gets called when `break` is called in a `for-await-of` loop.
   */
  async return(): Promise<IteratorResult<unknown, undefined>> {
    await this.stream.cancel();
    this.stream.releaseLock();
    return { done: true, value: undefined };
  }

  [Symbol.asyncIterator](): AsyncIterator<unknown, unknown, undefined> {
    return this;
  }
}
