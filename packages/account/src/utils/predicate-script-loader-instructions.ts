import { BigNumberCoder } from '@fuel-ts/abi-coder';
import { sha256 } from '@fuel-ts/hasher';
import { concat, arrayify, hexlify } from '@fuel-ts/utils';
import * as asm from '@fuels/vm-asm';

const BLOB_ID_SIZE = 32;
const REG_ADDRESS_OF_DATA_AFTER_CODE = 0x10;
const REG_START_OF_LOADED_CODE = 0x11;
const REG_GENERAL_USE = 0x12;
const WORD_SIZE = 8; // size in bytes
// https://github.com/FuelLabs/fuel-vm/blob/a340921a00050bd1734e7dcf278a1d13edf2786b/fuel-asm/src/lib.rs#L185-L186
const LDC_INSTRUCTION_PREAMPLE = 0x32;

export const DATA_OFFSET_INDEX = 8;
export const CONFIGURABLE_OFFSET_INDEX = 16;

/**
 * Get the offset of the data section in the bytecode
 *
 * @param bytecode - The bytecode to get the offset from
 * @returns The offset of the data section
 */
export function getBytecodeDataOffset(bytecode: Uint8Array): number {
  const [offset] = new BigNumberCoder('u64').decode(bytecode, DATA_OFFSET_INDEX);
  return offset.toNumber();
}

/**
 * Get the offset of the configurable section in the bytecode
 *
 * @param bytecode - The bytecode to get the offset from
 * @returns The offset of the configurable section
 */
export function getBytecodeConfigurableOffset(bytecode: Uint8Array): number {
  const [offset] = new BigNumberCoder('u64').decode(bytecode, CONFIGURABLE_OFFSET_INDEX);
  return offset.toNumber();
}

/**
 * Takes bytecode and generates it's associated bytecode ID.
 *
 * The bytecode ID is a hash of the bytecode when sliced at the configurable offset. This
 * superseded legacy blob IDs when uploading blobs for scripts and predicates so that
 * the bytecode ID is equal to the legacy blob ID. Therefore blobs can be used for ABI verification.
 *
 * @param bytecode - The bytecode to get the id from
 * @returns The id of the bytecode
 */
export function getBytecodeId(bytecode: Uint8Array): string {
  const configurableOffset = getBytecodeConfigurableOffset(bytecode);
  const byteCodeWithoutConfigurableSection = bytecode.slice(0, configurableOffset);

  return sha256(byteCodeWithoutConfigurableSection);
}

/**
 * Takes bytecode and generates it's associated legacy blob ID.
 *
 * The legacy blob ID is a hash of the bytecode when sliced at the data section offset.
 *
 * @param bytecode - The bytecode to get the id from
 * @returns The id of the bytecode
 */
export function getLegacyBlobId(bytecode: Uint8Array): string {
  const dataOffset = getBytecodeDataOffset(bytecode);
  const byteCodeWithoutDataSection = bytecode.slice(0, dataOffset);

  return sha256(byteCodeWithoutDataSection);
}

/**
 * TODO: verify this is correct
 *
 * Check if the bytecode is a loader
 *
 * @param bytecode - The bytecode to check
 * @returns True if the bytecode is a loader, false otherwise
 */
export function isBytecodeLoader(bytecode: Uint8Array): boolean {
  const dataView = new DataView(bytecode.buffer);
  const preample = dataView.getUint8(REG_ADDRESS_OF_DATA_AFTER_CODE);
  return preample === LDC_INSTRUCTION_PREAMPLE;
}

