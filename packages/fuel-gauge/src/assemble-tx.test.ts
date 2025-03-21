/* eslint-disable @typescript-eslint/no-use-before-define */
import type {
  GqlAccount,
  GqlRequiredBalance,
} from '@fuel-ts/account/dist/providers/__generated__/operations';
import type { BigNumberish, Account } from 'fuels';
import {
  bn,
  ErrorCode,
  ScriptTransactionRequest,
  Wallet,
  resolveAccountForAssembleTxParams,
} from 'fuels';
import { expectToThrowFuelError, launchTestNode, TestAssetId } from 'fuels/test-utils';

import { PredicateTrue } from '../test/typegen';

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

  const setupTest = async (transferAmount: number, mock: boolean = true) => {
    const launched = await launchTestNode({
      walletsConfig: {
        count: 3,
      },
    });
    const {
      provider,
      wallets: [wallet1, wallet2, wallet3],
    } = launched;

    cleanup = launched.cleanup;

    const baseAssetId = await provider.getBaseAssetId();

    const request = new ScriptTransactionRequest();
    request.addCoinOutput(wallet2.address, transferAmount, baseAssetId);

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
    };
  };

  it('should work just fine', async () => {
    const { provider, wallet1, baseAssetId, request, spy, transferAmount } = await setupTest(1000);

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
    const { provider, wallet1, baseAssetId, request, spy, transferAmount } = await setupTest(2000);

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
      await setupTest(1500);

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
    const { provider, wallet1, baseAssetId, request, spy, transferAmount } = await setupTest(1500);
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
    const { provider, wallet1, wallet2, baseAssetId, request, transferAmount } =
      await setupTest(1500);

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
      { code: ErrorCode.CHANGE_OUTPUT_COLLISION }
    );
  });

  it('should work with multiple assets', async () => {
    const { provider, wallet1, wallet2, baseAssetId } = await setupTest(1500, false);

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
    const { provider, request, wallet2, baseAssetId, transferAmount } = await setupTest(
      1500,
      false
    );

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
    const { provider, wallet1, request, baseAssetId } = await setupTest(1500, false);

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
