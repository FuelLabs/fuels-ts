import { ContractFactory, Provider, Wallet, hexlify } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import {
  ConfigurablePin as TypegenPredicate,
  ConfigurablePinLoader as TypegenPredicateLoader,
} from '../../../test/typegen';

/**
 * @group browser
 * @group node
 */
describe('Deploying Predicates', () => {
  it('deploys a predicate via loader and calls', async () => {
    using launched = await launchTestNode();

    const {
      provider: testProvider,
      wallets: [testWallet, receiver],
    } = launched;

    const recieverInitialBalance = await receiver.getBalance();

    const providerUrl = testProvider.url;
    const WALLET_PVT_KEY = hexlify(testWallet.privateKey);

    const factory = new ContractFactory(
      TypegenPredicate.bytecode,
      TypegenPredicate.abi,
      testWallet
    );
    const { waitForResult: waitForDeploy } = await factory.deployAsBlobTxForScript();
    await waitForDeploy();

    // #region deploying-predicates
    // #import { Provider, Wallet};
    // #context import { WALLET_PVT_KEY } from 'path/to/my/env/file';
    // #context import { TypegenPredicateLoader } from 'path/to/typegen/outputs';

    const provider = await Provider.create(providerUrl);
    const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
    const baseAssetId = provider.getBaseAssetId();

    // First, we will need to instantiate the script via it's loader bytecode.
    // This can be imported from the typegen outputs that were created on `fuels deploy`.
    // Then we can use the predicate as we would normally, such as overriding the configurables.
    const predicate = new TypegenPredicateLoader({
      data: [23],
      provider,
      configurableConstants: {
        PIN: 23,
      },
    });

    // Now, let's fund the predicate
    const fundTx = await wallet.transfer(predicate.address, 100_000, baseAssetId);
    await fundTx.waitForResult();

    // Then we'll execute the transfer and validate the predicate
    const transferTx = await predicate.transfer(receiver.address, 1000, baseAssetId);
    const { gasUsed } = await transferTx.waitForResult();
    // #endregion deploying-predicates

    const anotherPredicate = new TypegenPredicate({
      data: [23],
      provider,
      configurableConstants: {
        PIN: 23,
      },
    });

    const anotherFundTx = await wallet.transfer(anotherPredicate.address, 100_000);
    await anotherFundTx.waitForResult();

    const anotherTransferTx = await anotherPredicate.transfer(receiver.address, 1000);
    const { gasUsed: anotherGasUsed } = await anotherTransferTx.waitForResult();

    expect(recieverInitialBalance.toNumber()).toBeLessThan(
      (await receiver.getBalance()).toNumber()
    );
    expect(gasUsed.toNumber()).toBeLessThanOrEqual(anotherGasUsed.toNumber());
  });
});
