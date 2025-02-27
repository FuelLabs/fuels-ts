import { error } from './cli/utils/logger';
import { run } from './run';

run(process.argv).catch((err) => {
  error((err as Error)?.message || err);
  process.exit(1);
});
