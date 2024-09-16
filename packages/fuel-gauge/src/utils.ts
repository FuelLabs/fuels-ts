import { calcRoot, constructTree, getProof } from '@fuel-ts/merkle';
import { arrayify, chunkAndPadBytes, hexlify } from '@fuel-ts/utils';
import type { DeployContractConfig } from 'fuels/test-utils';
import { launchTestNode } from 'fuels/test-utils';

import { STATE_TRANSITION_WASM_BYTECODE } from '../test/fixtures/chain-config';

export async function launchTestContract<T extends DeployContractConfig>(config: T) {
  const {
    contracts: [contract],
    cleanup,
  } = await launchTestNode({
    contractsConfigs: [config],
  });
  return Object.assign(contract, {
    [Symbol.dispose]: cleanup,
  });
}

export function subsectionFromBytecode() {
  const subsectionSize = 192 * 1024;
  const subsectionsChunk = chunkAndPadBytes(
    arrayify(STATE_TRANSITION_WASM_BYTECODE),
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
