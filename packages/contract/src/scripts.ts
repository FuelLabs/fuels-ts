import type { BigNumberish } from '@ethersproject/bignumber';
import { BigNumber } from '@ethersproject/bignumber';
import type { BytesLike } from '@ethersproject/bytes';
import { arrayify, concat, zeroPad } from '@ethersproject/bytes';
import { NumberCoder } from '@fuel-ts/abi-coder';
import { NativeAssetId } from '@fuel-ts/constants';
import { Script, ReceiptType } from '@fuel-ts/providers';

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
  /*
    Script to call the contract.
    We use the Opcode to call a contract: `CALL` pointing at the
    following registers;

    0x10 Script data offset
    0x11 Gas price TODO: https://github.com/FuelLabs/fuels-ts/issues/204
    0x12 Coin amount
    0x13 Asset ID

    Note that these are soft rules as we're picking this addresses simply because they
    non-reserved register.

    // Load call data to 0x10.
    Opcode::MOVI(0x10, data_offset + forward_data_offset as Immediate18),
    // Load gas forward to 0x11.
    // Load word into 0x12
    Opcode::MOVI(
      0x12,
      ((data_offset as usize) + ContractId::LEN) as Immediate18
    ),
    // Load the amount into 0x12
    Opcode::LW(0x12, 0x12, 0),
    // Load the asset id to use to 0x13.
    Opcode::MOVI(0x13, data_offset),
    // Call the transfer contract.
    Opcode::CALL(0x10, 0x12, 0x13, REG_CGAS),
    Opcode::RET(REG_ONE),
  */
  '0x724028b0724828a85d492000724c28882d4124ca24040000',
  ({ contractId, amount, assetId, data }) => {
    // Decode data in internal format
    const dataArray = arrayify(data);
    const functionSelector = dataArray.slice(0, 8);
    const isStruct = dataArray.slice(8, 16).some((b) => b === 0x01);
    const args = dataArray.slice(16);

    // Encode data in script format
    let scriptData = [
      // Insert asset_id to be forwarded
      zeroPad(arrayify(assetId || NativeAssetId), 32),
      // Insert amount to be forwarded
      zeroPad(arrayify(BigNumber.from(amount || 0)), 8),
      // Contract id
      contractId,
      // Function selector
      functionSelector,
    ];

    if (isStruct) {
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
