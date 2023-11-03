import { WalletConfig, defaultChainConfig } from '@fuel-ts/test-utils';
import { execSync } from 'child_process';
import { randomUUID } from 'crypto';
import fs from 'fs';
import os from 'os';
import path from 'path';

const tempDirPath = path.join(os.tmpdir(), '.fuels-ts', randomUUID());
export function setup() {
  process.env.TEST_NODE_COUNT = '1';
  console.log('running setup');
  if (!fs.existsSync(tempDirPath)) {
    fs.mkdirSync(tempDirPath, { recursive: true });
  }

  const chainConfigPath = path.join(tempDirPath, 'chainConfig.json');

  const customChainConfig = new WalletConfig().apply(defaultChainConfig);
  // console.log(chainConfigPath);
  // Write a temporary chain configuration file.
  fs.writeFileSync(chainConfigPath, JSON.stringify(customChainConfig));
  // console.log(execSync(`ls ${tempDirPath}`).toString());

  process.env.TEST_CHAIN_CONFIG_PATH = chainConfigPath;

  const scriptFilePath = path.join(tempDirPath, 'script.sh');
  // console.log(scriptFilePath);

  const command = `#!/usr/bin/env bash
(for i in $(seq $1); do
    ./node_modules/.bin/fuels-core run --ip 127.0.0.1 --port 0 --db-type in-memory --consensus-key 0xa449b1ffee0e2205fa924c6740cc48b3b473aa28587df6dab12abc245d1f5298 --chain ${chainConfigPath} &
    # fuel-core run --ip 127.0.0.1 --port 0 --db-type in-memory --consensus-key 0xa449b1ffee0e2205fa924c6740cc48b3b473aa28587df6dab12abc245d1f5298 --chain ${chainConfigPath} &
    echo $! &
done)
  `;
  fs.writeFileSync(scriptFilePath, command);
  execSync(`chmod +x ${scriptFilePath}`);
  process.env.TEST_SCRIPT_PATH = scriptFilePath;
  // console.log('finished setup');

  // console.log(execSync(`ls ${tempDirPath}`).toString());
}

export function teardown() {
  console.log('running teardown');

  // console.log('we need this many nodes:', process.env.TEST_NODE_COUNT);
  // execSync(`rm -rf ${tempDirPath}`);
  // console.log(execSync('sleep 5s; ps -A | grep fuel-core').toString());
}
