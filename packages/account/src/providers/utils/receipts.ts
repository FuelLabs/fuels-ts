import { ZeroBytes32 } from '@fuel-ts/address/configs';
import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { bn } from '@fuel-ts/math';
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
import { getMintedAssetId, InputMessageCoder, ReceiptType } from '@fuel-ts/transactions';
import { FAILED_TRANSFER_TO_ADDRESS_SIGNAL } from '@fuel-ts/transactions/configs';
import { arrayify, hexlify } from '@fuel-ts/utils';

import type { GqlReceiptFragment } from '../__generated__/operations';
import { GqlReceiptType } from '../__generated__/operations';
import type { TransactionResultReceipt } from '../transaction-response';

/** @hidden */
const doesReceiptHaveMissingOutputVariables = (
  receipt: TransactionResultReceipt
): receipt is ReceiptRevert =>
  receipt.type === ReceiptType.Revert &&
  receipt.val.toString('hex') === FAILED_TRANSFER_TO_ADDRESS_SIGNAL;

/** @hidden */
const doesReceiptHaveMissingContractId = (
  receipt: TransactionResultReceipt
): receipt is ReceiptPanic =>
  receipt.type === ReceiptType.Panic &&
  receipt.contractId !== '0x0000000000000000000000000000000000000000000000000000000000000000';

/** @hidden */
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

const hexOrZero = (hex?: string | null) => hex || ZeroBytes32;

