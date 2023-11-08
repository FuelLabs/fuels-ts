import { WalletConfig } from '@fuel-ts/test-utils';
import { randomUUID } from 'crypto';
import { existsSync, mkdirSync, readFileSync } from 'fs';
import { writeFile } from 'fs/promises';
import os from 'os';
import path from 'path';

export async function setup() {
  console.log('running setup');

  process.env.DEFAULT_CHAIN_CONFIG_PATH = path.join(
    __dirname,
    '.fuel-core',
    'configs',
    'chainConfig.json'
  );
  const defaultChainConfig = JSON.parse(
    readFileSync(process.env.DEFAULT_CHAIN_CONFIG_PATH, 'utf-8')
  );

  const chainConfig = new WalletConfig().apply(defaultChainConfig);
  const tempDirPath = path.join(os.tmpdir(), '.fuels-ts', randomUUID());
  if (!existsSync(tempDirPath)) {
    mkdirSync(tempDirPath, { recursive: true });
  }
  const chainConfigPath = path.join(tempDirPath, '.chainConfig.json');
  // Write a temporary chain configuration file.
  await writeFile(chainConfigPath, JSON.stringify(chainConfig), 'utf-8');
  process.env.TEST_CHAIN_CONFIG_PATH = chainConfigPath;

  //   if (!fs.existsSync(tempDirPath)) {
  //     fs.mkdirSync(tempDirPath, { recursive: true });
  //   }

  //   const defaultChainConfig = JSON.parse(
  //     readFileSync('.fuel-core/configs/chainConfig.json', 'utf-8')
  //   );

  //   const chainConfigPath = path.join(tempDirPath, 'chainConfig.json');

  //   const customChainConfig = new WalletConfig().apply(defaultChainConfig);
  //   // console.log(chainConfigPath);
  //   // Write a temporary chain configuration file.
  //   fs.writeFileSync(chainConfigPath, JSON.stringify(customChainConfig));
  //   // console.log(execSync(`ls ${tempDirPath}`).toString());

  //   process.env.TEST_CHAIN_CONFIG_PATH = chainConfigPath;

  //   const scriptFilePath = path.join(tempDirPath, 'script.sh');
  //   // console.log(scriptFilePath);

  //   const command = `#!/usr/bin/env bash

  // (for i in $(seq $1); do
  //     # ./node_modules/.bin/fuels-core run --ip 127.0.0.1 --port 0 --db-type in-memory --consensus-key 0xa449b1ffee0e2205fa924c6740cc48b3b473aa28587df6dab12abc245d1f5298 --chain ${chainConfigPath} &
  //     # ~/.fuelup/bin/fuel-core run --ip 127.0.0.1 --port 0 --db-type in-memory --consensus-key 0xa449b1ffee0e2205fa924c6740cc48b3b473aa28587df6dab12abc245d1f5298 --chain ${chainConfigPath} &

  //     ~/.fuelup/bin/fuel-core run \
  //     --ip 127.0.0.1 \
  //     --port 0 \
  //     --db-type in-memory \
  //     --consensus-key 0xa449b1ffee0e2205fa924c6740cc48b3b473aa28587df6dab12abc245d1f5298 \
  //     --chain ${chainConfigPath} \
  //     --poa-instant true \
  //     --min-gas-price 1 \
  //     --vm-backtrace \
  //     --utxo-validation \
  //     --manual_blocks_enabled &
  //     echo $! &
  // done)
  //   `;
  //   fs.writeFileSync(scriptFilePath, command);
  //   execSync(`chmod +x ${scriptFilePath}`);
  //   process.env.TEST_SCRIPT_PATH = scriptFilePath;
  // console.log('finished setup');

  // console.log(execSync(`ls ${tempDirPath}`).toString());
}

export function teardown() {
  console.log('running teardown');

  // console.log('we need this many nodes:', process.env.TEST_NODE_COUNT);
  // execSync(`rm -rf ${tempDirPath}`);
}
