// #region setup
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { MyContractFactory } from '../../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const factory = new MyContractFactory(wallet);
// #endregion setup

// #region deploy
// Deploy the contract
const { waitForResult, contractId, waitForTransactionId } =
  await factory.deploy();
// Retrieve the transactionId
const transactionId = await waitForTransactionId();
// Await it's deployment
const { contract, transactionResult } = await waitForResult();
// #endregion deploy

console.log('contractId', contractId);
console.log('transactionId', transactionId);
console.log('transactionResult', transactionResult);

// #region call
// Call the contract
const { waitForResult: waitForCallResult } = await contract.functions
  .test_function()
  .call();
// Await the result of the call
const { value } = await waitForCallResult();
// #endregion call
console.log('value', value);

// #region blobs
// Deploy the contract as blobs
const { waitForResult: waitForBlobsAndContractDeployment } =
  await factory.deployAsBlobTx({
    // setting chunk size multiplier to be 90% of the max chunk size
    chunkSizeMultiplier: 0.9,
  });

// Await its deployment
const { contract: contractFromBlobs } =
  await waitForBlobsAndContractDeployment();
// #endregion blobs

console.log('contractFromBlobs', contractFromBlobs);
