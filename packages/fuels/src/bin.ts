import { error } from './cli/utils/logger';
import { run } from './run';

try {
  run(process.argv).catch((x) => {
    // eslint-disable-next-line no-console
    console.log(x);
  });
} catch (err: unknown) {
  error((err as Error)?.message || err);
  process.exit(1);
}
