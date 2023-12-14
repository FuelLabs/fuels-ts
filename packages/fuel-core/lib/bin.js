#!/usr/bin/env node

import { spawn } from 'child_process';

// eslint-disable-next-line import/extensions
import binPath from './index.js';

const args = process.argv.slice(2);
spawn(binPath, args, { stdio: 'inherit' }).on('exit', process.exit);
