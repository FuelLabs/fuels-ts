#!/usr/bin/env node
import { run } from './cli';

run({
  argv: process.argv,
  programName: 'fuels-typegen',
});
