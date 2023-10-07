import { getSystemFuelCore } from '@fuel-ts/versions/cli';
import { prompt } from 'prompts';

import { error, warn } from '../../utils/logger';

import { makeErrorMessage, makeWarnMessage } from './messages';

export const shouldUseBuiltinFuelCore = async (useBuiltinFuelCore?: boolean) => {
  if (useBuiltinFuelCore !== undefined) {
    return useBuiltinFuelCore;
  }

  const { systemFuelCoreVersion } = getSystemFuelCore();

  if (systemFuelCoreVersion !== null) {
    return false;
  }

  const answer = await prompt({
    type: 'confirm',
    name: 'useBuiltinFuelCore',
    message: "Can't find `fuel-core`. Use built-in executable?",
  });

  if (answer.useBuiltinFuelCore) {
    warn(makeWarnMessage('fuel-core'));
    return true;
  }

  error(makeErrorMessage());
  throw new Error(makeErrorMessage());
};
