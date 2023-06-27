import type { BytesLike } from '@ethersproject/bytes';
import { arrayify } from '@ethersproject/bytes';
import { NumberCoder } from '@fuel-ts/abi-coder';
import { Opcode } from '@fuel-ts/asm';
import type { B256Address } from '@fuel-ts/interfaces';
import { BN, type BigNumberish } from '@fuel-ts/math';

export const setupScriptForTransferToContract = () => {
  // implementation extracted from Rust SDK at:
  // https://github.com/FuelLabs/fuels-rs/blob/master/packages/fuels-core/src/types/transaction_builders.rs#L240-L272
  // This script loads:
  //  - a pointer to the contract id,
  //  - the actual amount
  //  - a pointer to the asset id
  // into the registers 0x10, 0x12, 0x13
  // and calls the TR instruction
  const gtf = Opcode.gtf(0x10, 0x00, 0xc);
  const addi = Opcode.addi(0x11, 0x10, 0x20);
  const lw = Opcode.lw(0x12, 0x11, 0x0);
  const addi2 = Opcode.addi(0x13, 0x11, 0x8);
  const tr = Opcode.tr(0x10, 0x12, 0x13);
  const ret = Opcode.ret(0x1);

  const script = Uint8Array.from([
    ...gtf.toBytes(),
    ...addi.toBytes(),
    ...lw.toBytes(),
    ...addi2.toBytes(),
    ...tr.toBytes(),
    ...ret.toBytes(),
  ]);

  return script;
};

export const setupScriptDataForTransferToContract = (
  hexelifiedContractId: B256Address,
  amountToTransfer: BigNumberish,
  assetId: BytesLike
) => {
  const numberCoder = new NumberCoder('u16');

  const encoded = numberCoder.encode(new BN(amountToTransfer).toNumber());

  const scriptData = Uint8Array.from([
    ...arrayify(hexelifiedContractId),
    ...encoded,
    ...arrayify(assetId),
  ]);

  return scriptData;
};
