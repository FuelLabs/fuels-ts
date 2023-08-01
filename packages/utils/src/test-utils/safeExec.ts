export const safeExec = async <TResult = unknown, TError extends Error = Error>(
  lambda: () => TResult
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
