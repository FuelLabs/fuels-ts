import { ErrorCode, FuelError } from '@fuel-ts/errors';
import type { Contract, WalletUnlocked, TransactionResultReceipt } from 'fuels';
import { bn, ContractFactory, Provider, FUEL_NETWORK_URL, getRandomB256 } from 'fuels';
import { expectToThrowFuelError, generateTestWallet } from 'fuels/test-utils';

import { FuelGaugeProjectsEnum, getFuelGaugeForcProject } from '../test/fixtures';

let contractInstance: Contract;
let wallet: WalletUnlocked;

/**
 * @group node
 */
describe('Revert Error Testing', () => {
  let provider: Provider;
  let baseAssetId: string;

  beforeAll(async () => {
    provider = await Provider.create(FUEL_NETWORK_URL);
    baseAssetId = provider.getBaseAssetId();
    wallet = await generateTestWallet(provider, [[1_000_000, baseAssetId]]);

    const { binHexlified: bytecode, abiContents: FactoryAbi } = getFuelGaugeForcProject(
      FuelGaugeProjectsEnum.REVERT_ERROR
    );

    const factory = new ContractFactory(bytecode, FactoryAbi, wallet);
    contractInstance = await factory.deployContract();
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

    await expectToThrowFuelError(
      () => contractInstance.functions.validate_inputs(INPUT_TOKEN_ID, INPUT_PRICE).call(),
      new FuelError(
        ErrorCode.SCRIPT_REVERTED,
        `The transaction reverted because a "require" statement has thrown "PriceCantBeZero".`,
        {
          logs: ['PriceCantBeZero'],
          receipts: expect.any(Array<TransactionResultReceipt>),
          reason: 'require',
          panic: false,
          revert: true,
        }
      )
    );
  });

  it('should throw for "require" revert TX [InvalidTokenId]', async () => {
    const INPUT_PRICE = bn(10);
    const INPUT_TOKEN_ID = bn(55);

    await expectToThrowFuelError(
      () => contractInstance.functions.validate_inputs(INPUT_TOKEN_ID, INPUT_PRICE).call(),
      new FuelError(
        ErrorCode.SCRIPT_REVERTED,
        `The transaction reverted because a "require" statement has thrown "InvalidTokenId".`,
        {
          logs: ['InvalidTokenId'],
          receipts: expect.any(Array<TransactionResultReceipt>),
          reason: 'require',
          panic: false,
          revert: true,
        }
      )
    );
  });

  it('should throw for revert TX with reason "TransferZeroCoins"', async () => {
    await expectToThrowFuelError(
      () => contractInstance.functions.failed_transfer_revert().call(),
      new FuelError(
        ErrorCode.SCRIPT_REVERTED,
        'The transaction reverted with reason: "TransferZeroCoins".\n\nYou can read more about this error at:\n\nhttps://docs.rs/fuel-asm/latest/fuel_asm/enum.PanicReason.html#variant.TransferZeroCoins',
        {
          logs: [],
          receipts: expect.any(Array<TransactionResultReceipt>),
          reason: 'TransferZeroCoins',
          panic: true,
          revert: false,
        }
      )
    );
  });

  it('should throw for "assert" revert TX', async () => {
    const INPUT_PRICE = bn(100);
    const INPUT_TOKEN_ID = bn(100);

    await expectToThrowFuelError(
      () => contractInstance.functions.validate_inputs(INPUT_TOKEN_ID, INPUT_PRICE).call(),
      new FuelError(
        ErrorCode.SCRIPT_REVERTED,
        'The transaction reverted because an "assert" statement failed to evaluate to true.',
        {
          logs: [],
          receipts: expect.any(Array<TransactionResultReceipt>),
          panic: false,
          revert: true,
          reason: 'assert',
        }
      )
    );
  });

  it('should throw for revert TX with reason "NotEnoughBalance"', async () => {
    await expectToThrowFuelError(
      () => contractInstance.functions.failed_transfer().call(),
      new FuelError(
        ErrorCode.SCRIPT_REVERTED,
        'The transaction reverted with reason: "NotEnoughBalance".\n\nYou can read more about this error at:\n\nhttps://docs.rs/fuel-asm/latest/fuel_asm/enum.PanicReason.html#variant.NotEnoughBalance',
        {
          logs: [],
          receipts: expect.any(Array<TransactionResultReceipt>),
          panic: true,
          revert: false,
          reason: 'NotEnoughBalance',
        }
      )
    );
  });

  it('should throw for "assert_eq" revert TX', async () => {
    await expectToThrowFuelError(
      () => contractInstance.functions.assert_value_eq_10(9).call(),
      new FuelError(
        ErrorCode.SCRIPT_REVERTED,
        `The transaction reverted because of an "assert_eq" statement comparing 10 and 9.`,
        {
          logs: [9, 10],
          receipts: expect.any(Array<TransactionResultReceipt>),
          panic: false,
          revert: true,
          reason: 'assert_eq',
        }
      )
    );
  });

  it('should throw for "assert_ne" revert TX', async () => {
    await expectToThrowFuelError(
      () => contractInstance.functions.assert_value_ne_5(5).call(),
      new FuelError(
        ErrorCode.SCRIPT_REVERTED,
        `The transaction reverted because of an "assert_ne" statement comparing 5 and 5.`,
        {
          logs: [5, 5],
          receipts: expect.any(Array<TransactionResultReceipt>),
          panic: false,
          revert: true,
          reason: 'assert_ne',
        }
      )
    );
  });

  it('should throw for a missing OutputChange', async () => {
    const { binHexlified: tokenBytecode, abiContents: tokenAbi } = getFuelGaugeForcProject(
      FuelGaugeProjectsEnum.TOKEN_CONTRACT
    );

    const factory = new ContractFactory(tokenBytecode, tokenAbi, wallet);
    const tokenContract = await factory.deployContract();

    const addresses = [
      { bits: getRandomB256() },
      { bits: getRandomB256() },
      { bits: getRandomB256() },
    ];

    const request = await tokenContract
      .multiCall([
        tokenContract.functions.mint_coins(500),
        tokenContract.functions.mint_to_addresses(addresses, 300),
      ])
      .getTransactionRequest();

    const txCost = await provider.getTransactionCost(request);

    request.gasLimit = txCost.gasUsed;
    request.maxFee = txCost.maxFee;

    await wallet.fund(request, txCost);

    const tx = await wallet.sendTransaction(request, {
      estimateTxDependencies: false,
    });

    await expectToThrowFuelError(
      () => tx.wait(),
      new FuelError(
        ErrorCode.SCRIPT_REVERTED,
        `The transaction reverted because it's missing an "OutputChange".`,
        {
          logs: [],
          receipts: expect.any(Array<TransactionResultReceipt>),
          panic: false,
          revert: true,
          reason: 'MissingOutputChange',
        }
      )
    );
  });

  it('should throw UNKNOWN Error for revert', async () => {
    await expectToThrowFuelError(
      () => contractInstance.functions.revert_with_0().call(),
      new FuelError(ErrorCode.UNKNOWN, `The transaction reverted with an unknown reason: 0`, {
        logs: [],
        receipts: expect.any(Array<TransactionResultReceipt>),
        panic: false,
        revert: true,
        reason: 'unknown',
      })
    );
  });

  it('should ensure errors from getTransactionCost dry-run are properly thrown', async () => {
    await expectToThrowFuelError(
      () => contractInstance.functions.assert_value_ne_5(5).getTransactionCost(),
      new FuelError(
        ErrorCode.SCRIPT_REVERTED,
        `The transaction reverted because of an "assert_ne" statement comparing 5 and 5.`,
        {
          logs: [5, 5],
          receipts: expect.any(Array<TransactionResultReceipt>),
          panic: false,
          revert: true,
          reason: 'assert_ne',
        }
      )
    );
  });
});
