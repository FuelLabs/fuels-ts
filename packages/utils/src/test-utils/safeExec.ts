export const safeExec = <TResult = unknown, TError extends Error = Error>(
  lambda: () => TResult
) => {
  let error: TError | undefined;
  let result: TResult | undefined;

  try {
    result = lambda();
  } catch (_error: unknown) {
    error = _error as TError;
  }

  return { error, result };
};

export const safeExecAsync = async <TResult = unknown, TError extends Error = Error>(
  lambda: () => Promise<TResult>
) => {
  let error: TError | undefined;
  let result: TResult | undefined;

  try {
    result = await lambda();
  } catch (_error: unknown) {
    error = _error as TError;
  }

  return { error, result };
};