export function assembleReceiptByType(receipt: GqlReceiptFragment) {
  const { receiptType } = receipt;

  switch (receiptType) {
    case GqlReceiptType.Call: {
      const id = hexOrZero(receipt.id || receipt.contractId);
      const callReceipt: ReceiptCall = {
        type: ReceiptType.Call,
        id,
        to: hexOrZero(receipt?.to),
        amount: bn(receipt.amount),
        assetId: hexOrZero(receipt.assetId),
        gas: bn(receipt.gas),
        param1: bn(receipt.param1),
        param2: bn(receipt.param2),
        pc: bn(receipt.pc),
        is: bn(receipt.is),
      };

      return callReceipt;
    }

    case GqlReceiptType.Return: {
      const returnReceipt: ReceiptReturn = {
        type: ReceiptType.Return,
        id: hexOrZero(receipt.id || receipt.contractId),
        val: bn(receipt.val),
        pc: bn(receipt.pc),
        is: bn(receipt.is),
      };

      return returnReceipt;
    }

    case GqlReceiptType.ReturnData: {
      const returnDataReceipt: ReceiptReturnData = {
        type: ReceiptType.ReturnData,
        id: hexOrZero(receipt.id || receipt.contractId),
        ptr: bn(receipt.ptr),
        len: bn(receipt.len),
        digest: hexOrZero(receipt.digest),
        pc: bn(receipt.pc),
        data: hexOrZero(receipt.data),
        is: bn(receipt.is),
      };

      return returnDataReceipt;
    }

    case GqlReceiptType.Panic: {
      const panicReceipt: ReceiptPanic = {
        type: ReceiptType.Panic,
        id: hexOrZero(receipt.id),
        reason: bn(receipt.reason),
        pc: bn(receipt.pc),
        is: bn(receipt.is),
        contractId: hexOrZero(receipt.contractId),
      };

      return panicReceipt;
    }

    case GqlReceiptType.Revert: {
      const revertReceipt: ReceiptRevert = {
        type: ReceiptType.Revert,
        id: hexOrZero(receipt.id || receipt.contractId),
        val: bn(receipt.ra),
        pc: bn(receipt.pc),
        is: bn(receipt.is),
      };
      return revertReceipt;
    }

    case GqlReceiptType.Log: {
      const ra = bn(receipt.ra);
      const rb = bn(receipt.rb);
      const rc = bn(receipt.rc);
      const rd = bn(receipt.rd);

      const logReceipt: ReceiptLog = {
        type: ReceiptType.Log,
        id: hexOrZero(receipt.id || receipt.contractId),
        ra,
        rb,
        rc,
        rd,
        pc: bn(receipt.pc),
        is: bn(receipt.is),
      };

      return logReceipt;
    }

    case GqlReceiptType.LogData: {
      const ra = bn(receipt.ra);
      const rb = bn(receipt.rb);
      const logDataReceipt: ReceiptLogData = {
        type: ReceiptType.LogData,
        id: hexOrZero(receipt.id || receipt.contractId),
        ra,
        rb,
        ptr: bn(receipt.ptr),
        len: bn(receipt.len),
        digest: hexOrZero(receipt.digest),
        pc: bn(receipt.pc),
        data: hexOrZero(receipt.data),
        is: bn(receipt.is),
      };
      return logDataReceipt;
    }

    case GqlReceiptType.Transfer: {
      const id = hexOrZero(receipt.id || receipt.contractId);
      const transferReceipt: ReceiptTransfer = {
        type: ReceiptType.Transfer,
        id,
        to: hexOrZero(receipt.toAddress || receipt?.to),
        amount: bn(receipt.amount),
        assetId: hexOrZero(receipt.assetId),
        pc: bn(receipt.pc),
        is: bn(receipt.is),
      };

      return transferReceipt;
    }

    case GqlReceiptType.TransferOut: {
      const id = hexOrZero(receipt.id || receipt.contractId);
      const transferOutReceipt: ReceiptTransferOut = {
        type: ReceiptType.TransferOut,
        id,
        to: hexOrZero(receipt.toAddress || receipt.to),
        amount: bn(receipt.amount),
        assetId: hexOrZero(receipt.assetId),
        pc: bn(receipt.pc),
        is: bn(receipt.is),
      };
      return transferOutReceipt;
    }

    case GqlReceiptType.ScriptResult: {
      const scriptResultReceipt: ReceiptScriptResult = {
        type: ReceiptType.ScriptResult,
        result: bn(receipt.result),
        gasUsed: bn(receipt.gasUsed),
      };

      return scriptResultReceipt;
    }

    case GqlReceiptType.MessageOut: {
      const sender = hexOrZero(receipt.sender);
      const recipient = hexOrZero(receipt.recipient);
      const nonce = hexOrZero(receipt.nonce);
      const amount = bn(receipt.amount);
      const data = receipt.data ? arrayify(receipt.data) : Uint8Array.from([]);
      const digest = hexOrZero(receipt.digest);
      const len = bn(receipt.len).toNumber();

      const messageId = InputMessageCoder.getMessageId({
        sender,
        recipient,
        nonce,
        amount,
        data: hexlify(data),
      });

      const receiptMessageOut: ReceiptMessageOut = {
        type: ReceiptType.MessageOut,
        sender,
        recipient,
        amount,
        nonce,
        len,
        data,
        digest,
        messageId,
      };

      return receiptMessageOut;
    }

    case GqlReceiptType.Mint: {
      const contractId = hexOrZero(receipt.id || receipt.contractId);
      const subId = hexOrZero(receipt.subId);
      const assetId = getMintedAssetId(contractId, subId);

      const mintReceipt: ReceiptMint = {
        type: ReceiptType.Mint,
        subId,
        contractId,
        assetId,
        val: bn(receipt.val),
        pc: bn(receipt.pc),
        is: bn(receipt.is),
      };

      return mintReceipt;
    }

    case GqlReceiptType.Burn: {
      const contractId = hexOrZero(receipt.id || receipt.contractId);
      const subId = hexOrZero(receipt.subId);
      const assetId = getMintedAssetId(contractId, subId);

      const burnReceipt: ReceiptBurn = {
        type: ReceiptType.Burn,
        subId,
        contractId,
        assetId,
        val: bn(receipt.val),
        pc: bn(receipt.pc),
        is: bn(receipt.is),
      };

      return burnReceipt;
    }

    default:
      throw new FuelError(ErrorCode.INVALID_RECEIPT_TYPE, `Invalid receipt type: ${receiptType}.`);
  }
}
