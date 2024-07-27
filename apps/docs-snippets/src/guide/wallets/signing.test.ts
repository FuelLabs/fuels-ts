import {
  Address,
  FUEL_NETWORK_URL,
  Provider,
  ScriptTransactionRequest,
  Signer,
  WalletUnlocked,
  hashMessage,
} from 'fuels';
import { seedTestWallet } from 'fuels/test-utils';

/**
 * @group node
 */
describe(__filename, () => {
  let provider: Provider;
  let baseAssetId: string;

  beforeAll(async () => {
    provider = await Provider.create(FUEL_NETWORK_URL);
    baseAssetId = provider.getBaseAssetId();
  });

  it('should sign a message using wallet instance', async () => {
    // #region signing-1
    // #import { WalletUnlocked, hashMessage, Signer };

    const wallet = WalletUnlocked.generate({ provider });

    const message = 'my-message';
    const signedMessage = await wallet.signMessage(message);
    // Example output: 0x277e1461cbb2e6a3250fa8c490221595efb3f4d66d43a4618d1013ca61ca56ba

    const hashedMessage = hashMessage(message);
    // Example output: 0x40436501b686546b7c660bb18791ac2ae35e77fbe2ac977fc061922b9ec83766

    const recoveredAddress = Signer.recoverAddress(hashedMessage, signedMessage);
    // Example output: Address {
    //   bech32Address: 'fuel1za0wl90u09c6v88faqkvczu9r927kewvvr0asejv5xmdwtm98w0st7m2s3'
    // }
    // #endregion signing-1

    expect(wallet.address).toEqual(recoveredAddress);
  });

  it('should sign a transaction using wallet instance [DETAILED]', async () => {
    const wallet = WalletUnlocked.generate({ provider });
    await seedTestWallet(wallet, [[100_000, baseAssetId]]);

    // #region signing-2
    const request = new ScriptTransactionRequest({
      gasLimit: 10000,
    });

    request.addCoinOutput(Address.fromRandom(), 1000, baseAssetId);

    const txCost = await wallet.getTransactionCost(request);

    request.gasLimit = txCost.gasUsed;
    request.maxFee = txCost.maxFee;

    await wallet.fund(request, txCost);

    const signedTransaction = await wallet.signTransaction(request);
    const transactionId = request.getTransactionId(provider.getChainId());

    const recoveredAddress = Signer.recoverAddress(transactionId, signedTransaction);

    request.updateWitnessByOwner(recoveredAddress, signedTransaction);

    const tx = await provider.sendTransaction(request);
    const result = await tx.waitForResult();
    // #endregion signing-2

    expect(result.isStatusSuccess).toBeTruthy();
  });

  it('should sign a transaction using wallet instance [SIMPLIFIED]', async () => {
    const wallet = WalletUnlocked.generate({ provider });
    await seedTestWallet(wallet, [[100_000, baseAssetId]]);

    const request = new ScriptTransactionRequest({
      gasLimit: 10000,
    });

    request.addCoinOutput(Address.fromRandom(), 1000, baseAssetId);

    const txCost = await wallet.getTransactionCost(request);

    request.gasLimit = txCost.gasUsed;
    request.maxFee = txCost.maxFee;

    // #region signing-3
    await wallet.fund(request, txCost);

    const tx = await wallet.sendTransaction(request);
    const result = await tx.waitForResult();
    // #endregion signing-3

    expect(result.isStatusSuccess).toBeTruthy();
  });
});
