#!/usr/bin/env node
import { run } from './cli';

run(process.argv).catch(() => {
  process.exit(1);
});
