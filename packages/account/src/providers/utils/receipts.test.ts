import { BN, bn } from '@fuel-ts/math';
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
import { getMintedAssetId, getMessageId, ReceiptType } from '@fuel-ts/transactions';
import { arrayify } from '@fuel-ts/utils';

import {
  MOCK_GQL_RECEIPT_FRAGMENT,
  MOCK_GQL_RECEIPT_FRAGMENT_TO_ADDRESS,
} from '../../../test/fixtures/receipts';
import { GqlReceiptType } from '../__generated__/operations';

import { assembleReceiptByType } from './receipts';

/**
 * @group node
 */
describe('assembleReceiptByType', () => {
  it('should return a ReceiptCall receipt when GqlReceiptType.Call is provided', () => {
    const receipt = assembleReceiptByType({
      ...MOCK_GQL_RECEIPT_FRAGMENT,
      receiptType: GqlReceiptType.Call,
    }) as ReceiptCall;

    expect(receipt.type).toBe(ReceiptType.Call);
    expect(receipt.assetId).toStrictEqual(MOCK_GQL_RECEIPT_FRAGMENT.assetId);
    expect(receipt.from).toStrictEqual(MOCK_GQL_RECEIPT_FRAGMENT.contractId);
    expect(receipt.to).toStrictEqual(MOCK_GQL_RECEIPT_FRAGMENT.to);
    expect(receipt.amount).toStrictEqual(new BN(MOCK_GQL_RECEIPT_FRAGMENT.amount));
    expect(receipt.gas).toStrictEqual(new BN(MOCK_GQL_RECEIPT_FRAGMENT.gas));
    expect(receipt.is).toStrictEqual(new BN(MOCK_GQL_RECEIPT_FRAGMENT.is));
    expect(receipt.param1).toStrictEqual(new BN(MOCK_GQL_RECEIPT_FRAGMENT.param1));
    expect(receipt.param2).toStrictEqual(new BN(MOCK_GQL_RECEIPT_FRAGMENT.param2));
    expect(receipt.pc).toStrictEqual(new BN(MOCK_GQL_RECEIPT_FRAGMENT.pc));
  });

  it('should return a ReceiptReturn receipt when GqlReceiptType.Return is provided', () => {
    const receipt = assembleReceiptByType({
      ...MOCK_GQL_RECEIPT_FRAGMENT,
      receiptType: GqlReceiptType.Return,
    }) as ReceiptReturn;

    expect(receipt.type).toBe(ReceiptType.Return);
    expect(receipt.id).toStrictEqual(MOCK_GQL_RECEIPT_FRAGMENT.contractId);
    expect(receipt.is).toStrictEqual(new BN(MOCK_GQL_RECEIPT_FRAGMENT.is));
    expect(receipt.pc).toStrictEqual(new BN(MOCK_GQL_RECEIPT_FRAGMENT.pc));
    expect(receipt.val).toStrictEqual(new BN(MOCK_GQL_RECEIPT_FRAGMENT.val));
  });

  it('should return a ReceiptReturnData receipt when GqlReceiptType.ReturnData is provided', () => {
    const receipt = assembleReceiptByType({
      ...MOCK_GQL_RECEIPT_FRAGMENT,
      receiptType: GqlReceiptType.ReturnData,
    }) as ReceiptReturnData;

    expect(receipt.type).toBe(ReceiptType.ReturnData);
    expect(receipt.id).toStrictEqual(MOCK_GQL_RECEIPT_FRAGMENT.contractId);
    expect(receipt.digest).toStrictEqual(MOCK_GQL_RECEIPT_FRAGMENT.digest);
    expect(receipt.len).toStrictEqual(new BN(MOCK_GQL_RECEIPT_FRAGMENT.len));
    expect(receipt.is).toStrictEqual(new BN(MOCK_GQL_RECEIPT_FRAGMENT.is));
    expect(receipt.pc).toStrictEqual(new BN(MOCK_GQL_RECEIPT_FRAGMENT.pc));
    expect(receipt.data).toStrictEqual(MOCK_GQL_RECEIPT_FRAGMENT.data);
    expect(receipt.ptr).toStrictEqual(new BN(MOCK_GQL_RECEIPT_FRAGMENT.ptr));
  });

  it('should return a ReceiptPanic receipt when GqlReceiptType.Panic is provided', () => {
    const receipt = assembleReceiptByType({
      ...MOCK_GQL_RECEIPT_FRAGMENT,
      receiptType: GqlReceiptType.Panic,
    }) as ReceiptPanic;

    expect(receipt.type).toBe(ReceiptType.Panic);
    expect(receipt.id).toEqual(MOCK_GQL_RECEIPT_FRAGMENT.contractId);
    expect(receipt.contractId).toEqual(MOCK_GQL_RECEIPT_FRAGMENT.contractId);
    expect(receipt.is).toStrictEqual(new BN(MOCK_GQL_RECEIPT_FRAGMENT.is));
    expect(receipt.pc).toStrictEqual(new BN(MOCK_GQL_RECEIPT_FRAGMENT.pc));
    expect(receipt.reason).toStrictEqual(new BN(MOCK_GQL_RECEIPT_FRAGMENT.reason));
  });

  it('should return a ReceiptRevert receipt when GqlReceiptType.Revert is provided', () => {
    const receipt = assembleReceiptByType({
      ...MOCK_GQL_RECEIPT_FRAGMENT,
      receiptType: GqlReceiptType.Revert,
    }) as ReceiptRevert;

    expect(receipt.type).toBe(ReceiptType.Revert);
    expect(receipt.id).toStrictEqual(MOCK_GQL_RECEIPT_FRAGMENT.contractId);
    expect(receipt.val).toStrictEqual(new BN(MOCK_GQL_RECEIPT_FRAGMENT.ra));
    expect(receipt.is).toStrictEqual(new BN(MOCK_GQL_RECEIPT_FRAGMENT.is));
    expect(receipt.pc).toStrictEqual(new BN(MOCK_GQL_RECEIPT_FRAGMENT.pc));
  });

  it('should return a ReceiptLog receipt when GqlReceiptType.Log is provided', () => {
    const receipt = assembleReceiptByType({
      ...MOCK_GQL_RECEIPT_FRAGMENT,
      receiptType: GqlReceiptType.Log,
    }) as ReceiptLog;

    expect(receipt.type).toBe(ReceiptType.Log);
    expect(receipt.id).toStrictEqual(MOCK_GQL_RECEIPT_FRAGMENT.contractId);
    expect(receipt.is).toStrictEqual(new BN(MOCK_GQL_RECEIPT_FRAGMENT.is));
    expect(receipt.pc).toStrictEqual(new BN(MOCK_GQL_RECEIPT_FRAGMENT.pc));
    expect(receipt.val0).toStrictEqual(new BN(MOCK_GQL_RECEIPT_FRAGMENT.ra));
    expect(receipt.val1).toStrictEqual(new BN(MOCK_GQL_RECEIPT_FRAGMENT.rb));
    expect(receipt.val2).toStrictEqual(new BN(MOCK_GQL_RECEIPT_FRAGMENT.rc));
    expect(receipt.val3).toStrictEqual(new BN(MOCK_GQL_RECEIPT_FRAGMENT.rd));
  });

  it('should return a ReceiptLogData receipt when GqlReceiptType.LogData is provided', () => {
    const receipt = assembleReceiptByType({
      ...MOCK_GQL_RECEIPT_FRAGMENT,
      receiptType: GqlReceiptType.LogData,
    }) as ReceiptLogData;

    expect(receipt.type).toBe(ReceiptType.LogData);
    expect(receipt.id).toStrictEqual(MOCK_GQL_RECEIPT_FRAGMENT.contractId);
    expect(receipt.digest).toStrictEqual(MOCK_GQL_RECEIPT_FRAGMENT.digest);
    expect(receipt.is).toStrictEqual(new BN(MOCK_GQL_RECEIPT_FRAGMENT.is));
    expect(receipt.pc).toStrictEqual(new BN(MOCK_GQL_RECEIPT_FRAGMENT.pc));
    expect(receipt.ptr).toStrictEqual(new BN(MOCK_GQL_RECEIPT_FRAGMENT.ptr));
    expect(receipt.len).toStrictEqual(new BN(MOCK_GQL_RECEIPT_FRAGMENT.len));
    expect(receipt.val0).toStrictEqual(new BN(MOCK_GQL_RECEIPT_FRAGMENT.ra));
    expect(receipt.val1).toStrictEqual(new BN(MOCK_GQL_RECEIPT_FRAGMENT.rb));
    expect(receipt.data).toStrictEqual(MOCK_GQL_RECEIPT_FRAGMENT.data);
  });

  it('should return a ReceiptTransfer receipt when GqlReceiptType.Transfer is provided', () => {
    const receipt = assembleReceiptByType({
      ...MOCK_GQL_RECEIPT_FRAGMENT,
      receiptType: GqlReceiptType.Transfer,
    }) as ReceiptTransfer;

    expect(receipt.type).toBe(ReceiptType.Transfer);
    expect(receipt.from).toStrictEqual(MOCK_GQL_RECEIPT_FRAGMENT.contractId);
    expect(receipt.to).toStrictEqual(MOCK_GQL_RECEIPT_FRAGMENT.to);
    expect(receipt.assetId).toStrictEqual(MOCK_GQL_RECEIPT_FRAGMENT.assetId);
    expect(receipt.is).toStrictEqual(new BN(MOCK_GQL_RECEIPT_FRAGMENT.is));
    expect(receipt.pc).toStrictEqual(new BN(MOCK_GQL_RECEIPT_FRAGMENT.pc));
    expect(receipt.amount).toStrictEqual(new BN(MOCK_GQL_RECEIPT_FRAGMENT.amount));
  });

  it('should return a ReceiptTransfer receipt when GqlReceiptType.Transfer to address is provided', () => {
    const receipt = assembleReceiptByType({
      ...MOCK_GQL_RECEIPT_FRAGMENT_TO_ADDRESS,
      receiptType: GqlReceiptType.TransferOut,
    }) as ReceiptTransferOut;

    expect(receipt.type).toBe(ReceiptType.TransferOut);
    expect(receipt.from).toStrictEqual(MOCK_GQL_RECEIPT_FRAGMENT_TO_ADDRESS.contractId);
    expect(receipt.to).toStrictEqual(MOCK_GQL_RECEIPT_FRAGMENT_TO_ADDRESS.toAddress);
    expect(receipt.assetId).toStrictEqual(MOCK_GQL_RECEIPT_FRAGMENT_TO_ADDRESS.assetId);
    expect(receipt.is).toStrictEqual(new BN(MOCK_GQL_RECEIPT_FRAGMENT_TO_ADDRESS.is));
    expect(receipt.pc).toStrictEqual(new BN(MOCK_GQL_RECEIPT_FRAGMENT_TO_ADDRESS.pc));
    expect(receipt.amount).toStrictEqual(new BN(MOCK_GQL_RECEIPT_FRAGMENT_TO_ADDRESS.amount));
  });

  it('should return a ReceiptTransferOut receipt when GqlReceiptType.TransferOut is provided', () => {
    const receipt = assembleReceiptByType({
      ...MOCK_GQL_RECEIPT_FRAGMENT,
      receiptType: GqlReceiptType.TransferOut,
    }) as ReceiptTransferOut;

    expect(receipt.type).toBe(ReceiptType.TransferOut);
    expect(receipt.from).toStrictEqual(MOCK_GQL_RECEIPT_FRAGMENT.contractId);
    expect(receipt.to).toStrictEqual(MOCK_GQL_RECEIPT_FRAGMENT.to);
    expect(receipt.assetId).toStrictEqual(MOCK_GQL_RECEIPT_FRAGMENT.assetId);
    expect(receipt.is).toStrictEqual(new BN(MOCK_GQL_RECEIPT_FRAGMENT.is));
    expect(receipt.pc).toStrictEqual(new BN(MOCK_GQL_RECEIPT_FRAGMENT.pc));
    expect(receipt.amount).toStrictEqual(new BN(MOCK_GQL_RECEIPT_FRAGMENT.amount));
  });

  it('should return a ReceiptTransferOut receipt when GqlReceiptType.TransferOut to an address is provided', () => {
    const receipt = assembleReceiptByType({
      ...MOCK_GQL_RECEIPT_FRAGMENT_TO_ADDRESS,
      receiptType: GqlReceiptType.TransferOut,
    }) as ReceiptTransferOut;

    expect(receipt.type).toBe(ReceiptType.TransferOut);
    expect(receipt.from).toStrictEqual(MOCK_GQL_RECEIPT_FRAGMENT_TO_ADDRESS.contractId);
    expect(receipt.to).toStrictEqual(MOCK_GQL_RECEIPT_FRAGMENT_TO_ADDRESS.toAddress);
    expect(receipt.assetId).toStrictEqual(MOCK_GQL_RECEIPT_FRAGMENT_TO_ADDRESS.assetId);
    expect(receipt.is).toStrictEqual(new BN(MOCK_GQL_RECEIPT_FRAGMENT_TO_ADDRESS.is));
    expect(receipt.pc).toStrictEqual(new BN(MOCK_GQL_RECEIPT_FRAGMENT_TO_ADDRESS.pc));
    expect(receipt.amount).toStrictEqual(new BN(MOCK_GQL_RECEIPT_FRAGMENT_TO_ADDRESS.amount));
  });

  it('should return a ReceiptScriptResult when GqlReceiptType.ScriptResult is provided', () => {
    const receipt = assembleReceiptByType({
      ...MOCK_GQL_RECEIPT_FRAGMENT,
      receiptType: GqlReceiptType.ScriptResult,
    }) as ReceiptScriptResult;

    expect(receipt.type).toBe(ReceiptType.ScriptResult);
    expect(receipt.result).toStrictEqual(new BN(MOCK_GQL_RECEIPT_FRAGMENT.result));
    expect(receipt.gasUsed).toStrictEqual(new BN(MOCK_GQL_RECEIPT_FRAGMENT.gasUsed));
  });

  it('should return a ReceiptMessageOut when GqlReceiptType.MessageOut is provided', () => {
    const receipt = assembleReceiptByType({
      ...MOCK_GQL_RECEIPT_FRAGMENT,
      receiptType: GqlReceiptType.MessageOut,
    }) as ReceiptMessageOut;

    const sender = MOCK_GQL_RECEIPT_FRAGMENT.sender || '';
    const recipient = MOCK_GQL_RECEIPT_FRAGMENT.recipient || '';
    const nonce = MOCK_GQL_RECEIPT_FRAGMENT.nonce || '';
    const amount = bn(MOCK_GQL_RECEIPT_FRAGMENT.amount);
    const data = arrayify(MOCK_GQL_RECEIPT_FRAGMENT.data || '');
    const digest = MOCK_GQL_RECEIPT_FRAGMENT.digest;
    const len = Number(MOCK_GQL_RECEIPT_FRAGMENT.len);

    const messageId = getMessageId({
      sender,
      recipient,
      nonce,
      amount,
      data,
    });

    expect(receipt.type).toBe(ReceiptType.MessageOut);
    expect(receipt.amount).toStrictEqual(amount);
    expect(receipt.digest).toStrictEqual(digest);
    expect(receipt.messageId).toStrictEqual(messageId);
    expect(receipt.nonce).toStrictEqual(nonce);
    expect(receipt.recipient).toStrictEqual(recipient);
    expect(receipt.sender).toStrictEqual(sender);
    expect(receipt.len).toStrictEqual(len);
    expect(receipt.data).toStrictEqual(data);
  });

  it('should return a ReceiptMint when GqlReceiptType.Mint is provided', () => {
    const contractId = MOCK_GQL_RECEIPT_FRAGMENT.id || '';
    const subId = MOCK_GQL_RECEIPT_FRAGMENT.subId || '';
    const assetId = getMintedAssetId(contractId, subId);

    const receipt = assembleReceiptByType({
      ...MOCK_GQL_RECEIPT_FRAGMENT,
      receiptType: GqlReceiptType.Mint,
    }) as ReceiptMint;

    expect(receipt.type).toBe(ReceiptType.Mint);
    expect(receipt.contractId).toStrictEqual(contractId);
    expect(receipt.subId).toStrictEqual(subId);
    expect(receipt.assetId).toStrictEqual(assetId);
    expect(receipt.is).toStrictEqual(new BN(MOCK_GQL_RECEIPT_FRAGMENT.is));
    expect(receipt.pc).toStrictEqual(new BN(MOCK_GQL_RECEIPT_FRAGMENT.pc));
    expect(receipt.val).toStrictEqual(new BN(MOCK_GQL_RECEIPT_FRAGMENT.val));
  });

  it('should return a ReceiptBurn when GqlReceiptType.Burn is provided', () => {
    const contractId = MOCK_GQL_RECEIPT_FRAGMENT.id || '';
    const subId = MOCK_GQL_RECEIPT_FRAGMENT.subId || '';
    const assetId = getMintedAssetId(contractId, subId);

    const receipt = assembleReceiptByType({
      ...MOCK_GQL_RECEIPT_FRAGMENT,
      receiptType: GqlReceiptType.Burn,
    }) as ReceiptBurn;

    expect(receipt.type).toBe(ReceiptType.Burn);
    expect(receipt.contractId).toStrictEqual(contractId);
    expect(receipt.subId).toStrictEqual(subId);
    expect(receipt.assetId).toStrictEqual(assetId);
    expect(receipt.is).toStrictEqual(new BN(MOCK_GQL_RECEIPT_FRAGMENT.is));
    expect(receipt.pc).toStrictEqual(new BN(MOCK_GQL_RECEIPT_FRAGMENT.pc));
    expect(receipt.val).toStrictEqual(new BN(MOCK_GQL_RECEIPT_FRAGMENT.val));
  });
});
