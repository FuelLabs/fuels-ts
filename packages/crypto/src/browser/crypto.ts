import { ErrorCode, FuelError } from '@fuel-ts/errors';

const { crypto, btoa } = globalThis;

if (!crypto) {
  throw new FuelError(
    ErrorCode.ENV_DEPENDENCY_MISSING,
    `Could not found 'crypto' in current browser environment`
  );
}

if (!btoa) {
  throw new FuelError(
    ErrorCode.ENV_DEPENDENCY_MISSING,
    `Could not found 'btoa' in current browser environment`
  );
}

export { crypto, btoa };
