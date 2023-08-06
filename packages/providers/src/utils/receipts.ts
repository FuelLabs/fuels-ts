import { arrayify } from '@ethersproject/bytes';
import { ZeroBytes32 } from '@fuel-ts/address/configs';
import { BN } from '@fuel-ts/math';
import type {
  ReceiptBurn,
  ReceiptCall,
  ReceiptLog,
  ReceiptLogData,
  ReceiptMessageOut,
  ReceiptMint,
  ReceiptPanic,
  ReceiptReturn,
  ReceiptReturnData,
  ReceiptRevert,
  ReceiptScriptResult,
  ReceiptTransfer,
  ReceiptTransferOut,
} from '@fuel-ts/transactions';
import {
  ReceiptBurnCoder,
  ReceiptMessageOutCoder,
  ReceiptMintCoder,
  ReceiptType,
} from '@fuel-ts/transactions';
import { FAILED_TRANSFER_TO_ADDRESS_SIGNAL } from '@fuel-ts/transactions/configs';

import type { GqlReceiptFragmentFragment } from '../__generated__/operations';
import { GqlReceiptType } from '../__generated__/operations';
import type { TransactionResultReceipt } from '../transaction-response';

const doesReceiptHaveMissingOutputVariables = (
  receipt: TransactionResultReceipt
): receipt is ReceiptRevert =>
  receipt.type === ReceiptType.Revert &&
  receipt.val.toString('hex') === FAILED_TRANSFER_TO_ADDRESS_SIGNAL;

const doesReceiptHaveMissingContractId = (
  receipt: TransactionResultReceipt
): receipt is ReceiptPanic =>
  receipt.type === ReceiptType.Panic &&
  receipt.contractId !== '0x0000000000000000000000000000000000000000000000000000000000000000';

export const getReceiptsWithMissingData = (receipts: Array<TransactionResultReceipt>) =>
  receipts.reduce<{
    missingOutputVariables: Array<ReceiptRevert>;
    missingOutputContractIds: Array<ReceiptPanic>;
  }>(
    (memo, receipt) => {
      if (doesReceiptHaveMissingOutputVariables(receipt)) {
        memo.missingOutputVariables.push(receipt);
      }
      if (doesReceiptHaveMissingContractId(receipt)) {
        memo.missingOutputContractIds.push(receipt);
      }
      return memo;
    },
    {
      missingOutputVariables: [],
      missingOutputContractIds: [],
    }
  );

