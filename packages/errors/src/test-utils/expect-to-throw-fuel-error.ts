import { isAsyncFunction } from 'util/types';

import { ErrorCode, FuelError } from '../index';

const enumValues = Object.values(ErrorCode);

function assertExpectations(
  thrownError: FuelError,
  expectedError: Parameters<typeof expectToThrowFuelError>[1]
) {
  expect(thrownError).toBeInstanceOf(FuelError);

  expect(enumValues).toContain(expectedError.code);

  (Object.keys(expectedError) as Array<keyof typeof expectedError>).forEach((key) => {
    expect(thrownError?.[key]).toEqual(expectedError[key]);
  });
}

export function expectToThrowFuelError<
  LambdaFn extends () => unknown,
  R extends Promise<void> | void = ReturnType<LambdaFn> extends Promise<unknown>
    ? Promise<void>
    : void
>(
  lambda: LambdaFn,
  expectedError: FuelError | (Partial<FuelError> & Required<Pick<FuelError, 'code'>>)
): R {
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
