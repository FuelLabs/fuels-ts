import { FuelError } from '@fuel-ts/errors';
import type { DocumentNode } from 'graphql';
import { print } from 'graphql';

export class Subscriber {
  private request: Promise<Response>;
  private reader?: ReadableStreamDefaultReader<Uint8Array>;

  constructor(
    url: string,
    query: DocumentNode,
    variables: Record<string, unknown> | undefined,
    fetchFn: typeof fetch
  ) {
    const queryString = print(query);
    const requestBody = {
      query: queryString,
      variables,
    };

    this.request = fetchFn(`${url}-sub`, {
      method: 'POST',
      body: JSON.stringify(requestBody),
      keepalive: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'text/event-stream',
      },
    });
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
          this.reader.releaseLock();
          await this.reader.cancel();
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
