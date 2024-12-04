import { calcRoot, constructTree, getProof } from '@fuel-ts/merkle';
import { chunkAndPadBytes, hexlify } from '@fuel-ts/utils';
import { readFileSync } from 'fs';
import type { DeployContractConfig, LaunchTestNodeOptions } from 'fuels/test-utils';
import { launchTestNode } from 'fuels/test-utils';

export async function launchTestContract<T extends DeployContractConfig>(
  config: T,
  { nodeOptions }: Pick<LaunchTestNodeOptions<[T]>, 'nodeOptions'> = {}
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
