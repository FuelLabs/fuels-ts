import { ErrorCode, FuelError } from '@fuel-ts/errors';
import type { DocumentNode } from 'graphql';
import { print } from 'graphql';

import { assertGqlResponseHasNoErrors } from './utils/handle-gql-error-message';

type FuelGraphQLSubscriberOptions = {
  url: string;
  query: DocumentNode;
  variables?: Record<string, unknown>;
  fetchFn: typeof fetch;
  operationName: string;
  onEvent?: (event: FuelGraphqlSubscriberEvent) => void;
};

export interface FuelGraphqlSubscriberEvent {
  data: unknown;
  errors?: { message: string }[];
  extensions?: Record<string, unknown>;
}

export class FuelGraphqlSubscriber implements AsyncIterator<unknown> {
  public static incompatibleNodeVersionMessage: string | false = false;
  private static textDecoder = new TextDecoder();

  private constructor(
    private stream: ReadableStreamDefaultReader<Uint8Array>,
    private onEvent?: (event: FuelGraphqlSubscriberEvent) => void
  ) {}

  public static async create(options: FuelGraphQLSubscriberOptions) {
    const { url, query, variables, fetchFn, operationName, onEvent } = options;
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
    const [errorReader, resultReader] = response.body!.tee().map((stream) => stream.getReader());

    /**
     * If the node threw an error, read it and throw it to the user
     * Else just discard the response and return the subscriber below,
     * which will have that same response via `resultReader`
     */
    await new FuelGraphqlSubscriber(errorReader).next();

    return new FuelGraphqlSubscriber(resultReader, onEvent);
  }

  /**
   *
   * @param reader - The reader of the SSE stream
   * @param parsingLeftover - The leftover string from parsing the previous event
   * @returns The event parsed as a full GraphQL response, whether the stream is done and the leftover string after parsing
   */
  public static async readEvent(
    reader: ReadableStreamDefaultReader<Uint8Array>,
    parsingLeftover: string = ''
  ): Promise<{
    event: FuelGraphqlSubscriberEvent | undefined;
    done: boolean;
    parsingLeftover: string;
  }> {
    let text = parsingLeftover;
    const regex = /data:.*\n\n/g;

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const matches = [...text.matchAll(regex)].flatMap((match) => match);

      if (matches.length > 0) {
        try {
          const event = JSON.parse(matches[0].replace(/^data:/, ''));

          return {
            event,
            done: false,
            parsingLeftover: text.replace(matches[0], ''),
          };
        } catch (e) {
          throw new FuelError(
            ErrorCode.STREAM_PARSING_ERROR,
            `Error while parsing stream data response: ${text}`
          );
        }
      }

      const { value, done } = await reader.read();

      if (done) {
        return { event: undefined, done, parsingLeftover: '' };
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

      text += decoded;
    }
  }

  private events: Array<FuelGraphqlSubscriberEvent> = [];

  private parsingLeftover = '';

  /**
   * Gets automatically called when iterating in a `for-await-of` loop.
   * It can also be called manually.
   *
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator/next
   */
  async next(): Promise<IteratorResult<unknown, unknown>> {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      if (this.events.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const event = this.events.shift()!;
        this.onEvent?.(event);
        assertGqlResponseHasNoErrors(
          event.errors,
          FuelGraphqlSubscriber.incompatibleNodeVersionMessage
        );
        return { value: event.data, done: false };
      }

      const { event, done, parsingLeftover } = await FuelGraphqlSubscriber.readEvent(
        this.stream,
        this.parsingLeftover
      );

      this.parsingLeftover = parsingLeftover;

      if (done) {
        return { value: undefined, done: true };
      }
      this.events.push(event as FuelGraphqlSubscriberEvent);
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
