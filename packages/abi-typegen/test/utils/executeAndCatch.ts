export const executeAndCatch = async <T>(lambda: () => unknown) => {
  let error: Error | undefined;
  let result: T | undefined;

  try {
    result = (await lambda()) as T;
  } catch (_error) {
    error = _error as unknown as Error;
  }

  return { error, result };
};
