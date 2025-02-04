// #region multiple-signers-2
import type { BN } from 'fuels';
import { Script, Provider, Wallet } from 'fuels';

import {
  LOCAL_NETWORK_URL,
  WALLET_PVT_KEY,
  WALLET_PVT_KEY_2,
  WALLET_PVT_KEY_3,
} from '../../../../env';
import { ScriptSigning } from '../../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);
const sender = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const signer = Wallet.fromPrivateKey(WALLET_PVT_KEY_2, provider);
const receiver = Wallet.fromPrivateKey(WALLET_PVT_KEY_3, provider);

const amountToReceiver = 100;

const script = new Script(ScriptSigning.bytecode, ScriptSigning.abi, sender);
const { waitForResult } = await script.functions
  .main(signer.address.toB256())
  .addTransfer({
    destination: receiver.address,
    amount: amountToReceiver,
    assetId: await provider.getBaseAssetId(),
  })
  .addSigners(signer)
  .call<BN>();

const { value } = await waitForResult();
// #endregion multiple-signers-2

console.log('value', value);
