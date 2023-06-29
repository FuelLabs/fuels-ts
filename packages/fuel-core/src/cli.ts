#!/usr/bin/env node

import { spawn } from 'child_process';

import binPath from '.';

const args = process.argv.slice(2);
spawn(binPath, args, { stdio: 'inherit' }).on('exit', process.exit);
