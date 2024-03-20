import { generateTestWallet } from '@fuel-ts/account/test-utils';
import type { BN, Contract, WalletUnlocked } from 'fuels';
import { bn, ContractFactory, Provider, BaseAssetId, FUEL_NETWORK_URL } from 'fuels';

import { FuelGaugeProjectsEnum, getFuelGaugeForcProject } from '../test/fixtures';

let contractInstance: Contract;
let wallet: WalletUnlocked;

/**
 * @group node
 */
describe('Revert Error Testing', () => {
  let gasPrice: BN;

  beforeAll(async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    wallet = await generateTestWallet(provider, [[1_000_000, BaseAssetId]]);

    const { binHexlified: bytecode, abiContents: FactoryAbi } = getFuelGaugeForcProject(
      FuelGaugeProjectsEnum.REVERT_ERROR
    );

    const factory = new ContractFactory(bytecode, FactoryAbi, wallet);
    ({ minGasPrice: gasPrice } = wallet.provider.getGasConfig());
    contractInstance = await factory.deployContract({ gasPrice });
  });

  it('can pass required checks [valid]', async () => {
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
      contractInstance.functions
        .validate_inputs(INPUT_TOKEN_ID, INPUT_PRICE)

        .call()
    ).rejects.toThrow(
      `The transaction reverted because of a "require" statement has thrown "PriceCantBeZero".`
    );
  });

  it('should throw for "require" revert TX [InvalidTokenId]', async () => {
    const INPUT_PRICE = bn(10);
    const INPUT_TOKEN_ID = bn(55);

    await expect(
      contractInstance.functions
        .validate_inputs(INPUT_TOKEN_ID, INPUT_PRICE)

        .call()
    ).rejects.toThrow(
      `The transaction reverted because of a "require" statement has thrown "InvalidTokenId".`
    );
  });

  it('should throw for revert TX with reason "TransferZeroCoins"', async () => {
    await expect(contractInstance.functions.failed_transfer_revert().call()).rejects.toThrow(
      'The transaction failed with reason: "TransferZeroCoins".'
    );
  });

  it('should throw for "assert" revert TX', async () => {
    const INPUT_PRICE = bn(100);
    const INPUT_TOKEN_ID = bn(100);

    await expect(
      contractInstance.functions
        .validate_inputs(INPUT_TOKEN_ID, INPUT_PRICE)

        .call()
    ).rejects.toThrow(
      'The transaction reverted because of an "assert" statement failed to evaluate to true.'
    );
  });

  it('should throw for revert TX with reason "NotEnoughBalance"', async () => {
    await expect(contractInstance.functions.failed_transfer().call()).rejects.toThrow(
      'The transaction failed with reason: "NotEnoughBalance".'
    );
  });
});
