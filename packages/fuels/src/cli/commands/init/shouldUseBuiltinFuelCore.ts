import { getSystemFuelCore } from '@fuel-ts/versions/cli';

import { warn } from '../../utils/logger';

import { makeWarnMessage } from './messages';

export const shouldUseBuiltinFuelCore = () => {
  // first, tries use system binary
  const { systemFuelCoreVersion } = getSystemFuelCore();
  if (systemFuelCoreVersion !== null) {
    return false;
  }

  // if its not found, prints warning message and use built-in binary
  warn(makeWarnMessage('fuel-core'));
  return true;
};
