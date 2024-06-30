import { fuels, TESTNET_NETWORK_URL } from 'fuels/api';

const MY_WALLET_ADDRESS = '0x767caf5b08eba21c561078a4d5be09bbd7f16b9eca22699a61f1edd9e456126f';

const { wallet } = await fuels(TESTNET_NETWORK_URL);

const balances = await wallet(MY_WALLET_ADDRESS).getBalances();

console.log({ balances });
