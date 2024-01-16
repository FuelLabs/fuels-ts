/* 

  Replaces `graphql-request` and `graphql-tag` dependencies with a simple
  `fetch` implementation, reducing the final bundle size by 15.68 kB.

  More:
    https://github.com/FuelLabs/fuels-ts/discussions/1592#discussioncomment-8003515

*/

import { FuelError } from '@fuel-ts/errors';
import type { DocumentNode } from 'graphql';
import { print } from 'graphql';

function isSubscription({ definitions: defs }: DocumentNode) {
  const opDef = defs.find((op) => op.kind === 'OperationDefinition');

  if (opDef && 'operation' in opDef) {
    return opDef?.operation === 'subscription';
  }

  return false;
}

class FuelGraphqlSubscriber implements AsyncIterator<unknown> {
  private stream!: ReadableStreamDefaultReader<Uint8Array>;
  private static textDecoder = new TextDecoder();

  private static parseBytesStream(
    bytes: Uint8Array | undefined
  ): Record<string, unknown> | FuelError | undefined {
    if (bytes === undefined) {
      return undefined;
    }

    const text = this.textDecoder.decode(bytes);

    // https://github.com/FuelLabs/fuel-core/blob/e1e631902f762081d2124d9c457ddfe13ac366dc/crates/fuel-core/src/graphql_api/service.rs#L247
    // this is the real keep-alive message sent by the server
    if (text === ':keep-alive-text\n\n') {
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

  public constructor(
    private options: {
      url: string;
      request: RequestInit;
      fetchFn: typeof fetch;
    }
  ) {}

  private async setStream() {
    const { url, request, fetchFn } = this.options;
    const response = await fetchFn(`${url}-sub`, {
      ...request,
      headers: {
        ...request.headers,
        Accept: 'text/event-stream',
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.stream = response.body!.getReader();
  }

  private async readStream(): Promise<IteratorResult<unknown, unknown>> {
    let parsed;
    let doneStreaming = false;
    do {
      const { value, done } = await this.stream.read();

      parsed = FuelGraphqlSubscriber.parseBytesStream(value);
      doneStreaming = done;
      if (parsed === undefined && !done) {
        return this.readStream();
      }

      // we do this until it's a proper gql response or the stream is done i.e. {value: undefined, done: true}
    } while (parsed === undefined && !doneStreaming);

    return { value: parsed, done: doneStreaming };
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
    this.stream.releaseLock();
    return { done: true, value: undefined };
  }

  [Symbol.asyncIterator](): AsyncIterator<unknown, unknown, undefined> {
    return this;
  }
}

async function handleQueryAndMutation(fetchFn: typeof fetch, url: string, request: RequestInit) {
  const response = await fetchFn(url, request);

  const { data, errors } = await response.json();

  if (Array.isArray(errors)) {
    throw new FuelError(
      FuelError.CODES.INVALID_REQUEST,
      errors.map((err) => err.message).join('\n\n')
    );
  }

  return data;
}

export function fuelGraphQLRequest(
  fetchFn: typeof fetch,
  url: string,
  operation: DocumentNode,
  variables: Record<string, unknown>
) {
  const request = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: print(operation), variables }),
  };

  if (isSubscription(operation)) {
    return new FuelGraphqlSubscriber({
      fetchFn,
      url,
      request,
    });
  }

  return handleQueryAndMutation(fetchFn, url, request);
}
