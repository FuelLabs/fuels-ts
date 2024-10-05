import * as asm from '@fuels/vm-asm';

const BLOB_ID_SIZE = 32;
const REG_ADDRESS_OF_DATA_AFTER_CODE = 0x10;
const REG_START_OF_LOADED_CODE = 0x11;
const REG_GENERAL_USE = 0x12;
const REG_START_OF_DATA_SECTION = 0x13;
const WORD_SIZE = 8; // size in bytes

function getDataOffset(binary: Uint8Array): number {
  // Extract 8 bytes starting from index 8 (similar to binary[8..16] in Rust)
  const OFFSET_INDEX = 8;
  const dataView = new DataView(binary.buffer, OFFSET_INDEX, 8);

  // Read the value as a 64-bit big-endian unsigned integer
  const dataOffset = dataView.getBigUint64(0, false); // false means big-endian

  // Convert the BigInt to a regular number (safe as long as the offset is within Number.MAX_SAFE_INTEGER)
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

  const getInstructionsNoDataSection = (numOfInstructions: number) => [
    // 1. Load the blob content into memory
    // Find the start of the hardcoded blob ID, which is located after the loader code ends.
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
    // Jump into the memory where the contract is loaded.
    // What follows is called _jmp_mem by the sway compiler.
    // Subtract the address contained in IS because jmp will add it back.
    asm.sub(REG_START_OF_LOADED_CODE, REG_START_OF_LOADED_CODE, REG_IS),
    // jmp will multiply by 4, so we need to divide to cancel that out.
    asm.divi(REG_START_OF_LOADED_CODE, REG_START_OF_LOADED_CODE, 4),
    // Jump to the start of the contract we loaded.
    asm.jmp(REG_START_OF_LOADED_CODE),
  ];

  const offset = getDataOffset(originalBinary);

  // if the binary length is smaller than the offset
  if (originalBinary.length < offset) {
    throw new Error(
      `Data section offset is out of bounds, offset: ${offset}, binary length: ${originalBinary.length}`
    );
  }

  // Extract the data section from the binary (slice from the offset onwards)
  const dataSection = originalBinary.slice(offset);

  // Check if the data section is non-empty
  if (dataSection.length > 0) {
    // Get the number of instructions (assuming it won't exceed u16::MAX)
    const numOfInstructions = getInstructions(0).length;
    if (numOfInstructions > 65535) {
      throw new Error('Too many instructions, exceeding u16::MAX.');
    }

    // Convert instructions to bytes
    const instructionBytes = new Uint8Array(
      getInstructions(numOfInstructions).flatMap((instruction) =>
        Array.from(instruction.to_bytes())
      )
    );

    // Convert blobId to bytes
    const blobBytes = new Uint8Array(blobId);

    // Convert data section length to big-endian 8-byte array
    const dataSectionLenBytes = new Uint8Array(8);
    const dataView = new DataView(dataSectionLenBytes.buffer);
    dataView.setBigUint64(0, BigInt(dataSection.length), false); // false for big-endian

    // Combine the instruction bytes, blob bytes, data section length, and the data section
    return new Uint8Array([
      ...instructionBytes,
      ...blobBytes,
      ...dataSectionLenBytes,
      ...dataSection,
    ]);
  }
  // Handle case where there is no data section
  const numOfInstructions = getInstructionsNoDataSection(0).length;
  if (numOfInstructions > 65535) {
    throw new Error('Too many instructions, exceeding u16::MAX.');
  }

  // Convert instructions to bytes
  const instructionBytes = new Uint8Array(
    getInstructionsNoDataSection(numOfInstructions).flatMap((instruction) =>
      Array.from(instruction.to_bytes())
    )
  );

  // Convert blobId to bytes
  const blobBytes = new Uint8Array(blobId);

  // Combine the instruction bytes and blob bytes
  return new Uint8Array([...instructionBytes, ...blobBytes]);
}
