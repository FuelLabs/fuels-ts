import { BYTES_32 } from '@fuel-ts/abi-coder';
import { InstructionSet } from '@fuel-ts/program';
import { arrayify, concat } from '@fuel-ts/utils';
import * as asm from '@fuels/vm-asm';

export const getLoaderInstructions = (blobIds: string[]): Uint8Array => {
  const { RegId, Instruction } = asm;

  const numberOfInstructions = 12;
  const numberOfBlobs = blobIds.length;
  const blobIdSize = BYTES_32;

  // Bytes for the Blob Ids
  const blobIdBytes = concat(blobIds.map((b) => arrayify(b)));

  // Reference: https://github.com/FuelLabs/fuels-ts/issues/2741#issuecomment-2260364179
  // There are 2 main steps:
  // 1. Load the blob contents into memory
  // 2. Jump to the beginning of the memory where the blobs were loaded
  // After that the execution continues normally with the loaded contract reading our
  // prepared fn selector and jumps to the selected contract method.
  const instructionBytes = new InstructionSet(
    // 1. load the blob contents into memory
    // find the start of the hardcoded blob ids, which are located after the code ends
    asm.move_(0x10, RegId.is().to_u8()),
    // 0x10 to hold the address of the current blob id
    asm.addi(0x10, 0x10, numberOfInstructions * Instruction.size()),
    // The contract is going to be loaded from the current value of SP onwards, save
    // the location into 0x16 so we can jump into it later on
    asm.move_(0x16, RegId.sp().to_u8()),
    // loop counter
    asm.movi(0x13, numberOfBlobs),
    // LOOP starts here
    // 0x11 to hold the size of the current blob
    asm.bsiz(0x11, 0x10),
    // push the blob contents onto the stack
    asm.ldc(0x10, 0, 0x11, 1),
    // move on to the next blob
    asm.addi(0x10, 0x10, blobIdSize),
    // decrement the loop counter
    asm.subi(0x13, 0x13, 1),
    // Jump backwards (3+1) instructions if the counter has not reached 0
    asm.jnzb(0x13, RegId.zero().to_u8(), 3),
    // Jump into the memory where the contract is loaded
    // what follows is called _jmp_mem by the sway compiler
    // subtract the address contained in IS because jmp will add it back
    asm.sub(0x16, 0x16, RegId.is().to_u8()),
    // jmp will multiply by 4 so we need to divide to cancel that out
    asm.divi(0x16, 0x16, 4),
    // jump to the start of the contract we loaded
    asm.jmp(0x16)
  ).toBytes();

  return concat([instructionBytes, blobIdBytes]);
};