function getInstructionsWithDataSection(): Uint8Array {
  const { RegId, Instruction } = asm;

  const REG_PC = RegId.pc().to_u8();
  const REG_SP = RegId.sp().to_u8();
  const REG_IS = RegId.is().to_u8();

  const NUM_OF_INSTRUCTIONS = 12;

  const instructions = [
    // 1. Load the blob content into memory
    // Find the start of the hardcoded blob ID, which is located after the loader code ends.
    asm.move_(REG_ADDRESS_OF_DATA_AFTER_CODE, REG_PC),
    // hold the address of the blob ID.
    asm.addi(
      REG_ADDRESS_OF_DATA_AFTER_CODE,
      REG_ADDRESS_OF_DATA_AFTER_CODE,
      NUM_OF_INSTRUCTIONS * Instruction.size()
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
    // load the data section of the executable
    asm.ldc(REG_ADDRESS_OF_DATA_AFTER_CODE, 0, REG_GENERAL_USE, 2),
    // Jump into the memory where the contract is loaded.
    // What follows is called _jmp_mem by the sway compiler.
    // Subtract the address contained in IS because jmp will add it back.
    asm.sub(REG_START_OF_LOADED_CODE, REG_START_OF_LOADED_CODE, REG_IS),
    // jmp will multiply by 4, so we need to divide to cancel that out.
    asm.divi(REG_START_OF_LOADED_CODE, REG_START_OF_LOADED_CODE, 4),
    // Jump to the start of the contract we loaded.
    asm.jmp(REG_START_OF_LOADED_CODE),
  ];

  // Ensures that the number of instructions is always correct.
  if (instructions.length !== NUM_OF_INSTRUCTIONS) {
    throw new Error('Invalid number of instructions, check the NUM_OF_INSTRUCTIONS is correct.');
  }

  return new Uint8Array(instructions.flatMap((instruction) => Array.from(instruction.to_bytes())));
}

function getInstructionsWithoutDataSection(): Uint8Array {
  const { RegId, Instruction } = asm;

  const REG_PC = RegId.pc().to_u8();
  const REG_SP = RegId.sp().to_u8();
  const REG_IS = RegId.is().to_u8();

  const NUM_OF_INSTRUCTIONS = 8;

  const instructions = [
    // 1. Load the blob content into memory
    // Find the start of the hardcoded blob ID, which is located after the loader code ends.
    // 1. Load the blob content into memory
    // Find the start of the hardcoded blob ID, which is located after the loader code ends.
    asm.move_(REG_ADDRESS_OF_DATA_AFTER_CODE, REG_PC),
    // hold the address of the blob ID.
    asm.addi(
      REG_ADDRESS_OF_DATA_AFTER_CODE,
      REG_ADDRESS_OF_DATA_AFTER_CODE,
      NUM_OF_INSTRUCTIONS * Instruction.size()
    ),
    // The code is going to be loaded from the current value of SP onwards, save
    // the location into REG_START_OF_LOADED_CODE so we can jump into it at the end.
    asm.move_(REG_START_OF_LOADED_CODE, REG_SP),
    // REG_GENERAL_USE to hold the size of the blob.
    asm.bsiz(REG_GENERAL_USE, REG_ADDRESS_OF_DATA_AFTER_CODE),
    // Push the blob contents onto the stack.
    asm.ldc(REG_ADDRESS_OF_DATA_AFTER_CODE, 0, REG_GENERAL_USE, 1),
    // Jump into the memory where the contract is loaded.
    // What follows is called _jmp_mem by the sway compiler.
    // Subtract the address contained in IS because jmp will add it back.
    asm.sub(REG_START_OF_LOADED_CODE, REG_START_OF_LOADED_CODE, REG_IS),
    // jmp will multiply by 4, so we need to divide to cancel that out.
    asm.divi(REG_START_OF_LOADED_CODE, REG_START_OF_LOADED_CODE, 4),
    // Jump to the start of the contract we loaded.
    asm.jmp(REG_START_OF_LOADED_CODE),
  ];

  // Ensures that the number of instructions is always correct.
  if (instructions.length !== NUM_OF_INSTRUCTIONS) {
    throw new Error('Invalid number of instructions, check the NUM_OF_INSTRUCTIONS is correct.');
  }

  return new Uint8Array(instructions.flatMap((instruction) => Array.from(instruction.to_bytes())));
}

export function getPredicateScriptLoaderInstructions(
  originalBinary: Uint8Array,
  blobId: Uint8Array
) {
  // The final code is going to have this structure:
  // 1. loader instructions
  // 2. blob id
  // 3. length_of_data_section
  // 4. the data_section (updated with configurables as needed)
  const offset = getBytecodeConfigurableOffset(originalBinary);

  // if the binary length is smaller than the offset
  if (originalBinary.length < offset) {
    throw new Error(
      `Data section offset is out of bounds, offset: ${offset}, binary length: ${originalBinary.length}`
    );
  }

  // Extract the configurable section from the binary (slice from the configurable offset onwards)
  const configurableSection = originalBinary.slice(offset);

  // Check if the configurable section is non-empty
  if (configurableSection.length > 0) {
    // Convert instructions to bytes
    const instructionBytes = getInstructionsWithDataSection();

    // Convert blobId to bytes
    const blobBytes = new Uint8Array(blobId);

    // Convert data section length to big-endian 8-byte array
    const dataSectionLenBytes = new Uint8Array(8);
    const dataView = new DataView(dataSectionLenBytes.buffer);
    dataView.setBigUint64(0, BigInt(configurableSection.length), false); // false for big-endian

    // Combine the instruction bytes, blob bytes, data section length, and the data section
    const loaderBytecode = new Uint8Array([
      ...instructionBytes,
      ...blobBytes,
      ...dataSectionLenBytes,
    ]);

    return {
      loaderBytecode: concat([loaderBytecode, configurableSection]),
      blobOffset: loaderBytecode.length,
    };
  }

  // Convert instructions to bytes
  const instructionBytes = getInstructionsWithoutDataSection();

  // Convert blobId to bytes
  const blobBytes = new Uint8Array(blobId);

  // Combine the instruction bytes and blob bytes
  const loaderBytecode = new Uint8Array([...instructionBytes, ...blobBytes]);

  return { loaderBytecode };
}

/**
 * Extract the blob ID and data offset from the bytecode
 *
 * @param bytecode - The bytecode to extract the blob ID and data offset from
 * @returns The blob ID and data offset
 */
export function extractBlobIdAndDataOffset(bytecode: Uint8Array): {
  blobId: Uint8Array;
  dataOffset: number;
} {
  if (!isBytecodeLoader(bytecode)) {
    return {
      blobId: arrayify(getLegacyBlobId(bytecode)),
      dataOffset: getBytecodeDataOffset(bytecode),
    };
  }

  const instructionsWithData = getInstructionsWithDataSection();

  const hexlifiedBytecode = hexlify(bytecode);
  const hexlifiedInstructionsWithData = hexlify(instructionsWithData);

  // Check if the bytecode starts with the instructions with data section
  if (hexlifiedBytecode.startsWith(hexlifiedInstructionsWithData)) {
    let offset = instructionsWithData.length;

    // Read off the blob ID
    const blobId = bytecode.slice(offset, (offset += BLOB_ID_SIZE));
    // We skip over `WORD_SIZE` bytes as this stores the data length.
    // After this, the offset of the data section is found.
    const dataOffset = offset + WORD_SIZE;
    return {
      blobId,
      dataOffset,
    };
  }

  const instructionsWithoutData = getInstructionsWithoutDataSection();
  let offset = instructionsWithoutData.length;

  // Read off the blob ID
  const blobId = bytecode.slice(offset, (offset += BLOB_ID_SIZE));

  return {
    blobId,
    dataOffset: offset,
  };
}
