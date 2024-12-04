import { calcRoot, constructTree, getProof } from '@fuel-ts/merkle';
import type { SnapshotConfigs } from '@fuel-ts/utils';
import { chunkAndPadBytes, hexlify } from '@fuel-ts/utils';
import { readFileSync } from 'fs';
import type { DeployContractConfig, LaunchNodeOptions } from 'fuels/test-utils';
import { launchTestNode } from 'fuels/test-utils';
import type { PartialDeep } from 'type-fest';

export type ExtraLaunchNodeOptions = {
  nodeOptions?: Partial<
    Omit<LaunchNodeOptions, 'snapshotConfig'> & {
      snapshotConfig: PartialDeep<SnapshotConfigs>;
    }
  >;
};

export async function launchTestContract<T extends DeployContractConfig>(
  config: T,
  { nodeOptions }: ExtraLaunchNodeOptions = {}
) {
  const {
    contracts: [contract],
    cleanup,
  } = await launchTestNode({
    contractsConfigs: [config],
    nodeOptions,
  });
  return Object.assign(contract, {
    [Symbol.dispose]: cleanup,
  });
}

export function subsectionFromBytecode() {
  const wasmFileBuffer = readFileSync(
    './packages/fuel-gauge/test/fixtures/chain-config/state_transition_bytecode.wasm'
  );

  const subsectionSize = 90 * 1024;
  const subsectionsChunk = chunkAndPadBytes(wasmFileBuffer, subsectionSize).map(hexlify);

  const merkleTree = constructTree(subsectionsChunk);
  const merkleRoot = calcRoot(subsectionsChunk);

  const subsections = subsectionsChunk.map((subsection, index) => {
    const proofSet = getProof(merkleTree, index);

    return {
      proofSet,
      subsection,
      root: merkleRoot,
      subsectionIndex: index,
      proofSetCount: proofSet.length,
      subsectionsNumber: subsectionsChunk.length,
    };
  });

  return { subsections, merkleRoot };
}
