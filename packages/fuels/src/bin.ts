#!/usr/bin/env node
import { run } from './run';
import { error } from './cli/utils/logger';

try {
  run(process.argv).catch(process.stderr.write);
} catch (err: unknown) {
  error((err as Error)?.message || err);
  process.exit(1);
}
