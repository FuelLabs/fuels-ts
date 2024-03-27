import { generateTestWallet } from '@fuel-ts/account/test-utils';
import type { BN, Contract, WalletUnlocked } from 'fuels';
import { bn, ContractFactory, Provider, BaseAssetId, FUEL_NETWORK_URL, getRandomB256 } from 'fuels';

import { FuelGaugeProjectsEnum, getFuelGaugeForcProject } from '../test/fixtures';

let contractInstance: Contract;
let wallet: WalletUnlocked;

/**
 * @group node
 */
describe('Revert Error Testing', () => {
  let gasPrice: BN;
  let provider: Provider;

  beforeAll(async () => {
    provider = await Provider.create(FUEL_NETWORK_URL);
    wallet = await generateTestWallet(provider, [[1_000_000, BaseAssetId]]);

    const { binHexlified: bytecode, abiContents: FactoryAbi } = getFuelGaugeForcProject(
      FuelGaugeProjectsEnum.REVERT_ERROR
    );

    const factory = new ContractFactory(bytecode, FactoryAbi, wallet);
    ({ minGasPrice: gasPrice } = wallet.provider.getGasConfig());
    contractInstance = await factory.deployContract({ gasPrice });
  });

  it('can pass require checks [valid]', async () => {
    const INPUT_PRICE = bn(10);
    const INPUT_TOKEN_ID = bn(100);

    const { logs } = await contractInstance.functions
      .validate_inputs(INPUT_TOKEN_ID, INPUT_PRICE)
      .call();

    expect(
      logs.map((d) => ({ token_id: d.token_id?.toString(), price: d.price?.toString() }))
    ).toEqual([
      {
        token_id: INPUT_TOKEN_ID.toString(),
        price: INPUT_PRICE.toString(),
      },
    ]);
  });

  it('should throw for "require" revert TX [PriceCantBeZero]', async () => {
    const INPUT_PRICE = bn(0);
    const INPUT_TOKEN_ID = bn(100);

    await expect(
      contractInstance.functions.validate_inputs(INPUT_TOKEN_ID, INPUT_PRICE).call()
    ).rejects.toThrow(
      `The transaction reverted because of a "require" statement has thrown "PriceCantBeZero".`
    );
  });

  it('should throw for "require" revert TX [InvalidTokenId]', async () => {
    const INPUT_PRICE = bn(10);
    const INPUT_TOKEN_ID = bn(55);

    await expect(
      contractInstance.functions.validate_inputs(INPUT_TOKEN_ID, INPUT_PRICE).call()
    ).rejects.toThrow(
      `The transaction reverted because of a "require" statement has thrown "InvalidTokenId".`
    );
  });

  it('should throw for revert TX with reason "TransferZeroCoins"', async () => {
    await expect(contractInstance.functions.failed_transfer_revert().call()).rejects.toThrow(
      'The transaction reverted with reason: "TransferZeroCoins".'
    );
  });

  it('should throw for "assert" revert TX', async () => {
    const INPUT_PRICE = bn(100);
    const INPUT_TOKEN_ID = bn(100);

    await expect(
      contractInstance.functions.validate_inputs(INPUT_TOKEN_ID, INPUT_PRICE).call()
    ).rejects.toThrow(
      'The transaction reverted because of an "assert" statement failed to evaluate to true.'
    );
  });

  it('should throw for revert TX with reason "NotEnoughBalance"', async () => {
    await expect(contractInstance.functions.failed_transfer().call()).rejects.toThrow(
      'The transaction reverted with reason: "NotEnoughBalance".'
    );
  });

  it('should throw for "assert_eq" revert TX', async () => {
    await expect(contractInstance.functions.assert_value_eq_10(9).call()).rejects.toThrow(
      `The transaction reverted because of an "assert_eq" statement comparing 10 and 9.`
    );
  });

  it('should throw for "assert_ne" revert TX', async () => {
    await expect(contractInstance.functions.assert_value_ne_5(5).call()).rejects.toThrow(
      `The transaction reverted because of an "assert_ne" statement comparing 5 and 5.`
    );
  });

  it('should throw for "assert_ne" revert TX', async () => {
    const { binHexlified: tokenBytecode, abiContents: tokenAbi } = getFuelGaugeForcProject(
      FuelGaugeProjectsEnum.TOKEN_CONTRACT
    );

    const factory = new ContractFactory(tokenBytecode, tokenAbi, wallet);
    const tokenContract = await factory.deployContract();

    const addresses = [
      { value: getRandomB256() },
      { value: getRandomB256() },
      { value: getRandomB256() },
    ];

    const request = await tokenContract
      .multiCall([
        tokenContract.functions.mint_coins(500),
        tokenContract.functions.mint_to_addresses(addresses, 300),
      ])
      .txParams({ gasPrice })
      .getTransactionRequest();

    const { gasUsed, maxFee, requiredQuantities } = await provider.getTransactionCost(request);

    request.gasLimit = gasUsed;

    await wallet.fund(request, requiredQuantities, maxFee);

    const tx = await wallet.sendTransaction(request, {
      estimateTxDependencies: false,
    });

    await expect(tx.wait()).rejects.toThrow(
      `The transaction reverted because missing "OutputChange"(s).`
    );
  });

  it('should throw for explicit "revert" call', async () => {
    await expect(contractInstance.functions.revert_with_0().call()).rejects.toThrow(
      `The transaction reverted with an unknown reason: 0`
    );
  });
});
