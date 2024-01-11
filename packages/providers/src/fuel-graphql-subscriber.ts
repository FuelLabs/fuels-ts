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

export class FuelGraphqlSubscriber implements AsyncIterator<unknown> {
  private stream!: ReadableStreamDefaultReader<Uint8Array>;
  private static textDecoder = new TextDecoder();

  private static parseBytesStream(
    bytes: Uint8Array | undefined
  ): Record<string, unknown> | FuelError | undefined {
    if (bytes === undefined) {
      return undefined;
    }

    const text = this.textDecoder.decode(bytes);
    if (!text.startsWith('data:')) {
      // the text can sometimes be a keep-alive message
      return undefined;
    }

    const { data, errors } = JSON.parse(text.split('data:')[1]);

    if (Array.isArray(errors)) {
      return new FuelError(
        FuelError.CODES.INVALID_REQUEST,
        errors.map((err) => err.message).join('\n\n')
      );
    }

    return data as Record<string, unknown>;
  }

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

  private async readStream(): Promise<IteratorResult<unknown, unknown>> {
    const { value, done } = await this.stream.read();

    const parsed = FuelGraphqlSubscriber.parseBytesStream(value);

    if (parsed === undefined && !done) {
      // this is in the case of e.g. a keep-alive message
      // we recursively wait for the next message until it's a proper gql response
      // or the stream is done (e.g. closed by the server)
      return this.readStream();
    }

    return { value: parsed, done };
  }

  async next(): Promise<IteratorResult<unknown, unknown>> {
    if (!this.stream) {
      await this.setStream();
    }

    const { value, done } = await this.readStream();

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
