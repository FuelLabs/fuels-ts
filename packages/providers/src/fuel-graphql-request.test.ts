import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError, safeExec } from '@fuel-ts/errors/test-utils';

import { GetVersionDocument, StatusChangeDocument } from './__generated__/operations';
import { fuelGraphQLRequest } from './fuel-graphql-request';

const SAMPLE_DOCUMENT = GetVersionDocument;
const SAMPLE_SUBSCRIPTION_DOCUMENT = StatusChangeDocument;

/**
 * @group node
 */
describe('FuelGraphqlRequest', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('Returns correct response when query/mutation response has data property', async () => {
    const fetchSpy = vi.spyOn(global, 'fetch');
    const responseBody = { a: 1 };
    fetchSpy.mockImplementationOnce(() =>
      Promise.resolve(new Response(JSON.stringify({ data: responseBody })))
    );

    const { result } = await safeExec(() => fuelGraphQLRequest(fetch, 'url', SAMPLE_DOCUMENT, {}));

    expect(result).toEqual(responseBody);
  });

  test('Throws error when query/mutation response has errors property', async () => {
    const fetchSpy = vi.spyOn(global, 'fetch');
    const errors = [{ message: 'error1' }, { message: 'error2' }];
    fetchSpy.mockImplementationOnce(() =>
      Promise.resolve(new Response(JSON.stringify({ errors })))
    );

    await expectToThrowFuelError(
      () => fuelGraphQLRequest(fetch, 'url', SAMPLE_DOCUMENT, {}),
      new FuelError(ErrorCode.INVALID_REQUEST, errors.map((err) => err.message).join('\n\n'))
    );
  });

  test('Returns correct response when subscription response has data property', async () => {
    const fetchSpy = vi.spyOn(global, 'fetch');

    const readableStream = new ReadableStream({
      start(controller) {
        const encoder = new TextEncoder();

        controller.enqueue(
          encoder.encode(`data:${JSON.stringify({ data: { submitAndAwait: { a: 0 } } })}`)
        );
        controller.enqueue(
          encoder.encode(`data:${JSON.stringify({ data: { submitAndAwait: { a: 1 } } })}`)
        );
        controller.close();
      },
    });
    fetchSpy.mockImplementationOnce(() => Promise.resolve(new Response(readableStream)));

    let iteration = 0;
    for await (const { submitAndAwait } of fuelGraphQLRequest(
      fetch,
      'url',
      SAMPLE_SUBSCRIPTION_DOCUMENT,
      {}
    ) as AsyncIterable<{ submitAndAwait: { a: number } }>) {
      expect(submitAndAwait.a).toEqual(iteration);
      iteration++;
    }
  });

  test('Throws error when subscription response has errors property', async () => {
    const fetchSpy = vi.spyOn(global, 'fetch');

    const errors = [{ message: 'error1' }, { message: 'error2' }];

    const readableStream = new ReadableStream({
      start(controller) {
        const encoder = new TextEncoder();

        controller.enqueue(encoder.encode(`data:${JSON.stringify({ errors })}`));
        controller.close();
      },
    });
    fetchSpy.mockImplementationOnce(() => Promise.resolve(new Response(readableStream)));

    await expectToThrowFuelError(
      async () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        for await (const sub of fuelGraphQLRequest(
          fetch,
          'url',
          SAMPLE_SUBSCRIPTION_DOCUMENT,
          {}
        ) as AsyncIterable<{ submitAndAwait: { a: number } }>) {
          // should not be reached
          expect(true).toBeFalsy();
        }
      },
      new FuelError(ErrorCode.INVALID_REQUEST, errors.map((err) => err.message).join('\n\n'))
    );
  });

  test('Closes subscription stream when subscription is cancelled', async () => {
    const fetchSpy = vi.spyOn(global, 'fetch');

    let canceled = false;
    const readableStream = new ReadableStream({
      start(controller) {
        const encoder = new TextEncoder();

        controller.enqueue(
          encoder.encode(`data:${JSON.stringify({ data: { submitAndAwait: { a: 0 } } })}`)
        );
        controller.enqueue(
          encoder.encode(`data:${JSON.stringify({ data: { submitAndAwait: { a: 1 } } })}`)
        );
      },
      cancel() {
        canceled = true;
      },
    });
    fetchSpy.mockImplementationOnce(() => Promise.resolve(new Response(readableStream)));

    let loopBodyHit = false;

    // eslint-disable-next-line no-unreachable-loop, @typescript-eslint/no-unused-vars
    for await (const { submitAndAwait } of fuelGraphQLRequest(
      fetch,
      'url',
      SAMPLE_SUBSCRIPTION_DOCUMENT,
      {}
    ) as AsyncIterable<{ submitAndAwait: { a: number } }>) {
      loopBodyHit = true;
      break;
    }

    expect(loopBodyHit).toEqual(true);
    expect(canceled).toEqual(true);
  });

  test('ignores keep-alive-text messages in subscriptions', async () => {
    const fetchSpy = vi.spyOn(global, 'fetch');

    const readableStream = new ReadableStream({
      start(controller) {
        const encoder = new TextEncoder();

        controller.enqueue(
          encoder.encode(`data:${JSON.stringify({ data: { submitAndAwait: { a: 0 } } })}`)
        );
        controller.enqueue(encoder.encode('keep-alive-text'));
        controller.enqueue(
          encoder.encode(`data:${JSON.stringify({ data: { submitAndAwait: { a: 1 } } })}`)
        );
        controller.close();
      },
    });
    fetchSpy.mockImplementationOnce(() => Promise.resolve(new Response(readableStream)));

    let iteration = 0;
    for await (const { submitAndAwait } of fuelGraphQLRequest(
      fetch,
      'url',
      SAMPLE_SUBSCRIPTION_DOCUMENT,
      {}
    ) as AsyncIterable<{ submitAndAwait: { a: number } }>) {
      expect(submitAndAwait.a).toEqual(iteration);
      iteration++;
    }
  });
});
