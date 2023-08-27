export const resolveEnvAppropriateModules = async () => {
  if (globalThis.document) {
    return import('../src/index.browser');
  }
  return import('../src/index');
};
