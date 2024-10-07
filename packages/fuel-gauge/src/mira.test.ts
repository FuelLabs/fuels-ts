import type { FuelError } from 'fuels';
import { bn, Provider, Wallet } from 'fuels';

import { Mira, MiraFactory, MultiSrc3Asset } from '../test/typegen';

import { CreatePoolAndAddLiquidityScriptLoader } from './mira-programs';

describe('MiraAmmContract', () => {
  // const MIRA_CONTRACT_ID = '0x37a8b020d6d07899b0ef324a9bb4eeaabbd26627f3127be29ba400176a2934fb';
  const MIRA_SERGIO_CONTRACT_ID =
    '0x6a18fbb5da40b911bd207d0bdc3a0b96254f5f9b55c97c5620fd2631534e4aa8';

  const SRC_20_CONTRACT = '0x5d95ccb3bf32d07ece2f20c72fba75ed1953526a3dc2f966b346685bd27cfa10';

  const TOKEN_A_CONTRACT = '0xcb81e60d414465320e03e830f90403aef3740602d9500749f9d0a557443e5fef';
  const TOKEN_A_ASSET_ID = '0x122a6d39b09b2be941eb279e1d553db364a66d6923de838c5d148a1bf8071897';
  const TOKEN_A_SUB_ID = '0xb96936fb7557118cca11385f7dc75fc199943e286e737f4faf7890d46df5bfdc';

  const TOKEN_B_CONTRACT = '0x86326256b8bf2a364bda8303927de98d5ca87de1cbae4797b7aa65dac6122369';
  const TOKEN_B_ASSET_ID = '0xda041f79e1982c53042a1a7a4dc03ebec5f576fcac3318cfcffcc79fadf4893e';
  const TOKEN_B_SUB_ID = '0x0dc762b2b61d18961f90226ed2bfaaa6f1b0cf66cd601851180f6c0464e64eda';

  const wrappToContract = (contractIdString: string) => ({ bits: contractIdString });

  it('test create pool', async () => {
    const provider = await Provider.create('https://testnet.fuel.network/v1/graphql');
    const account = Wallet.fromPrivateKey(process.env.FUEL_ACCOUNT_1_PVK || '', provider);
    const account2 = Wallet.fromPrivateKey(process.env.FUEL_ACCOUNT_2_PVK || '', provider);
    const miraContract = new Mira(MIRA_SERGIO_CONTRACT_ID, account);
    const tokenAContract = new MultiSrc3Asset(TOKEN_A_CONTRACT, account);
    const tokenBContract = new MultiSrc3Asset(TOKEN_B_CONTRACT, account);

    const script = new CreatePoolAndAddLiquidityScriptLoader(account);
    script.setConfigurableConstants({
      AMM_CONTRACT_ID: { bits: MIRA_SERGIO_CONTRACT_ID },
    });

    try {
      const request = await script.functions
        .main(
          { bits: TOKEN_A_CONTRACT },
          TOKEN_A_SUB_ID,
          { bits: TOKEN_B_CONTRACT },
          TOKEN_B_SUB_ID,
          false,
          100,
          100,
          { Address: { bits: account2.address.toB256() } },
          1759883664
        )
        // .main(
        //   [
        //     { bits: '0xce90621a26908325c42e95acbbb358ca671a9a7b36dfb6a5405b407ad1efcd30' },
        //     { bits: '0x3f007b72f7bcb9b1e9abe2c76e63790cd574b7c34f1c91d6c2f407a5b55676b9' },
        //     false,
        //   ],
        //   1000,
        //   1000,
        //   0,
        //   0,
        //   { Address: { bits: account.address.toB256() } },
        //   4102444800
        // )
        .addContracts([miraContract, tokenAContract, tokenBContract])
        .getTransactionRequest();

      const quantities = [
        { amount: bn(100_000), assetId: TOKEN_A_ASSET_ID },
        { amount: bn(100_000), assetId: TOKEN_B_ASSET_ID },
      ];

      const cost = await account.getTransactionCost(request, { quantities });

      request.gasLimit = cost.gasUsed;
      request.maxFee = cost.maxFee;

      await account.fund(request, cost);

      const res = await account.sendTransaction(request);
      const { logs } = await res.waitForResult();
      console.log('logs', logs);
    } catch (err) {
      console.log('message:', (err as FuelError).message);
      console.log('receipts:', (err as FuelError).metadata?.receipts);
      console.log('logs:', (err as FuelError).metadata?.logs);
    }
  });

  it.only('deploy contract', async () => {
    const provider = await Provider.create('https://testnet.fuel.network/v1/graphql');
    const account = Wallet.fromPrivateKey(process.env.FUEL_ACCOUNT_1_PVK || '', provider);
    const account2 = Wallet.fromPrivateKey(process.env.FUEL_ACCOUNT_2_PVK || '', provider);

    const miraContract = new Mira(MIRA_SERGIO_CONTRACT_ID, account);
    const { waitForResult } = await miraContract.functions.get_fee_recipient_3().call();
    const { value } = await waitForResult();
    console.log(value);

    // const deploy = await MiraFactory.deploy(account);
    // const { contract } = await deploy.waitForResult();

    // console.log(contract.id.toB256());

    // const call = await contract.functions
    // .mint({ Address: { bits: account.address.toB256() } }, getRandomB256(), 100_000_000)
    // .call();
  }, 180_000);
});
