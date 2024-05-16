#!/usr/bin/env node
import { error } from 'console';

import { runVersions } from './cli';

(async () => {
  await runVersions();
})().catch((e) => {
  error(e);
  process.exit(1);
});
