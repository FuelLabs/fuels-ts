import { getSystemForc } from '@fuel-ts/versions/cli';

export const shouldUseBuiltinForc = () => {
  // first, tries to use system binary
  const { systemForcVersion } = getSystemForc();
  if (systemForcVersion !== null) {
    return false;
  }

  // if its not found, will default to the built-in binary
  return true;
};
