import { isAsyncFunction } from 'util/types';

import type { FuelError } from '../index';
import { ErrorCode } from '../index';

const enumValues = Object.values(ErrorCode);

function assertExpectations(
  thrownError: FuelError,
  expectedError: FuelError | (Partial<FuelError> & Required<Pick<FuelError, 'code'>>)
) {
  expect(thrownError.name).toEqual('FuelError');

  expect(enumValues).toContain(expectedError.code);

  (
    Object.getOwnPropertyNames(expectedError).filter((x) => x !== 'stack') as Array<
      keyof typeof expectedError
    >
  ).forEach((key) => {
    expect(thrownError?.[key]).toEqual(expectedError[key]);
  });
}

export function expectToThrowFuelError<
  Fn extends () => unknown,
  R extends Promise<void> | void = ReturnType<Fn> extends Promise<unknown> ? Promise<void> : void
>(lambda: Fn, expectedError: Parameters<typeof assertExpectations>[1]): R {
  if (isAsyncFunction(lambda)) {
    const promise = lambda() as Promise<void>;
    // @ts-expect-error TS ain't smart enough to figure out that R is indeed Promise<void>
    return promise.then(
      () => {
        throw new Error("Passed-in lambda didn't throw.");
      },
      (e) => {
        assertExpectations(e as FuelError, expectedError);
      }
    );
  }
  try {
    lambda();
  } catch (e: unknown) {
    assertExpectations(e as FuelError, expectedError);
    // @ts-expect-error TS isn't happy here even though it is void/undefined...
    // eslint-disable-next-line consistent-return
    return;
  }

  throw new Error("Passed-in lambda didn't throw.");
}
