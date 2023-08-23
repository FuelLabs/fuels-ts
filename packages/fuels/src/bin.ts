#!/usr/bin/env node
import { run } from './cli';
import { error } from './workflow/utils/logger';

try {
  run(process.argv);
} catch (err: unknown) {
  error((err as Error)?.message || err);
  process.exit(1);
}
