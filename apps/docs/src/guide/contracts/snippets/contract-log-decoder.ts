// #region full
import { Provider, Wallet, bn } from 'fuels';

import { WALLET_PVT_KEY, LOCAL_NETWORK_URL } from '../../../env';
import { LogStructFactory } from '../../../typegend';
import type { MyStructOutput } from '../../../typegend/scripts/CallTestScript';

const provider = new Provider(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const ContractFactory = await LogStructFactory.deploy(wallet);
const { contract } = await ContractFactory.waitForResult();
const input: MyStructOutput = {
  arg_one: true,
  arg_two: bn(100),
};
const { waitForResult } = await contract.functions.log_struct(input).call();
const {
  transactionResult: { receipts },
} = await waitForResult();

const logs = contract
  .logDecoder()
  .decodeLogsByType<MyStructOutput>(receipts, 'MyStruct');
// logs: [{ data: 'MyStruct { arg_one: true, arg_two: 100 }' }]
// #endregion full

console.log('arg_one', logs[0].data?.arg_one === input.arg_one);
console.log('arg_two', logs[0].data?.arg_two.toHex() === input.arg_two.toHex());
