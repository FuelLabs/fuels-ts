import { configureCli } from './cli';
import { checkForAndDisplayUpdates } from './cli/utils/checkForAndDisplayUpdates';
import { error } from './cli/utils/logger';

export const run = async (argv: string[]) => {
  await checkForAndDisplayUpdates().catch(error);
  const program = configureCli();
  return program.parseAsync(argv);
};
