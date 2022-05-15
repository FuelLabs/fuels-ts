import type { BytesLike } from '@ethersproject/bytes';
import { hexlify, arrayify, concat } from '@ethersproject/bytes';
import { B256Coder, NumberCoder } from '@fuel-ts/abi-coder';
import { NativeAssetId } from '@fuel-ts/constants';
import type { BigNumberish } from '@fuel-ts/math';
import { Script, ReceiptType } from '@fuel-ts/providers';

import contractCallScriptBin from './contract-call-script';

/**
 * A script that calls contracts
 *
 * Accepts a contract ID and function data
 * Returns function result
 */
export const contractCallScript = new Script<
  { contractId: BytesLike; assetId?: BytesLike; amount?: BigNumberish; data: BytesLike },
  Uint8Array
>(
  // Script to call the contract
  contractCallScriptBin,
  ({ contractId, amount, assetId, data }) => {
    // Decode data in internal format
    const dataArray = arrayify(data);
    const functionSelector = dataArray.slice(0, 8);
    const isReferenceType = dataArray.slice(8, 16).some((b) => b === 0x01);
    const args = dataArray.slice(16);

    // Encode data in script format
    let scriptData = [
      // Insert asset_id to be forwarded
      new B256Coder('b256', 'b256').encode(hexlify(assetId || NativeAssetId)),
      // Insert amount to be forwarded
      new NumberCoder('', 'u64').encode(BigInt(amount ?? 0)),
      // Contract id
      contractId,
      // Function selector
      functionSelector,
    ];

    if (isReferenceType) {
      // Insert data offset to custom argument types
      scriptData = scriptData.concat(
        new NumberCoder('', 'u64').encode(contractCallScript.getArgOffset())
      );
    }

    // Encode script data
    return concat(
      // Insert arguments
      scriptData.concat(args)
    );
  },
  (result) => {
    if (result.code !== 0n) {
      throw new Error(`Script returned non-zero result: ${result.code}`);
    }
    const contractReturnReceipt = result.receipts.pop();
    if (!contractReturnReceipt) {
      throw new Error(`Expected contractReturnReceipt`);
    }
    switch (contractReturnReceipt.type) {
      case ReceiptType.Return: {
        // The receipt doesn't have the expected encoding, so encode it manually
        const returnValue = new NumberCoder('', 'u64').encode(contractReturnReceipt.val);
        return returnValue;
      }
      case ReceiptType.ReturnData: {
        return arrayify(contractReturnReceipt.data);
      }
      default: {
        throw new Error(`Invalid contractReturnReceipt type: ${contractReturnReceipt.type}`);
      }
    }
  }
);
