import { BYTES_32 } from '@fuel-ts/abi-coder';
import { InstructionSet } from '@fuel-ts/program';
import { arrayify, concat } from '@fuel-ts/utils';
import * as asm from '@fuels/vm-asm';

export const getLoaderInstructions = (blobIds: string[]): Uint8Array => {
  const { RegId, Instruction } = asm;

  const instructionsPerBlob = 26;
  const numberOfBlobs = blobIds.length;
  const numberOfInstructions = numberOfBlobs * instructionsPerBlob;
  const blobIdSize = BYTES_32;

  // Bytes for the Blob Ids
  const blobIdBytes = () => concat(blobIds.map((b) => arrayify(b)));

  return concat([
    new InstructionSet(
      // 0x12 is going to hold the total size of the contract
      asm.move_(0x12, RegId.zero().to_u8()),
      // find the start of the hardcoded blob ids, which are located after the code ends
      asm.move_(0x10, RegId.is().to_u8()),
      // 0x10 to hold the address of the current blob id
      asm.addi(0x10, 0x10, numberOfInstructions * Instruction.size()),
      // loop counter
      asm.addi(0x13, RegId.zero().to_u8(), numberOfBlobs),
      // LOOP starts here
      // 0x11 to hold the size of the current blob
      asm.bsiz(0x11, 0x10),
      // update the total size of the contract
      asm.add(0x12, 0x12, 0x11),
      // move on to the next blob
      asm.addi(0x10, 0x10, blobIdSize),
      // decrement the loop counter
      asm.subi(0x13, 0x13, 1),
      // Jump backwards 3 instructions if the counter has not reached 0
      asm.jneb(0x13, RegId.zero().to_u8(), RegId.zero().to_u8(), 3),
      // move the stack pointer by the contract size since we need to write the contract on the stack since only that memory can be executed
      asm.cfe(0x12),
      // find the start of the hardcoded blob ids, which are located after the code ends
      asm.move_(0x10, RegId.is().to_u8()),
      // 0x10 to hold the address of the current blob id
      asm.addi(0x10, 0x10, numberOfInstructions * Instruction.size()),
      // 0x12 is going to hold the total bytes loaded of the contract
      asm.move_(0x12, RegId.zero().to_u8()),
      // loop counter
      asm.addi(0x13, RegId.zero().to_u8(), numberOfBlobs),
      // LOOP starts here
      // 0x11 to hold the size of the current blob
      asm.bsiz(0x11, 0x10),
      // the location where to load the current blob (start of stack)
      asm.move_(0x14, RegId.spp().to_u8()),
      // move to where this blob should be loaded by adding the total bytes loaded
      asm.add(0x14, 0x14, 0x12),
      // load the current blob
      asm.bldd(0x14, 0x10, RegId.zero().to_u8(), 0x11),
      // update the total bytes loaded
      asm.add(0x12, 0x12, 0x11),
      // move on to the next blob
      asm.addi(0x10, 0x10, blobIdSize),
      // decrement the loop counter
      asm.subi(0x13, 0x13, 1),
      // Jump backwards 6 instructions if the counter has not reached 0
      asm.jneb(0x13, RegId.zero().to_u8(), RegId.zero().to_u8(), 6),
      // what follows is called _jmp_mem by the sway compiler
      // move to the start of the stack (also the start of the contract we loaded)
      asm.move_(0x16, RegId.spp().to_u8()),
      // subtract the address contained in IS because jmp will add it back
      asm.sub(0x16, 0x16, RegId.is().to_u8()),
      // jmp will multiply by 4 so we need to divide to cancel that out
      asm.divi(0x16, 0x16, 4),
      // jump to the start of the contract we loaded
      asm.jmp(0x16)
    ).toBytes(),
    blobIdBytes(),
  ]);
};
