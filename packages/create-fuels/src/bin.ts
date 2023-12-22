#!/usr/bin/env node
import { runScaffoldCli } from './cli';

runScaffoldCli()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
