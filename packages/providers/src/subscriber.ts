import { FuelError } from '@fuel-ts/errors';
import type { DocumentNode } from 'graphql';
import { print } from 'graphql';

type SubscriberOptions = {
  url: string;
  query: DocumentNode;
  variables?: Record<string, unknown>;
  fetchFn: typeof fetch;
  abortController?: AbortController;
};
export class Subscriber {
  private request: Promise<Response>;
  private reader?: ReadableStreamDefaultReader<Uint8Array>;
  private abortController: AbortController;
  constructor({
    url,
    query,
    variables,
    fetchFn,
    abortController = new AbortController(),
  }: SubscriberOptions) {
    const queryString = print(query);
    const requestBody = {
      query: queryString,
      variables,
    };
    this.abortController = abortController;
    this.request = fetchFn(`${url}-sub`, {
      method: 'POST',
      signal: this.abortController.signal,
      body: JSON.stringify(requestBody),
      keepalive: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'text/event-stream',
      },
    });
  }
  async sub() {
    const generator = this.subscribe();
    generator.return = () => {};
  }

  async *subscribe() {
    if (this.reader === undefined) {
      const response = await this.request;
      this.reader = response.body!.getReader();
    }

    while (true) {
      const { value, done } = await this.reader.read();
      const text = new TextDecoder().decode(value);
      if (text.startsWith('data:')) {
        const { data, errors } = JSON.parse(text.split('data:')[1]);
        if (Array.isArray(errors)) {
          await this.reader.cancel();
          // @ts-expect-error to dispose
          this.request = null;
          this.reader = undefined;

          this.abortController.abort();
          throw new FuelError(
            FuelError.CODES.INVALID_REQUEST,
            errors.map((x) => x.message).join('\n\n')
          );
        }
        yield data;
        if (done) break;
      }
    }
  }
}
