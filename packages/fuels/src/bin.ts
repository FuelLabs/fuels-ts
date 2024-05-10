#!/usr/bin/env node
import { error } from './cli/utils/logger';
import { run } from './run';

try {
  run(process.argv).catch(process.stderr.write);
} catch (err: unknown) {
  error((err as Error)?.message || err);
  process.exit(1);
}
