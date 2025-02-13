import { ErrorCode, FuelError } from '@fuel-ts/errors';
import type { DocumentNode } from 'graphql';
import { print } from 'graphql';

import { assertGqlResponseHasNoErrors } from './utils/handle-gql-error-message';

type FuelGraphQLSubscriberOptions = {
  url: string;
  query: DocumentNode;
  variables?: Record<string, unknown>;
  fetchFn: typeof fetch;
  operationName?: string;
};

type Events = Array<{
  data: Record<string, unknown>;
  extensions: Record<string, unknown>;
  errors?: { message: string }[];
}>;

export class FuelGraphqlSubscriber implements AsyncIterator<unknown> {
  public static incompatibleNodeVersionMessage: string | false = false;
  private static textDecoder = new TextDecoder();

  private constructor(private stream: ReadableStreamDefaultReader<Uint8Array>) {}

  public static async create(options: FuelGraphQLSubscriberOptions) {
    const { url, query, variables, fetchFn, operationName } = options;
    const response = await fetchFn(`${url}-sub`, {
      method: 'POST',
      body: JSON.stringify({
        query: print(query),
        variables,
        operationName,
      }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'text/event-stream',
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const [backgroundStream, resultStream] = response.body!.tee();

    // eslint-disable-next-line no-void
    void this.readInBackground(backgroundStream.getReader());

    const [errorReader, resultReader] = resultStream.tee().map((stream) => stream.getReader());

    /**
     * If the node threw an error, read it and throw it to the user
     * Else just discard the response and return the subscriber below,
     * which will have that same response via `resultReader`
     */
    await new FuelGraphqlSubscriber(errorReader).next();

    return new FuelGraphqlSubscriber(resultReader);
  }

  /**
   * Reads the stream in the background,
   * thereby preventing the stream from not being read
   * if the user ignores the subscription.
   * Even though the read data is ignored in this function,
   * it is still available in the other streams
   * via internal mechanisms related to teeing.
   */
  private static async readInBackground(reader: ReadableStreamDefaultReader<Uint8Array>) {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const { done } = await reader.read();
      if (done) {
        return;
      }
    }
  }

  private events: Events = [];
  private parsingLeftover = '';

  async next(): Promise<IteratorResult<unknown, unknown>> {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      if (this.events.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const { data, extensions, errors } = this.events.shift()!;
        assertGqlResponseHasNoErrors(errors, FuelGraphqlSubscriber.incompatibleNodeVersionMessage);
        return { value: { ...data, extensions }, done: false };
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
  return(): Promise<IteratorResult<unknown, undefined>> {
    return Promise.resolve({ done: true, value: undefined });
  }

  [Symbol.asyncIterator](): AsyncIterator<unknown, unknown, undefined> {
    return this;
  }
}
