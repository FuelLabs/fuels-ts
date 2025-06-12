/* eslint-disable @typescript-eslint/no-use-before-define */
import type {
  GqlAccount,
  GqlRequiredBalance,
} from '@fuel-ts/account/dist/providers/__generated__/operations';
import type { BigNumberish, Account } from 'fuels';
import {
  bn,
  ScriptTransactionRequest,
  Wallet,
  resolveAccountForAssembleTxParams,
  ErrorCode,
  FuelError,
} from 'fuels';
import type { DeployContractConfig } from 'fuels/test-utils';
import { expectToThrowFuelError, launchTestNode, TestAssetId, TestMessage } from 'fuels/test-utils';

import type { CallTestContract } from '../test/typegen';
import {
  CallTestContractFactory,
  ConditionalLoopContractFactory,
  PredicateFalseConfigurable,
  Predicate as PredicatePassword,
  PredicateTrue,
} from '../test/typegen';

import { fundAccount } from './predicate/utils/predicate';

/**
 * @group node
 * @group browser
 */
describe('assembleTx', () => {
  let cleanup: () => void;

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  const setupTest = async (
    params: {
      transferAmount?: number;
      mock?: boolean;
      contractsConfigs?: DeployContractConfig[];
    } = {}
  ) => {
    const { transferAmount = bn(0), mock = true, contractsConfigs } = params;
    const message = new TestMessage({ data: '0x', amount: 1_000_000_000 });
    const launched = await launchTestNode({
      walletsConfig: {
        count: 3,
        messages: [message],
      },
      contractsConfigs,
    });
    const {
      provider,
      wallets: [wallet1, wallet2, wallet3],
      contracts,
    } = launched;

    cleanup = launched.cleanup;

    const baseAssetId = await provider.getBaseAssetId();

    const request = new ScriptTransactionRequest();

    if (bn(transferAmount).gt(0)) {
      request.addCoinOutput(wallet2.address, transferAmount, baseAssetId);
    }

    const spy = vi.spyOn(provider.operations, 'assembleTx');

    if (!mock) {
      spy.mockRestore();
    }

    return {
      provider,
      wallet1,
      wallet2,
      wallet3,
      baseAssetId,
      request,
      spy,
      transferAmount,
      contracts,
    };
  };

  it('should work just fine', async () => {
    const { provider, wallet1, baseAssetId, request, spy, transferAmount } = await setupTest({
      transferAmount: 1000,
    });

    const { assembledRequest } = await provider.assembleTx({
      request,
      feePayerAccount: wallet1,
      accountCoinQuantities: [
        {
          amount: transferAmount,
          assetId: baseAssetId,
          account: wallet1,
          changeOutputAccount: wallet1,
        },
      ],
    });

    const tx = await wallet1.sendTransaction(assembledRequest);
    const { isStatusSuccess } = await tx.waitForResult();

    expect(isStatusSuccess).toBeTruthy();

    validateRequiredBalance({
      requiredBalance: spy.mock.calls[0][0].requiredBalances,
      index: 0,
      account: wallet1,
      amount: transferAmount,
      assetId: baseAssetId,
      changeAccount: wallet1,
    });

    validateFeePayer({
      requiredBalance: spy.mock.calls[0][0].requiredBalances,
      feePayerIndex: spy.mock.calls[0][0].feeAddressIndex,
      payerAccount: wallet1,
      baseAssetId,
    });
  });

  it('should use feePayerAccount when account is not provided', async () => {
    const { provider, wallet1, baseAssetId, request, spy, transferAmount } = await setupTest({
      transferAmount: 2000,
    });

    const { assembledRequest } = await provider.assembleTx({
      request,
      feePayerAccount: wallet1,
      accountCoinQuantities: [
        {
          amount: transferAmount,
          assetId: baseAssetId,
          changeOutputAccount: wallet1,
        },
      ],
    });

    const tx = await wallet1.sendTransaction(assembledRequest);
    const { isStatusSuccess } = await tx.waitForResult();

    expect(isStatusSuccess).toBeTruthy();

    validateRequiredBalance({
      requiredBalance: spy.mock.calls[0][0].requiredBalances,
      index: 0,
      account: wallet1,
      amount: transferAmount,
      assetId: baseAssetId,
      changeAccount: wallet1,
    });

    validateFeePayer({
      requiredBalance: spy.mock.calls[0][0].requiredBalances,
      feePayerIndex: spy.mock.calls[0][0].feeAddressIndex,
      payerAccount: wallet1,
      baseAssetId,
    });
  });

  it('should default changeOutputAccount to account if not provided', async () => {
    const { provider, wallet1, wallet3, baseAssetId, request, spy, transferAmount } =
      await setupTest({ transferAmount: 1500 });

    const { assembledRequest } = await provider.assembleTx({
      request,
      feePayerAccount: wallet3,
      accountCoinQuantities: [
        {
          amount: transferAmount,
          assetId: baseAssetId,
          account: wallet1,
        },
      ],
    });

    const signed = await wallet3.populateTransactionWitnessesSignature(assembledRequest);

    const tx = await wallet1.sendTransaction(signed);
    const { isStatusSuccess } = await tx.waitForResult();

    expect(isStatusSuccess).toBeTruthy();

    const call = spy.mock.calls[0][0];

    validateRequiredBalance({
      requiredBalance: call.requiredBalances,
      index: 0,
      account: wallet1,
      amount: transferAmount,
      assetId: baseAssetId,
      changeAccount: wallet1,
    });

    validateRequiredBalance({
      requiredBalance: call.requiredBalances,
      index: 1,
      account: wallet3,
      amount: '0',
      assetId: baseAssetId,
      changeAccount: wallet1,
    });

    validateFeePayer({
      requiredBalance: call.requiredBalances,
      feePayerIndex: call.feeAddressIndex,
      payerAccount: wallet3,
      baseAssetId,
    });
  });

  it('should default changeOutputAccount and account to feePayer if not provided', async () => {
    const { provider, wallet1, baseAssetId, request, spy, transferAmount } = await setupTest({
      transferAmount: 1500,
    });
    const { assembledRequest } = await provider.assembleTx({
      request,
      feePayerAccount: wallet1,
      accountCoinQuantities: [
        {
          amount: transferAmount,
          assetId: baseAssetId,
        },
      ],
    });

    const tx = await wallet1.sendTransaction(assembledRequest);
    const { isStatusSuccess } = await tx.waitForResult();

    expect(isStatusSuccess).toBeTruthy();

    const call = spy.mock.calls[0][0];

    validateRequiredBalance({
      requiredBalance: call.requiredBalances,
      index: 0,
      account: wallet1,
      amount: transferAmount,
      assetId: baseAssetId,
      changeAccount: wallet1,
    });

    validateFeePayer({
      requiredBalance: call.requiredBalances,
      feePayerIndex: call.feeAddressIndex,
      payerAccount: wallet1,
      baseAssetId,
    });
  });

  it('should validate OutputChange collision', async () => {
    const { provider, wallet1, wallet2, baseAssetId, request, transferAmount } = await setupTest({
      transferAmount: 1500,
    });

    request.addChangeOutput(wallet2.address, baseAssetId);

    await expectToThrowFuelError(
      () =>
        provider.assembleTx({
          request,
          feePayerAccount: wallet1,
          accountCoinQuantities: [
            {
              account: wallet1,
              amount: transferAmount,
              assetId: baseAssetId,
              changeOutputAccount: wallet1,
            },
          ],
        }),
      new FuelError(
        ErrorCode.CHANGE_OUTPUT_COLLISION,
        `OutputChange address for asset ${baseAssetId} differs between transaction request and assembleTx parameters.`
      )
    );
  });

  it('should validate OutputChange collision, multiple changeOutputAccount for same assetId', async () => {
    const { provider, wallet1, wallet2, request, transferAmount } = await setupTest({
      transferAmount: 1500,
    });

    await expectToThrowFuelError(
      () =>
        provider.assembleTx({
          request,
          feePayerAccount: wallet1,
          accountCoinQuantities: [
            {
              account: wallet1,
              amount: transferAmount,
              assetId: TestAssetId.A.value,
              changeOutputAccount: wallet1,
            },
            {
              account: wallet1,
              amount: transferAmount,
              assetId: TestAssetId.A.value,
              changeOutputAccount: wallet2,
            },
          ],
        }),
      new FuelError(
        ErrorCode.DUPLICATE_CHANGE_OUTPUT_ACCOUNT,
        `The parameter 'accountCoinQuantities' of assembleTx contains duplicate entries for the same assetId with different 'changeOutputAccount'.`
      )
    );
  });

  it('should work with multiple assets', async () => {
    const { provider, wallet1, wallet2, baseAssetId } = await setupTest({
      transferAmount: 1500,
      mock: false,
    });

    const predicate = new PredicateTrue({ provider });
    const receiver = Wallet.generate({ provider });

    await fundAccount(wallet1, predicate, 200_000);

    const amountA = 1000;
    const amountB = 5000;

    const request = new ScriptTransactionRequest();
    request.addCoinOutput(receiver.address, amountA, TestAssetId.A.value);
    request.addCoinOutput(receiver.address, amountB, TestAssetId.B.value);

    const spy = vi.spyOn(provider.operations, 'assembleTx');

    let { assembledRequest } = await provider.assembleTx({
      request,
      feePayerAccount: predicate,
      accountCoinQuantities: [
        {
          account: wallet1,
          amount: amountA,
          assetId: TestAssetId.A.value,
          changeOutputAccount: wallet1,
        },
        {
          account: wallet2,
          amount: amountB,
          assetId: TestAssetId.B.value,
        },
      ],
    });

    assembledRequest = await wallet2.populateTransactionWitnessesSignature(assembledRequest);

    const tx = await wallet1.sendTransaction(assembledRequest);
    const { isStatusSuccess } = await tx.waitForResult();

    expect(isStatusSuccess).toBeTruthy();

    const call = spy.mock.calls[0][0];

    validateRequiredBalance({
      requiredBalance: call.requiredBalances,
      index: 0,
      account: wallet1,
      amount: amountA,
      assetId: TestAssetId.A.value,
      changeAccount: wallet1,
    });

    validateRequiredBalance({
      requiredBalance: call.requiredBalances,
      index: 1,
      account: wallet2,
      amount: amountB,
      assetId: TestAssetId.B.value,
      changeAccount: wallet2,
    });

    validateFeePayer({
      requiredBalance: call.requiredBalances,
      feePayerIndex: call.feeAddressIndex,
      payerAccount: predicate,
      baseAssetId,
    });
  });

  it('should validate default parameters values', async () => {
    const { provider, request, wallet2, baseAssetId, transferAmount } = await setupTest({
      transferAmount: 1500,
      mock: false,
    });

    const predicate = new PredicateTrue({ provider });

    await fundAccount(wallet2, predicate, 200_000);

    const spy = vi.spyOn(provider.operations, 'assembleTx');

    const { assembledRequest } = await provider.assembleTx({
      request,
      feePayerAccount: predicate,
      accountCoinQuantities: [
        {
          amount: transferAmount,
          assetId: baseAssetId,
        },
      ],
    });

    const tx = await wallet2.sendTransaction(assembledRequest);
    const { isStatusSuccess } = await tx.waitForResult();

    expect(isStatusSuccess).toBeTruthy();

    const call = spy.mock.calls[0][0];

    expect(call.estimatePredicates).toBe(true);
    expect(call.blockHorizon).toBe('10');
    expect(call.reserveGas).toBeUndefined();

    validateRequiredBalance({
      requiredBalance: call.requiredBalances,
      index: 0,
      account: predicate,
      amount: transferAmount,
      assetId: baseAssetId,
      changeAccount: predicate,
    });

    validateFeePayer({
      requiredBalance: call.requiredBalances,
      feePayerIndex: call.feeAddressIndex,
      payerAccount: predicate,
      baseAssetId,
    });
  });

  it('should use input values for default parameters', async () => {
    const { provider, wallet1, request, baseAssetId } = await setupTest({
      transferAmount: 1500,
      mock: false,
    });

    const amount = 1000;
    const blockHorizon = 1;

    const spy = vi.spyOn(provider.operations, 'assembleTx');

    const { assembledRequest } = await provider.assembleTx({
      request,
      feePayerAccount: wallet1,
      blockHorizon,
      estimatePredicates: false,
      accountCoinQuantities: [
        {
          amount,
          assetId: baseAssetId,
        },
      ],
    });

    const tx = await wallet1.sendTransaction(assembledRequest);
    const { isStatusSuccess } = await tx.waitForResult();

    expect(isStatusSuccess).toBeTruthy();

    const call = spy.mock.calls[0][0];

    expect(call.estimatePredicates).toBeFalsy();
    expect(call.blockHorizon).toBe(blockHorizon.toString());
    expect(call.reserveGas).toBeUndefined();

    validateRequiredBalance({
      requiredBalance: call.requiredBalances,
      index: 0,
      account: wallet1,
      amount,
      assetId: baseAssetId,
      changeAccount: wallet1,
    });

    validateFeePayer({
      requiredBalance: call.requiredBalances,
      feePayerIndex: call.feeAddressIndex,
      payerAccount: wallet1,
      baseAssetId,
    });
  });

  it('should properly handle reserved gas parameter', async () => {
    const { provider, wallet1, baseAssetId, request, spy } = await setupTest({
      transferAmount: 1000,
    });
    const reserveGas = 10_000;

    const { assembledRequest } = await provider.assembleTx({
      request,
      feePayerAccount: wallet1,
      accountCoinQuantities: [
        {
          amount: 1000,
          assetId: baseAssetId,
        },
      ],
      reserveGas,
    });

    const tx = await wallet1.sendTransaction(assembledRequest);
    const { isStatusSuccess } = await tx.waitForResult();

    expect(isStatusSuccess).toBeTruthy();
    expect(spy.mock.calls[0][0].reserveGas).toBe(reserveGas.toString());
  });

  it('should handle multiple assets with mixed change output configurations', async () => {
    const { provider, wallet1, wallet2, wallet3, baseAssetId, spy } = await setupTest({
      transferAmount: 1000,
    });

    const amountA = 300;
    const amountB = 500;

    const receiver = Wallet.generate({ provider });

    const request = new ScriptTransactionRequest();
    request.addCoinOutput(receiver.address, amountA, TestAssetId.B.value);
    request.addCoinOutput(receiver.address, amountB, TestAssetId.A.value);

    let { assembledRequest } = await provider.assembleTx({
      request,
      feePayerAccount: wallet1,
      accountCoinQuantities: [
        {
          account: wallet3,
          amount: 500,
          assetId: TestAssetId.A.value,
          changeOutputAccount: wallet1,
        },
        {
          account: wallet2,
          amount: 300,
          assetId: TestAssetId.B.value,
          changeOutputAccount: wallet3,
        },
        {
          amount: 0,
          assetId: baseAssetId,
          changeOutputAccount: receiver,
        },
      ],
    });

    assembledRequest = await wallet2.populateTransactionWitnessesSignature(assembledRequest);
    assembledRequest = await wallet3.populateTransactionWitnessesSignature(assembledRequest);

    const tx = await wallet1.sendTransaction(assembledRequest);
    const { isStatusSuccess } = await tx.waitForResult();

    expect(isStatusSuccess).toBeTruthy();

    const call = spy.mock.calls[0][0];

    validateRequiredBalance({
      requiredBalance: call.requiredBalances,
      index: 0,
      account: wallet3,
      amount: amountB,
      assetId: TestAssetId.A.value,
      changeAccount: wallet1,
    });

    validateRequiredBalance({
      requiredBalance: call.requiredBalances,
      index: 1,
      account: wallet2,
      amount: amountA,
      assetId: TestAssetId.B.value,
      changeAccount: wallet3,
    });

    validateRequiredBalance({
      requiredBalance: call.requiredBalances,
      index: 2,
      account: wallet1,
      amount: 0,
      assetId: baseAssetId,
      changeAccount: receiver,
    });

    validateFeePayer({
      requiredBalance: call.requiredBalances,
      feePayerIndex: call.feeAddressIndex,
      payerAccount: wallet1,
      baseAssetId,
    });
  });

  it('should handle multiple assets with mixed change output configurations [BaseInvocationScope]', async () => {
    const { provider, wallet1, wallet2, wallet3, baseAssetId, spy, contracts } = await setupTest({
      transferAmount: 1000,
      contractsConfigs: [{ factory: CallTestContractFactory }],
    });

    const contract = contracts[0] as CallTestContract;
    contract.account = wallet1;

    const amountA = 300;
    const amountB = 500;

    const receiver = Wallet.generate({ provider });

    const scope = contract.functions
      .foo(10)
      .addTransfer({
        destination: receiver.address,
        amount: amountA,
        assetId: TestAssetId.B.value,
      })
      .addTransfer({
        destination: receiver.address,
        amount: amountB,
        assetId: TestAssetId.A.value,
      })
      .assembleTxParams({
        feePayerAccount: wallet1,
        estimatePredicates: false,
        accountCoinQuantities: [
          {
            account: wallet3,
            amount: 500,
            assetId: TestAssetId.A.value,
            changeOutputAccount: wallet1,
          },
          {
            account: wallet2,
            amount: 300,
            assetId: TestAssetId.B.value,
            changeOutputAccount: wallet3,
          },
          {
            amount: 0,
            assetId: baseAssetId,
            changeOutputAccount: receiver,
          },
        ],
      });

    let assembledRequest = await scope.fundWithRequiredCoins();

    assembledRequest = await wallet2.populateTransactionWitnessesSignature(assembledRequest);
    assembledRequest = await wallet3.populateTransactionWitnessesSignature(assembledRequest);

    const tx = await scope.fromRequest(assembledRequest).call({ skipAssembleTx: true });
    const {
      transactionResult: { isStatusSuccess },
    } = await tx.waitForResult();

    expect(isStatusSuccess).toBeTruthy();

    const call = spy.mock.calls[0][0];

    validateRequiredBalance({
      requiredBalance: call.requiredBalances,
      index: 0,
      account: wallet3,
      amount: amountB,
      assetId: TestAssetId.A.value,
      changeAccount: wallet1,
    });

    validateRequiredBalance({
      requiredBalance: call.requiredBalances,
      index: 1,
      account: wallet2,
      amount: amountA,
      assetId: TestAssetId.B.value,
      changeAccount: wallet3,
    });

    validateRequiredBalance({
      requiredBalance: call.requiredBalances,
      index: 2,
      account: wallet1,
      amount: 0,
      assetId: baseAssetId,
      changeAccount: receiver,
    });

    validateFeePayer({
      requiredBalance: call.requiredBalances,
      feePayerIndex: call.feeAddressIndex,
      payerAccount: wallet1,
      baseAssetId,
    });

    expect(call.estimatePredicates).toBeFalsy();
  });

  it('should handle multiple predicates with different asset types', async () => {
    const { provider, wallet1, baseAssetId, wallet2 } = await setupTest({
      transferAmount: 1000,
      mock: false,
    });

    const amountA = 999;
    const amountB = 777;

    const predicate1 = new PredicatePassword({ provider, data: [1000, 337] });
    const predicate2 = new PredicateTrue({ provider });
    const predicate3 = new PredicateFalseConfigurable({
      provider,
      data: [99],
      configurableConstants: { SECRET_NUMBER: 99 },
    });

    // Fund predicates
    await fundAccount(wallet1, predicate1, 100_000);
    await fundAccount(wallet1, predicate2, 100_000);
    await fundAccount(wallet1, predicate3, 100_000);

    const request = new ScriptTransactionRequest();
    request.addCoinOutput(wallet1.address, 500, baseAssetId);
    request.addCoinOutput(wallet2.address, 300, baseAssetId);

    const spy = vi.spyOn(provider.operations, 'assembleTx');

    const { assembledRequest } = await provider.assembleTx({
      request,
      feePayerAccount: predicate1,
      accountCoinQuantities: [
        {
          account: predicate3,
          amount: amountA,
          assetId: baseAssetId,
          changeOutputAccount: wallet2,
        },
        {
          account: predicate2,
          amount: amountB,
          assetId: baseAssetId,
          changeOutputAccount: wallet2,
        },
        {
          account: predicate1,
          amount: 0,
          assetId: baseAssetId,
          changeOutputAccount: wallet2,
        },
      ],
    });

    const tx = await wallet1.sendTransaction(assembledRequest);
    const { isStatusSuccess } = await tx.waitForResult();

    expect(isStatusSuccess).toBeTruthy();

    const call = spy.mock.calls[0][0];

    validateRequiredBalance({
      requiredBalance: call.requiredBalances,
      index: 0,
      account: predicate3,
      amount: amountA,
      assetId: baseAssetId,
      changeAccount: wallet2,
    });

    validateRequiredBalance({
      requiredBalance: call.requiredBalances,
      index: 1,
      account: predicate2,
      amount: amountB,
      assetId: baseAssetId,
      changeAccount: wallet2,
    });

    validateRequiredBalance({
      requiredBalance: call.requiredBalances,
      index: 2,
      account: predicate1,
      amount: 0,
      assetId: baseAssetId,
      changeAccount: wallet2,
    });

    validateFeePayer({
      requiredBalance: call.requiredBalances,
      feePayerIndex: call.feeAddressIndex,
      payerAccount: predicate1,
      baseAssetId,
    });
  });

  it('should handle multiple predicates with different asset types [BaseInvocationScope]', async () => {
    const {
      provider,
      wallet1,
      baseAssetId,
      wallet2,
      contracts: [contract],
    } = await setupTest({
      transferAmount: 1000,
      mock: false,
      contractsConfigs: [{ factory: CallTestContractFactory }],
    });

    const amountA = 333;
    const amountB = 111;

    const predicate1 = new PredicatePassword({ provider, data: [1000, 337] });
    const predicate2 = new PredicateTrue({ provider });
    const predicate3 = new PredicateFalseConfigurable({
      provider,
      data: [99],
      configurableConstants: { SECRET_NUMBER: 99 },
    });

    // Fund predicates
    await fundAccount(wallet1, predicate1, 100_000);
    await fundAccount(wallet1, predicate2, 100_000);
    await fundAccount(wallet1, predicate3, 100_000);

    const spy = vi.spyOn(provider.operations, 'assembleTx');

    const blockHorizon = 5;

    const tx = await (contract as CallTestContract).functions
      .return_context_amount()
      .callParams({
        forward: [1000, baseAssetId],
      })
      .addTransfer({
        destination: wallet1.address,
        amount: 1000,
        assetId: baseAssetId,
      })
      .addTransfer({
        destination: wallet2.address,
        amount: 300,
        assetId: baseAssetId,
      })
      .assembleTxParams({
        blockHorizon,
        estimatePredicates: true,
        feePayerAccount: predicate1,
        accountCoinQuantities: [
          {
            account: predicate3,
            amount: amountA,
            assetId: baseAssetId,
            changeOutputAccount: wallet2,
          },
          {
            account: predicate2,
            amount: amountB,
            assetId: baseAssetId,
            changeOutputAccount: wallet2,
          },
          {
            account: predicate1,
            amount: 0,
            assetId: baseAssetId,
            changeOutputAccount: wallet2,
          },
        ],
      })
      .call();

    const {
      transactionResult: { isStatusSuccess },
    } = await tx.waitForResult();

    expect(isStatusSuccess).toBeTruthy();

    const call = spy.mock.calls[0][0];

    validateRequiredBalance({
      requiredBalance: call.requiredBalances,
      index: 0,
      account: predicate3,
      amount: amountA,
      assetId: baseAssetId,
      changeAccount: wallet2,
    });

    validateRequiredBalance({
      requiredBalance: call.requiredBalances,
      index: 1,
      account: predicate2,
      amount: amountB,
      assetId: baseAssetId,
      changeAccount: wallet2,
    });

    validateRequiredBalance({
      requiredBalance: call.requiredBalances,
      index: 2,
      account: predicate1,
      amount: 0,
      assetId: baseAssetId,
      changeAccount: wallet2,
    });

    validateFeePayer({
      requiredBalance: call.requiredBalances,
      feePayerIndex: call.feeAddressIndex,
      payerAccount: predicate1,
      baseAssetId,
    });

    expect(call.estimatePredicates).toBeTruthy();
    expect(call.blockHorizon).toBe(String(blockHorizon));
  });

  it('should consider reserveGas when assembling at BaseInvocationScope', async () => {
    using launch = await launchTestNode({
      walletsConfig: {
        count: 2,
      },
      contractsConfigs: [{ factory: ConditionalLoopContractFactory }],
    });

    const {
      wallets: [correctWallet],
      contracts: [conditionalContract],
    } = launch;

    conditionalContract.account = correctWallet;

    const failureCall = await conditionalContract.functions.loop().call();

    /**
     * The contract checks whether the witness is a zeroed B512. If it is, the contract
     * loops 5 times; otherwise, it loops 10 times. Since the transaction is unsigned
     * during `assembleTx` estimation, this condition evaluates to 5 loops, resulting in a
     * lower estimated gas used. However, when the transaction is submitted with a valid
     * witness, it takes the longer path with 10 loops, consuming more gas than
     * initially estimated.
     */
    await expectToThrowFuelError(() => failureCall.waitForResult(), {
      code: FuelError.CODES.SCRIPT_REVERTED,
      message: expect.stringMatching('OutOfGas'),
    });

    const successCall = await conditionalContract.functions
      .loop()
      .assembleTxParams({ reserveGas: 10000 })
      .call();

    const {
      transactionResult: { isStatusSuccess },
    } = await successCall.waitForResult();

    expect(isStatusSuccess).toBe(true);
  });

  const extractAddress = (gqlAccount: GqlAccount) =>
    (gqlAccount.predicate ? gqlAccount.predicate.predicateAddress : gqlAccount.address) as string;

  const validateRequiredBalance = ({
    requiredBalance,
    index,
    amount,
    account,
    assetId,
    changeAccount,
  }: {
    requiredBalance: GqlRequiredBalance | Array<GqlRequiredBalance>;
    index: number;
    amount?: BigNumberish;
    account?: Account;
    assetId?: string;
    changeAccount?: Account;
  }) => {
    // eslint-disable-next-line no-param-reassign
    requiredBalance = requiredBalance as GqlRequiredBalance[];

    let assembleTxAccount = expect.any(Object);

    if (account) {
      assembleTxAccount = resolveAccountForAssembleTxParams(account);
    }

    expect(requiredBalance[index]).toStrictEqual({
      amount: amount ? bn(amount).toString() : expect.any(String),
      account: assembleTxAccount,
      assetId: assetId || expect.any(String),
      changePolicy: {
        change: changeAccount ? changeAccount.address.toB256() : expect.any(String),
      },
    });
  };

  const validateFeePayer = ({
    requiredBalance,
    feePayerIndex,
    payerAccount,
    baseAssetId,
  }: {
    requiredBalance: GqlRequiredBalance | Array<GqlRequiredBalance>;
    payerAccount: Account;
    feePayerIndex: string;
    baseAssetId: string;
  }) => {
    // eslint-disable-next-line no-param-reassign
    requiredBalance = requiredBalance as GqlRequiredBalance[];

    const index = requiredBalance.findIndex(
      (b) =>
        b.assetId === baseAssetId && extractAddress(b.account) === payerAccount.address.toB256()
    );

    expect(feePayerIndex).toBe(index.toString());
  };
});
