import { launchTestNode, TestMessage } from 'fuels/test-utils';

using node = await launchTestNode({ walletsConfig: { count: 5, messages: [new TestMessage()] } });

const LOCAL_NETWORK_URL = node.provider.url;

const [w1, w2, w3, w4, w5] = node.wallets;

const WALLET_ADDRESS = w1.address;
const WALLET_PVT_KEY = w1.privateKey;

const WALLET_ADDRESS_2 = w2.address;
const WALLET_PVT_KEY_2 = w2.privateKey;

const WALLET_ADDRESS_3 = w3.address;
const WALLET_PVT_KEY_3 = w3.privateKey;

const WALLET_ADDRESS_4 = w4.address;
const WALLET_PVT_KEY_4 = w4.privateKey;

const WALLET_ADDRESS_5 = w5.address;
const WALLET_PVT_KEY_5 = w5.privateKey;

const all = [
  LOCAL_NETWORK_URL,
  WALLET_ADDRESS,
  WALLET_PVT_KEY,
  WALLET_ADDRESS_2,
  WALLET_PVT_KEY_2,
  WALLET_ADDRESS_3,
  WALLET_PVT_KEY_3,
  WALLET_ADDRESS_4,
  WALLET_PVT_KEY_4,
  WALLET_ADDRESS_5,
  WALLET_PVT_KEY_5,
];

console.assert(
  all.every((x) => !!x),
  `All constants should be truthy.`
);
