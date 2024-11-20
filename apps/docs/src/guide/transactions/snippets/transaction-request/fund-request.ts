import type { Coin, MessageCoin, Resource } from 'fuels';
import { Address, bn, Provider, ScriptTransactionRequest, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { CounterFactory, ScriptSum } from '../../../../typegend';

const provider = await Provider.create(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const address = Address.fromRandom();

const message: MessageCoin = {
  assetId: provider.getBaseAssetId(),
  sender: address,
  recipient: address,
  nonce: '0x',
  amount: bn(0),
  daHeight: bn(0),
};
const coin: Coin = {
  id: '0x',
  assetId: provider.getBaseAssetId(),
  amount: bn(0),
  owner: address,
  blockCreated: bn(0),
  txCreatedIdx: bn(0),
};
const recipientAddress = address;
const resource = coin;
const resources: Resource[] = [resource];

// #region transaction-request-3
// Instantiate the transaction request
const transactionRequest = new ScriptTransactionRequest({
  script: ScriptSum.bytecode,
});

// Adding resources (coins or messages)
transactionRequest.addResources(resources);
transactionRequest.addResource(resource);

// Adding coin inputs and outputs (including transfer to recipient)
transactionRequest.addCoinInput(coin);
transactionRequest.addCoinOutput(
  recipientAddress,
  1000,
  provider.getBaseAssetId()
);

// Adding message inputs
transactionRequest.addMessageInput(message);
// #endregion transaction-request-3

// #region transaction-request-4
const deploy = await CounterFactory.deploy(wallet);
const { contract } = await deploy.waitForResult();

// Add the contract input and output using the contract ID
transactionRequest.addContractInputAndOutput(contract.id);
// #endregion transaction-request-4
