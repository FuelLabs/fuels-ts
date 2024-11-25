// #region script-init
import type { BigNumberish } from 'fuels';
import { arrayify, Provider, ReceiptType, ScriptRequest, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../env';
import { CallTestScript } from '../../../typegend';

const provider = await Provider.create(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const script = new CallTestScript(wallet);

type MyStruct = {
  arg_one: boolean;
  arg_two: BigNumberish;
};

const scriptRequest = new ScriptRequest(
  CallTestScript.bytecode,
  (myStruct: MyStruct) => {
    const encoded = script.interface.functions.main.encodeArguments([myStruct]);

    return arrayify(encoded);
  },
  (scriptResult) => {
    if (scriptResult.returnReceipt.type === ReceiptType.Revert) {
      throw new Error('Reverted');
    }
    if (scriptResult.returnReceipt.type !== ReceiptType.ReturnData) {
      throw new Error('fail');
    }

    const [decodedResult] = script.interface.functions.main.decodeOutput(
      scriptResult.returnReceipt.data
    );
    return decodedResult;
  }
);
// #endregion script-init

console.log('Script request should be defined', scriptRequest);
