import { calcRoot, constructTree, getProof } from '@fuel-ts/merkle';
import { arrayify, chunkAndPadBytes, hexlify } from '@fuel-ts/utils';
import type { DeployContractConfig, LaunchTestNodeOptions } from 'fuels/test-utils';
import { launchTestNode } from 'fuels/test-utils';

import { STATE_TRANSITION_BYTECODE } from '../test/fixtures/chain-config/state_transition_bytecode';

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
  const subsectionSize = 90 * 1024;
  const subsectionsChunk = chunkAndPadBytes(
    arrayify(STATE_TRANSITION_BYTECODE),
    subsectionSize
  ).map(hexlify);

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
