#!/usr/bin/env node

import { spawn } from 'child_process';

// eslint-disable-next-line import/extensions
import binPath from './index.js';

const args = process.argv.slice(2);
console.log('binPath inside fuel-core bin.js', binPath);
spawn(binPath, args, { stdio: 'inherit' }).on('exit', process.exit);
