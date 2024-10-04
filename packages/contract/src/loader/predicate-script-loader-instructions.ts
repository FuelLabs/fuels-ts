import { InstructionSet } from '@fuel-ts/program';
import { concat } from '@fuel-ts/utils';
import * as asm from '@fuels/vm-asm';

const BLOB_ID_SIZE = 32;
const REG_ADDRESS_OF_DATA_AFTER_CODE = 0x10;
const REG_START_OF_LOADED_CODE = 0x11;
const REG_GENERAL_USE = 0x12;
const REG_START_OF_DATA_SECTION = 0x13;
const WORD_SIZE = 8; // size in bytes

function getDataOffset(binary: Uint8Array): number {
  const buffer = binary.buffer.slice(binary.byteOffset + 8, binary.byteOffset + 16);
  const dataView = new DataView(buffer);
  const dataOffset = dataView.getBigUint64(0, false); // big-endian
  return Number(dataOffset);
}

export function getPredicateScriptLoaderInstructions(
  originalBinary: Uint8Array,
  blobId: Uint8Array
): Uint8Array {
  // The final code is going to have this structure:
  // 1. loader instructions
  // 2. blob id
  // 3. length_of_data_section
  // 4. the data_section (updated with configurables as needed)
  const offset = getDataOffset(originalBinary);

  const dataSection = originalBinary.slice(offset);

  // update the dataSection here as necessary (with configurables)

  const dataSectionLen = dataSection.length;

  const { RegId, Instruction } = asm;

  const REG_PC = RegId.pc().to_u8();
  const REG_SP = RegId.sp().to_u8();
  const REG_IS = RegId.is().to_u8();

  const getInstructions = (numOfInstructions: number) => [
    // 1. Load the blob content into memory
    // Find the start of the hardcoded blob ID, which is located after the loader code ends.
    asm.move_(REG_ADDRESS_OF_DATA_AFTER_CODE, REG_PC),
    // hold the address of the blob ID.
    asm.addi(
      REG_ADDRESS_OF_DATA_AFTER_CODE,
      REG_ADDRESS_OF_DATA_AFTER_CODE,
      numOfInstructions * Instruction.size()
    ),
    // The code is going to be loaded from the current value of SP onwards, save
    // the location into REG_START_OF_LOADED_CODE so we can jump into it at the end.
    asm.move_(REG_START_OF_LOADED_CODE, REG_SP),
    // REG_GENERAL_USE to hold the size of the blob.
    asm.bsiz(REG_GENERAL_USE, REG_ADDRESS_OF_DATA_AFTER_CODE),
    // Push the blob contents onto the stack.
    asm.ldc(REG_ADDRESS_OF_DATA_AFTER_CODE, 0, REG_GENERAL_USE, 1),
    // Move on to the data section length
    asm.addi(REG_ADDRESS_OF_DATA_AFTER_CODE, REG_ADDRESS_OF_DATA_AFTER_CODE, BLOB_ID_SIZE),
    // load the size of the data section into REG_GENERAL_USE
    asm.lw(REG_GENERAL_USE, REG_ADDRESS_OF_DATA_AFTER_CODE, 0),
    // after we have read the length of the data section, we move the pointer to the actual
    // data by skipping WORD_SIZE bytes.
    asm.addi(REG_ADDRESS_OF_DATA_AFTER_CODE, REG_ADDRESS_OF_DATA_AFTER_CODE, WORD_SIZE),
    // extend the stack
    asm.cfe(REG_GENERAL_USE),
    // move to the start of the newly allocated stack
    asm.sub(REG_START_OF_DATA_SECTION, REG_SP, REG_GENERAL_USE),
    // load the data section onto the stack
    asm.mcp(REG_START_OF_DATA_SECTION, REG_ADDRESS_OF_DATA_AFTER_CODE, REG_GENERAL_USE),
    // Jump into the memory where the contract is loaded.
    // What follows is called _jmp_mem by the sway compiler.
    // Subtract the address contained in IS because jmp will add it back.
    asm.sub(REG_START_OF_LOADED_CODE, REG_START_OF_LOADED_CODE, REG_IS),
    // jmp will multiply by 4, so we need to divide to cancel that out.
    asm.divi(REG_START_OF_LOADED_CODE, REG_START_OF_LOADED_CODE, 4),
    // Jump to the start of the contract we loaded.
    asm.jmp(REG_START_OF_LOADED_CODE),
  ];

  const numOfInstructions = getInstructions(0).length;

  const instructions = getInstructions(numOfInstructions);
  const instructionSet = new InstructionSet(...instructions);
  const instructionBytes = instructionSet.toBytes();

  const blobBytes = blobId;

  // Convert dataSectionLen to big-endian bytes
  const dataSectionLenBytes = new Uint8Array(8);
  const dataSectionLenDataView = new DataView(dataSectionLenBytes.buffer);
  dataSectionLenDataView.setBigUint64(0, BigInt(dataSectionLen), false); // false for big-endian

  return concat([instructionBytes, blobBytes, dataSectionLenBytes, dataSection]);
}
