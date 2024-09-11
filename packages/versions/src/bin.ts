import { runVersions } from './cli';

runVersions()
  .then(() => process.exit(0))
  .catch(() => {
    process.exit(1);
  });
