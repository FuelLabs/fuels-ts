export const executeAndCatch = async <T>(lambda: () => unknown) => {
  let error: unknown | undefined;
  let result: T | undefined;

  try {
    result = (await lambda()) as T;
  } catch (_error) {
    error = _error;
  }

  return { error, result };
};