export function assembleReceiptByType(receipt: GqlReceiptFragmentFragment) {
  switch (receipt.receiptType) {
    case GqlReceiptType.Call:
      return {
        type: ReceiptType.Call,
        from: receipt.contract?.id || ZeroBytes32,
        to: receipt?.to?.id || ZeroBytes32,
        amount: new BN(receipt.amount || 0),
        assetId: receipt.assetId || ZeroBytes32,
        gas: new BN(receipt.gas || 0),
        param1: new BN(receipt.param1 || 0),
        param2: new BN(receipt.param2 || 0),
        pc: new BN(receipt.pc || 0),
        is: new BN(receipt.is || 0),
      } as ReceiptCall;

    case GqlReceiptType.Return:
      return {
        type: ReceiptType.Return,
        id: receipt.contract?.id || ZeroBytes32,
        val: new BN(receipt.val || 0),
        pc: new BN(receipt.pc || 0),
        is: new BN(receipt.is || 0),
      } as ReceiptReturn;

    case GqlReceiptType.ReturnData:
      return {
        type: ReceiptType.ReturnData,
        id: receipt.contract?.id || ZeroBytes32,
        ptr: new BN(receipt.ptr || 0),
        len: new BN(receipt.len || 0),
        digest: receipt.digest || ZeroBytes32,
        pc: new BN(receipt.pc || 0),
        is: new BN(receipt.is || 0),
      } as ReceiptReturnData;

    case GqlReceiptType.Panic:
      return {
        type: ReceiptType.Panic,
        id: receipt.contract?.id || ZeroBytes32,
        reason: new BN(receipt.reason || 0),
        pc: new BN(receipt.pc || 0),
        is: new BN(receipt.is || 0),
        contractId: receipt.contractId || ZeroBytes32,
      } as ReceiptPanic;

    case GqlReceiptType.Revert:
      return {
        type: ReceiptType.Revert,
        id: receipt.contract?.id || ZeroBytes32,
        val: new BN(receipt.ra || 0),
        pc: new BN(receipt.pc || 0),
        is: new BN(receipt.is || 0),
      } as ReceiptRevert;

    case GqlReceiptType.Log:
      return {
        type: ReceiptType.Log,
        id: receipt.contract?.id || ZeroBytes32,
        val0: new BN(receipt.ra || 0),
        val1: new BN(receipt.rb || 0),
        val2: new BN(receipt.rc || 0),
        val3: new BN(receipt.rd || 0),
        pc: new BN(receipt.pc || 0),
        is: new BN(receipt.is || 0),
      } as ReceiptLog;

    case GqlReceiptType.LogData:
      return {
        type: ReceiptType.LogData,
        id: receipt.contract?.id || ZeroBytes32,
        val0: new BN(receipt.ra || 0),
        val1: new BN(receipt.rb || 0),
        ptr: new BN(receipt.ptr || 0),
        len: new BN(receipt.len || 0),
        digest: receipt.digest || ZeroBytes32,
        pc: new BN(receipt.pc || 0),
        is: new BN(receipt.is || 0),
      } as ReceiptLogData;

    case GqlReceiptType.Transfer:
      return {
        type: ReceiptType.Transfer,
        from: receipt.contract?.id || ZeroBytes32,
        to: receipt?.to?.id || ZeroBytes32,
        amount: new BN(receipt.amount || 0),
        assetId: receipt.assetId || ZeroBytes32,
        pc: new BN(receipt.pc || 0),
        is: new BN(receipt.is || 0),
      } as ReceiptTransfer;

    case GqlReceiptType.TransferOut:
      return {
        type: ReceiptType.TransferOut,
        from: receipt.contract?.id || ZeroBytes32,
        to: receipt?.to?.id || ZeroBytes32,
        amount: new BN(receipt.amount || 0),
        assetId: receipt.assetId || ZeroBytes32,
        pc: new BN(receipt.pc || 0),
        is: new BN(receipt.is || 0),
      } as ReceiptTransferOut;

    case GqlReceiptType.ScriptResult:
      return {
        type: ReceiptType.ScriptResult,
        result: new BN(receipt.result || 0),
        gasUsed: new BN(receipt.gasUsed || 0),
      } as ReceiptScriptResult;

    case GqlReceiptType.MessageOut: {
      const sender = receipt.sender || ZeroBytes32;
      const recipient = receipt.recipient || ZeroBytes32;
      const nonce = receipt.nonce || ZeroBytes32;
      const amount = new BN(receipt.amount || 0);
      const data = receipt.data ? arrayify(receipt.data) : Uint8Array.from([]);

      const messageId = ReceiptMessageOutCoder.getMessageId({
        sender,
        recipient,
        nonce,
        amount,
        data,
      });

      const receiptMessageOut: ReceiptMessageOut = {
        type: ReceiptType.MessageOut,
        sender,
        recipient,
        amount,
        nonce,
        data,
        digest: receipt.digest || ZeroBytes32,
        messageId,
      };

      return receiptMessageOut;
    }

    case GqlReceiptType.Mint: {
      const contractId = receipt.contract?.id || ZeroBytes32;
      const subId = receipt.subId || ZeroBytes32;
      const assetId = ReceiptMintCoder.getMessageId(contractId, subId);

      const mintReceipt: ReceiptMint = {
        type: ReceiptType.Mint,
        subId,
        contractId,
        assetId,
        val: new BN(receipt.val || 0),
        pc: new BN(receipt.pc || 0),
        is: new BN(receipt.is || 0),
      };

      return mintReceipt;
    }

    case GqlReceiptType.Burn: {
      const contractId = receipt.contract?.id || ZeroBytes32;
      const subId = receipt.subId || ZeroBytes32;
      const assetId = ReceiptBurnCoder.getMessageId(contractId, subId);

      const burnReceipt: ReceiptBurn = {
        type: ReceiptType.Burn,
        subId,
        contractId,
        assetId,
        val: new BN(receipt.val || 0),
        pc: new BN(receipt.pc || 0),
        is: new BN(receipt.is || 0),
      };

      return burnReceipt;
    }

    default:
      throw new Error('Unknown receipt type');
  }
}
