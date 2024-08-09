import { ErrorCode, FuelError } from '@fuel-ts/errors';
import type { DocumentNode } from 'graphql';
import { print } from 'graphql';

import { handleGqlErrorMessage } from './utils/handle-gql-error-message';

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

  private events: Array<{ data: unknown; errors?: { message: string }[] }> = [];
  private parsingLeftover = '';

  async next(): Promise<IteratorResult<unknown, unknown>> {
    if (!this.stream) {
      await this.setStream();
    }

    // eslint-disable-next-line no-constant-condition
    while (true) {
      if (this.events.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const { data, errors } = this.events.shift()!;
        if (Array.isArray(errors)) {
          const errorMessage = errors.map((err) => err.message).join('\n\n');
          handleGqlErrorMessage(errorMessage);
        }
        return { value: data, done: false };
      }
      const { value, done } = await this.stream.read();
      if (done) {
        return { value, done };
      }

      /**
       * We don't care about keep-alive messages.
       * The only responses that I came across from the node are either 200 responses with "data:.*" or keep-alive messages.
       * You can find the keep-alive message in the fuel-core codebase (latest permalink as of writing):
       * https://github.com/FuelLabs/fuel-core/blob/e1e631902f762081d2124d9c457ddfe13ac366dc/crates/fuel-core/src/graphql_api/service.rs#L247
       * To get the actual latest info you need to check out the master branch (might change):
       * https://github.com/FuelLabs/fuel-core/blob/master/crates/fuel-core/src/graphql_api/service.rs#L247
       * */
      const decoded = FuelGraphqlSubscriber.textDecoder
        .decode(value)
        .replace(':keep-alive-text\n\n', '');

      if (decoded === '') {
        // eslint-disable-next-line no-continue
        continue;
      }

      const text = `${this.parsingLeftover}${decoded}`;
      const regex = /data:.*\n\n/g;

      const matches = [...text.matchAll(regex)].flatMap((match) => match);

      matches.forEach((match) => {
        try {
          this.events.push(JSON.parse(match.replace(/^data:/, '')));
        } catch (e) {
          throw new FuelError(
            ErrorCode.STREAM_PARSING_ERROR,
            `Error while parsing stream data response: ${text}`
          );
        }
      });

      this.parsingLeftover = text.replace(matches.join(), '');
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
