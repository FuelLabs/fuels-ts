import { hexlify, randomBytes } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

/**
 * Using typegen for type hinted function imports
 */
import { NFTContractAbi__factory } from '../test/typegen';
import type { IdentityInput } from '../test/typegen/contracts/NFTContractAbi';
import contractBytes from '../test/typegen/contracts/NFTContractAbi.hex';

/**
 * @group node
 */
describe('NFT contract', () => {
  it('mints', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          deployer: NFTContractAbi__factory,
          bytecode: contractBytes,
        },
      ],
    });
    const {
      contracts: [contract],
    } = launched;

    const amount = 1;
    const subId = '0x2000000000000000000000000000000000000000000000000000000000000000';
    /**
     * Using the `IdentityInput` type from typegen to assist with the identity function param
     */
    const identity: IdentityInput = { Address: { bits: hexlify(randomBytes(32)) } };
    const { transactionResult } = await contract.functions.mint(identity, subId, amount).call();
    expect(transactionResult.isStatusSuccess).toBe(true);
  });
});
