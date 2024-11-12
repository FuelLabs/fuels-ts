/* eslint-disable import/first */
/* eslint-disable import/order */
import {
  StorageTestContractFactory,
  StorageTestContract,
} from '../../typegend';

const { storageSlots, abi } = StorageTestContract;
const { bytecode } = StorageTestContractFactory;

// #region full
// #context import storageSlots from '../your-sway-project/out/debug/your-sway-project-storage_slots.json';
import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../env';
import { ContractFactory, Provider, toHex, Wallet } from 'fuels';

const provider = await Provider.create(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const factory = new ContractFactory(bytecode, abi, wallet);

const { waitForResult } = await factory.deploy({
  storageSlots,
});

const { contract } = await waitForResult();
// #endregion full

const call1 = await contract.functions.initialize_counter(1300).call();
const { value: initializeResult } = await call1.waitForResult();
console.log('call1', initializeResult.toHex() === toHex(1300));

const call2 = await contract.functions.increment_counter(37).call();
const { value: incrementResult } = await call2.waitForResult();
console.log('call2', incrementResult.toHex() === toHex(1337));

const { value: count } = await contract.functions.counter().simulate();
console.log('count', count.toHex() === toHex(1337));
