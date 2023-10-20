import { getSystemForc } from '@fuel-ts/versions/cli';

import { warn } from '../../utils/logger';

import { makeWarnMessage } from './messages';

export const shouldUseBuiltinForc = () => {
  // first, tries to use system binary
  const { systemForcVersion } = getSystemForc();
  if (systemForcVersion !== null) {
    return false;
  }

  // if its not found, prints warning message and use built-in binary
  warn(makeWarnMessage('forc'));
  return true;
};
