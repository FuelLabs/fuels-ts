import { BaseAssetId } from '@fuel-ts/address/configs';
import { toHex } from '@fuel-ts/math';
import { Provider } from '@fuel-ts/providers';
import { Signer } from '@fuel-ts/signer';
import type { ChildProcessWithoutNullStreams } from 'child_process';
import { spawn } from 'child_process';
import { randomUUID } from 'crypto';
import { hexlify } from 'ethers';
import fsSync from 'fs';
import os from 'os';
import path from 'path';
import { getPortPromise } from 'portfinder';
import treeKill from 'tree-kill';

import type { WalletUnlocked } from '../wallets';

import { defaultChainConfig } from './defaultChainConfig';
import { generateTestWallet } from './generateTestWallet';

const defaultFuelCoreArgs = ['--vm-backtrace', '--utxo-validation'];

type LaunchNodeOptions = {
  chainConfigPath?: string;
  consensusKey?: string;
  ip?: string;
  port?: string;
  args?: string[];
  useSystemFuelCore?: boolean;
};

export type LaunchNodeResult = Promise<{
  cleanup: () => void;
  ip: string;
  port: string;
}>;

export type KillNodeParams = {
  child: ChildProcessWithoutNullStreams;
  configPath: string;
  killFn: (pid: number) => void;
  state: {
    isDead: boolean;
  };
};

export const killNode = (params: KillNodeParams) => {
  const { child, configPath, state, killFn } = params;
  if (!state.isDead) {
    if (child.pid) {
      state.isDead = true;
      killFn(Number(child.pid));
    }

    // Remove all the listeners we've added.
    child.stdout.removeAllListeners();
    child.stderr.removeAllListeners();

    // Remove the temporary folder and all its contents.
    if (fsSync.existsSync(configPath)) {
      fsSync.rmSync(configPath, { recursive: true });
    }
  }
};

// #region launchNode-launchNodeOptions
/**
 * Launches a fuel-core node.
 * @param chainConfigPath - path to the chain configuration file.
 * @param consensusKey - the consensus key to use.
 * @param ip - the ip to bind to. (optional, defaults to 0.0.0.0)
 * @param port - the port to bind to. (optional, defaults to 4000 or the next available port)
 * @param args - additional arguments to pass to fuel-core.
 * @param useSystemFuelCore - whether to use the system fuel-core binary or the one provided by the \@fuel-ts/fuel-core package.
 * */
// #endregion launchNode-launchNodeOptions
export const launchNode = async ({
  chainConfigPath,
  consensusKey = '0xa449b1ffee0e2205fa924c6740cc48b3b473aa28587df6dab12abc245d1f5298',
  ip,
  port,
  args = defaultFuelCoreArgs,
  useSystemFuelCore = false,
}: LaunchNodeOptions): LaunchNodeResult =>
  // eslint-disable-next-line no-async-promise-executor
  new Promise(async (resolve, reject) => {
    // This string is logged by the client when the node has successfully started. We use it to know when to resolve.
    const graphQLStartSubstring = 'Binding GraphQL provider to';

    const command = useSystemFuelCore ? 'fuel-core' : './node_modules/.bin/fuels-core';

    const ipToUse = ip || '0.0.0.0';

    const portToUse =
      port ||
      (
        await getPortPromise({
          port: 4000, // tries 4000 first, then 4001, then 4002, etc.
          stopPort: 5000, // don't try ports above 5000
        })
      ).toString();

    let chainConfigPathToUse = chainConfigPath;

    const tempDirPath = path.join(os.tmpdir(), '.fuels-ts', randomUUID());

    if (!chainConfigPath) {
      if (!fsSync.existsSync(tempDirPath)) {
        fsSync.mkdirSync(tempDirPath, { recursive: true });
      }
      const tempChainConfigFilePath = path.join(tempDirPath, '.chainConfig.json');

      let chainConfig = defaultChainConfig;

      // If there's no genesis key, generate one and some coins to the genesis block.
      if (!process.env.GENESIS_SECRET) {
        const pk = Signer.generatePrivateKey();
        const signer = new Signer(pk);
        process.env.GENESIS_SECRET = hexlify(pk);

        chainConfig = {
          ...defaultChainConfig,
          initial_state: {
            ...defaultChainConfig.initial_state,
            coins: [
              ...defaultChainConfig.initial_state.coins,
              {
                owner: signer.address.toHexString(),
                amount: toHex(1_000_000_000),
                asset_id: BaseAssetId,
              },
            ],
          },
        };
      }

      // Write a temporary chain configuration file.
      fsSync.writeFileSync(tempChainConfigFilePath, JSON.stringify(chainConfig), 'utf8');

      chainConfigPathToUse = tempChainConfigFilePath;
    }

    const child = spawn(command, [
      'run',
      '--ip',
      ipToUse,
      '--port',
      portToUse,
      '--db-type',
      'in-memory',
      '--consensus-key',
      consensusKey,
      '--chain',
      chainConfigPathToUse as string,
      ...args,
    ]);

    const cleanupConfig: KillNodeParams = {
      child,
      configPath: tempDirPath,
      killFn: treeKill,
      state: {
        isDead: false,
      },
    };

    child.stderr.setEncoding('utf8');

    // Look for a specific graphql start point in the output.
    child.stderr.on('data', (chunk: string) => {
      // Look for the graphql service start.
      if (chunk.indexOf(graphQLStartSubstring) !== -1) {
        // Resolve with the cleanup method.
        resolve({
          cleanup: () => killNode(cleanupConfig),
          ip: ipToUse,
          port: portToUse,
        });
      }
      if (/error/i.test(chunk)) {
        reject(chunk.toString());
      }
    });

    // Process exit.
    process.on('exit', killNode);

    // Catches ctrl+c event.
    process.on('SIGINT', killNode);

    // Catches "kill pid" (for example: nodemon restart).
    process.on('SIGUSR1', killNode);
    process.on('SIGUSR2', killNode);

    // Catches uncaught exceptions.
    process.on('uncaughtException', killNode);

    child.on('error', reject);
  });

const generateWallets = async (count: number, provider: Provider) => {
  const wallets: WalletUnlocked[] = [];
  for (let i = 0; i < count; i += 1) {
    const wallet = await generateTestWallet(provider, [[1_000, BaseAssetId]]);
    wallets.push(wallet);
  }
  return wallets;
};

export type LaunchNodeAndGetWalletsResult = Promise<{
  wallets: WalletUnlocked[];
  stop: () => void;
  provider: Provider;
}>;

/**
 * Launches a fuel-core node and returns a provider, 10 wallets, and a cleanup function to stop the node.
 * @param launchNodeOptions - options to launch the fuel-core node with.
 * @param walletCount - the number of wallets to generate. (optional, defaults to 10)
 * */
export const launchNodeAndGetWallets = async ({
  launchNodeOptions,
  walletCount = 10,
}: {
  launchNodeOptions?: Partial<LaunchNodeOptions>;
  walletCount?: number;
} = {}): LaunchNodeAndGetWalletsResult => {
  const defaultNodeOptions: LaunchNodeOptions = {
    chainConfigPath: launchNodeOptions?.chainConfigPath,
    consensusKey: launchNodeOptions?.consensusKey,
  };

  const {
    cleanup: closeNode,
    ip,
    port,
  } = await launchNode({ ...defaultNodeOptions, ...launchNodeOptions });

  const provider = await Provider.create(`http://${ip}:${port}/graphql`);
  const wallets = await generateWallets(walletCount, provider);

  const cleanup = () => {
    closeNode();
  };

  return { wallets, stop: cleanup, provider };
};
