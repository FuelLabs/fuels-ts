import type { BytesLike } from '@ethersproject/bytes';
import { arrayify } from '@ethersproject/bytes';
import { NumberCoder } from '@fuel-ts/abi-coder';
import * as fuelAsm from '@fuel-ts/fuel-asm';
import type { B256Address } from '@fuel-ts/interfaces';
import { BN, type BigNumberish } from '@fuel-ts/math';

export const composeScriptForTransferringToContract = () => {
  // implementation extracted from Rust SDK at:
  // https://github.com/FuelLabs/fuels-rs/blob/master/packages/fuels-core/src/types/transaction_builders.rs#L240-L272
  // This script loads:
  //  - a pointer to the contract id,
  //  - the actual amount
  //  - a pointer to the asset id
  // into the registers 0x10, 0x12, 0x13
  // and calls the TR instruction
  // const gtf = fuelAsm.gtf(0x10, 0x00, 0xc);
  const gtf = fuelAsm.gtf(0x10, 0x00, fuelAsm.GTFArgs.ScriptData);
  const addi = fuelAsm.addi(0x11, 0x10, 0x20);
  const lw = fuelAsm.lw(0x12, 0x11, 0x0);
  const addi2 = fuelAsm.addi(0x13, 0x11, 0x8);
  const tr = fuelAsm.tr(0x10, 0x12, 0x13);
  const ret = fuelAsm.ret(0x1);

  const script = Uint8Array.from([
    ...gtf.to_bytes(),
    ...addi.to_bytes(),
    ...lw.to_bytes(),
    ...addi2.to_bytes(),
    ...tr.to_bytes(),
    ...ret.to_bytes(),
  ]);

  return script;
};

export const formatScriptDataForTransferringToContract = (
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
