import { Address, bn, OutputType, Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { CounterFactory } from '../../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);

const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const baseAssetId = await provider.getBaseAssetId();
const { waitForResult } = await new CounterFactory(wallet).deploy();
const { contract } = await waitForResult();

// #region pre-confirmation-contract-call-1
const { waitForPreConfirmation } = await contract.functions
  .increment_count(1)
  .call();

const {
  transactionResult: { resolvedOutputs, isStatusPreConfirmationSuccess },
} = await waitForPreConfirmation();

// Find the change output for the base asset id
if (isStatusPreConfirmationSuccess) {
  const resolvedChangeOutput = resolvedOutputs?.find(
    (resolved) =>
      resolved.output.type === OutputType.Change &&
      resolved.output.assetId === baseAssetId
  );

  if (resolvedChangeOutput) {
    const { output, utxoId } = resolvedChangeOutput;

    // Executing the contract call again
    const request = await contract.functions
      .increment_count(1)
      .txParams({
        maxFee: 100_000,
        gasLimit: 100_000,
      })
      .getTransactionRequest();

    request.addResource({
      id: utxoId,
      assetId: output.assetId,
      amount: output.amount,
      owner: new Address(output.to),
      blockCreated: bn(0),
      txCreatedIdx: bn(0),
    });

    await wallet.sendTransaction(request);
  }
}
// #endregion pre-confirmation-contract-call-1

console.log('isPreConfirmationStatusSuccess', isStatusPreConfirmationSuccess);
