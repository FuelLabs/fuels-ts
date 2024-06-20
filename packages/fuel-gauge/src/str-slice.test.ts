import { generateTestWallet } from '@fuel-ts/account/test-utils';
import type { WalletUnlocked } from 'fuels';
import { Wallet, bn, Provider, FUEL_NETWORK_URL } from 'fuels';

import type { PredicateStrSliceAbiInputs } from '../test/typegen';
import {
  PredicateStrSliceAbi__factory,
  ScriptStrSliceAbi__factory,
  StrSliceAbi__factory,
} from '../test/typegen';
import contractBytes from '../test/typegen/contracts/StrSliceAbi.hex';

/**
 * @group node
 */
describe('str slice', () => {
  let provider: Provider;
  let baseAssetId: string;
  let sender: WalletUnlocked;

  beforeAll(async () => {
    provider = await Provider.create(FUEL_NETWORK_URL);
    baseAssetId = provider.getBaseAssetId();
    sender = await generateTestWallet(provider, [[500_000, baseAssetId]]);
  });

  it('echoes a str slice [CONTRACT]', async () => {
    const contract = await StrSliceAbi__factory.deployContract(contractBytes, sender);
    const input = 'contract-input';
    const output = 'contract-return';
    const { value } = await contract.functions.echoes_str_slice(input).call();
    expect(value).toEqual(output);
  });

  it('validates a str slice [PREDICATE]', async () => {
    const receiver = Wallet.generate({ provider });
    const input: PredicateStrSliceAbiInputs = ['predicate-input'];
    const predicate = PredicateStrSliceAbi__factory.createInstance(provider, input);

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
    const script = await ScriptStrSliceAbi__factory.createInstance(sender);
    const input = 'script-input';
    const output = 'script-return';
    const { value } = await script.functions.main(input).call();
    expect(value).toEqual(output);
  });
});
