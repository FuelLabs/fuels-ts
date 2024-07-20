// #region transaction-parameters-8
import { LOCAL_NETWORK_URL, fuels } from 'fuels';

import { WALLET_PVT_KEY } from '../env';
import { Counter } from '../typegend';

const client = await fuels(LOCAL_NETWORK_URL);
const wallet = client.wallet(WALLET_PVT_KEY);
const deploy = await Counter.deploy(wallet);

const { contract } = await deploy.waitForResult();

const { waitForResult } = await contract.functions
  .increment_count(15)
  .txParams({
    variableOutputs: 1,
  })
  .call();

const {
  value,
  transactionResult: { isStatusSuccess },
} = await waitForResult();

console.log({ value, isStatusSuccess });
// #endregion transaction-parameters-8
