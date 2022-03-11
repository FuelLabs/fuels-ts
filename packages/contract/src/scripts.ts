import type { BytesLike } from '@ethersproject/bytes';
import { arrayify, concat } from '@ethersproject/bytes';
import { NumberCoder } from '@fuel-ts/abi-coder';
import { Script, ReceiptType } from '@fuel-ts/providers';

/**
 * A script that calls contracts
 *
 * Accepts a contract ID and function data
 * Returns function result
 */
export const contractCallScript = new Script<[contractId: BytesLike, data: BytesLike], Uint8Array>(
  /*
    Opcode::ADDI(0x10, REG_ZERO, script_data_offset)
    Opcode::CALL(0x10, REG_ZERO, 0x10, REG_CGAS)
    Opcode::RET(REG_RET)
    Opcode::NOOP
  */
  '0x504001e82d40040a2434000047000000',
  ([contractId, data]) => {
    // Decode data in internal format
    const dataArray = arrayify(data);
    const functionSelector = dataArray.slice(0, 8);
    const isStructArg = dataArray.slice(8, 16).some((b) => b === 0x01);
    const arg = dataArray.slice(16);

    // Encode data in script format
    let scriptData;
    if (isStructArg) {
      scriptData = concat([
        contractId,
        functionSelector,
        new NumberCoder('', 'u64').encode(contractCallScript.getArgOffset()),
        arg,
      ]);
    } else {
      scriptData = concat([contractId, functionSelector, arg]);
    }

    return scriptData;
  },
  (result) => {
    if (result.receipts.length < 3) {
      throw new Error('Expected at least 3 receipts');
    }
    const returnReceipt = result.receipts[result.receipts.length - 3];
    switch (returnReceipt.type) {
      case ReceiptType.Return: {
        // The receipt doesn't have the expected encoding, so encode it manually
        const returnValue = new NumberCoder('', 'u64').encode(returnReceipt.val);

        return returnValue;
      }
      case ReceiptType.ReturnData: {
        return arrayify(returnReceipt.data);
      }
      default: {
        throw new Error('Invalid receipt type');
      }
    }
  }
);
