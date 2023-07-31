import { FuelError } from 'fuels-ts/.history/packages/errors/src/index_20230731034941';

export const safeExec = async <TResult = unknown, TError extends Error = Error>(
  lambda: () => unknown
) => {
  let error: TError | undefined;
  let result: TResult | undefined;

  try {
    result = (await lambda()) as TResult;
  } catch (_error) {
    error = _error as unknown as TError;
  }

  return { error, result };
};
