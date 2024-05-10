import { configureCli } from './cli';

export const run = async (argv: string[]) => {
  const program = configureCli();
  return program.parseAsync(argv);
};
