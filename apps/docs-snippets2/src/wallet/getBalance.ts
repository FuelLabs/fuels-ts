import { fuels, NETWORK_URL } from 'fuels/api';

const { wallet } = await fuels(NETWORK_URL);
const balances = await wallet('0x..').getBalances();

console.log({ balances });
