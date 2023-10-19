import { getSystemForc } from '@fuel-ts/versions/cli';
import { prompt } from 'prompts';

import { error, warn } from '../../utils/logger';

import { makeErrorMessage, makeWarnMessage } from './messages';

export const shouldUseBuiltinForc = async (useBuiltinForc?: boolean) => {
  if (useBuiltinForc !== undefined) {
    return useBuiltinForc;
  }

  const { systemForcVersion } = getSystemForc();

  if (systemForcVersion !== null) {
    return false;
  }

  const answer = await prompt({
    type: 'confirm',
    name: 'useBuiltinForc',
    message: "Can't find `forc`. Use built-in executable?",
  });

  if (answer.useBuiltinForc) {
    warn(makeWarnMessage('forc'));
    return true;
  }

  error(makeErrorMessage());
  throw new Error(makeErrorMessage());
};
