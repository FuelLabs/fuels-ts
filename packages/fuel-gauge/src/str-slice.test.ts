import { bn } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import type { PredicateStrSliceAbiInputs } from '../test/typegen';
import { PredicateStrSliceAbi, ScriptStrSliceAbi, StrSliceAbi } from '../test/typegen';
import contractBytes from '../test/typegen/contracts/StrSliceAbi.hex';

/**
 * @group node
 * @group browser
 */
describe('str slice', () => {
  it('echoes a str slice [CONTRACT]', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          deployer: StrSliceAbi,
          bytecode: contractBytes,
        },
      ],
    });
    const {
      contracts: [strSliceContract],
    } = launched;

    const input = 'contract-input';
    const output = 'contract-return';
    const { waitForResult } = await strSliceContract.functions.echoes_str_slice(input).call();
    const { value } = await waitForResult();

    expect(value).toEqual(output);
  });

  it('validates a str slice [PREDICATE]', async () => {
    using launched = await launchTestNode();

    const {
      wallets: [sender, receiver],
      provider,
    } = launched;

    const predicateData: PredicateStrSliceAbiInputs = ['predicate-input'];
    const predicate = PredicateStrSliceAbi.createInstance(provider, predicateData);
    const baseAssetId = provider.getBaseAssetId();

    const amountToPredicate = 250_000;
    const amountToReceiver = 50_000;

    const setupTx = await sender.transfer(predicate.address, amountToPredicate, baseAssetId);
    await setupTx.waitForResult();

    const initialReceiverBalance = await receiver.getBalance();

    const tx = await predicate.transfer(receiver.address, amountToReceiver, baseAssetId);
    const { isStatusSuccess } = await tx.waitForResult();
    const finalReceiverBalance = await receiver.getBalance();
    expect(bn(initialReceiverBalance).add(amountToReceiver).toHex()).toEqual(
      finalReceiverBalance.toHex()
    );
    expect(isStatusSuccess).toBe(true);
  });

  it('echoes a str slice [SCRIPT]', async () => {
    using launched = await launchTestNode();

    const {
      wallets: [sender],
    } = launched;

    const script = await ScriptStrSliceAbi.createInstance(sender);
    const input = 'script-input';
    const output = 'script-return';
    const { waitForResult } = await script.functions.main(input).call();
    const { value } = await waitForResult();
    expect(value).toEqual(output);
  });
});
