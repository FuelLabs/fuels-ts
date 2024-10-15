import type { BytesLike } from '@fuel-ts/interfaces';
import { BN } from '@fuel-ts/math';
import { arrayify } from '@fuel-ts/utils';
import * as asm from '@fuels/vm-asm';

interface AssembleTransferToContractParams {
  contractId: string;
  assetId: BytesLike;
  amount: BN;
}

export const formatTransferToContractScriptData = (
  params: IAssembleTransferToContractScriptParams
) => {
  const { assetId, amountToTransfer, hexlifiedContractId } = params;

  const numberCoder = new BigNumberCoder('u64');

  const encoded = numberCoder.encode(new BN(amountToTransfer).toNumber());

  const scriptData = Uint8Array.from([
    ...arrayify(hexlifiedContractId),
    ...encoded,
    ...arrayify(assetId),
  ]);

  return scriptData;
};

export const assembleTransferToContractScript = async (
  params: IAssembleTransferToContractScriptParams
) => {
  const scriptData = formatTransferToContractScriptData(params);

  // implementation extracted from Rust SDK at:
  // https://github.com/FuelLabs/fuels-rs/blob/master/packages/fuels-core/src/types/transaction_builders.rs#L240-L272
  // This script loads:
  //  - a pointer to the contract id,
  //  - the actual amount
  //  - a pointer to the asset id
  // into the registers 0x10, 0x12, 0x13
  // and calls the TR instruction

  // TODO: Remove ts-expect-error
  // @ts-expect-error method reference missing in DTS
  await asm.initWasm();

  // const gtf = fuelAsm.gtf(0x10, 0x00, 0xc);
  const gtf = asm.gtf(0x10, 0x00, asm.GTFArgs.ScriptData);
  const addi = asm.addi(0x11, 0x10, 0x20);
  const lw = asm.lw(0x12, 0x11, 0x0);
  const addi2 = asm.addi(0x13, 0x11, 0x8);
  const tr = asm.tr(0x10, 0x12, 0x13);
  const ret = asm.ret(0x1);

  const script = Uint8Array.from([
    ...gtf.to_bytes(),
    ...addi.to_bytes(),
    ...lw.to_bytes(),
    ...addi2.to_bytes(),
    ...tr.to_bytes(),
    ...ret.to_bytes(),
  ]);

  return { script, scriptData };
};
