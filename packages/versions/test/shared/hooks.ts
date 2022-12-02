export function afterEach() {
  jest.restoreAllMocks();
}

export function beforeEach() {
  jest.resetModules();
  jest.clearAllMocks();
}

export const hooks = {
  afterEach,
  beforeEach,
};
