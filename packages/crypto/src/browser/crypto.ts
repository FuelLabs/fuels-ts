import { ErrorCode, FuelError } from '@fuel-ts/errors';

const { crypto, btoa } = globalThis;

if (!crypto) {
  throw new FuelError(
    ErrorCode.ENV_DEPENDENCY_MISSING,
    `Could not find 'crypto' in current browser environment.`
  );
}

if (!crypto.randomUUID) {
  throw new FuelError(
    ErrorCode.ENV_DEPENDENCY_MISSING,
    `Could not find 'crypto.randomUUID' in current browser environment.`
  );
}

if (!crypto.subtle) {
  throw new FuelError(
    ErrorCode.ENV_DEPENDENCY_MISSING,
    `Could not find 'crypto.subtle' in current browser environment.`
  );
}

if (!crypto.getRandomValues) {
  throw new FuelError(
    ErrorCode.ENV_DEPENDENCY_MISSING,
    `Could not find 'crypto.getRandomValues' in current browser environment.`
  );
}

if (!btoa) {
  throw new FuelError(
    ErrorCode.ENV_DEPENDENCY_MISSING,
    `Could not find 'btoa' in current browser environment.`
  );
}

export { crypto, btoa };
