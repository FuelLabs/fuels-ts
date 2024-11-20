// #region multicall-3
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { EchoValuesFactory, ReturnContextFactory } from '../../../../typegend';

const provider = await Provider.create(LOCAL_NETWORK_URL);
const deployer = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const echoContractTx = await EchoValuesFactory.deploy(deployer);
const { contract: echoContract } = await echoContractTx.waitForResult();
const returnContextTx = await ReturnContextFactory.deploy(deployer);
const { contract: returnContextContract } =
  await returnContextTx.waitForResult();

const { waitForResult } = await echoContract
  .multiCall([
    echoContract.functions.echo_u8(10),
    returnContextContract.functions.return_context_amount().callParams({
      forward: [100, provider.getBaseAssetId()],
    }),
  ])
  .call();

const { value: results } = await waitForResult();
// results[0] == 10
// results[1] == BN <100>
// #endregion multicall-3

console.log('result[0]', results[0] === 10);
console.log('result[1]', results[1].toNumber() === 100);
