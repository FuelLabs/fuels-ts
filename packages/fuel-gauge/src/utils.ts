import { readFileSync } from 'fs';
import { Script } from 'fuels';
import type { Interface, WalletUnlocked, JsonAbi, BytesLike } from 'fuels';
import type { DeployContractConfig } from 'fuels/test-utils';
import { launchTestNode } from 'fuels/test-utils';
import { join } from 'path';

export type SetupConfig = {
  contractBytecode: BytesLike;
  abi: JsonAbi | Interface;
  cache?: boolean;
};

const getFullPath = <T>(contractName: string, next: (fullPath: string) => T) =>
  next(
    join(__dirname, `../test/fixtures/forc-projects/${contractName}/out/release/${contractName}`)
  );

export const getScript = <TInput extends unknown[], TOutput>(
  scriptName: string,
  wallet: WalletUnlocked
): Script<TInput, TOutput> =>
  getFullPath(
    scriptName,
    (fullPath: string) =>
      new Script(
        readFileSync(`${fullPath}.bin`),
        JSON.parse(readFileSync(`${fullPath}-abi.json`, 'utf8')),
        wallet
      )
  );

export const getProgramDir = (name: string) =>
  join(__dirname, `../test/fixtures/forc-projects/${name}`);

export async function launchTestContract<T extends DeployContractConfig>(config: T) {
  const {
    contracts: [contract],
    cleanup,
  } = await launchTestNode({
    contractsConfigs: [config],
  });
  return Object.assign(contract, {
    [Symbol.dispose]: () => Promise.resolve(cleanup()),
  });
}
