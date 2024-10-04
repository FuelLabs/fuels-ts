import { configureCli } from './cli';
import { checkForAndDisplayUpdates } from './cli/utils/checkForAndDisplayUpdates';
import { error } from './cli/utils/logger';

export const run = async (argv: string[]) => {
  const program = configureCli();
  return Promise.all([await checkForAndDisplayUpdates().catch(error), program.parseAsync(argv)]);
};
