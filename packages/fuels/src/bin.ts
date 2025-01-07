import { error } from './cli/utils/logger';
import { run } from './run';

try {
  // eslint-disable-next-line no-void
  void run(process.argv);
} catch (err: unknown) {
  error((err as Error)?.message || err);
  process.exit(1);
}
