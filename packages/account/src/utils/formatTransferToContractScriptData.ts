import { encoding, ASSET_ID_LEN, CONTRACT_ID_LEN, WORD_SIZE } from '@fuel-ts/abi';
import { Address } from '@fuel-ts/address';
import type { BytesLike } from '@fuel-ts/interfaces';
import type { BN } from '@fuel-ts/math';
import { arrayify, concat } from '@fuel-ts/utils';
import * as asm from '@fuels/vm-asm';

interface AssembleTransferToContractParams {
  contractId: string;
  assetId: BytesLike;
  amount: BN;
}

export const formatTransferToContractScriptData = (
  transferParams: Array<AssembleTransferToContractParams>
) => {
  const numberCoder = encoding.v1.u64;
  return transferParams.reduce((acc, transferParam) => {
    const { assetId, amount, contractId } = transferParam;
    const encoded = numberCoder.encode(amount);
    const scriptData = concat([
      Address.fromAddressOrString(contractId).toBytes(),
      encoded,
      arrayify(assetId),
    ]);
    return concat([acc, scriptData]);
  }, new Uint8Array());
};

export const assembleTransferToContractScript = async (
  transferParams: Array<AssembleTransferToContractParams>
) => {
  const scriptData = formatTransferToContractScriptData(transferParams);

  // @ts-expect-error method reference missing in DTS
  await asm.initWasm();

  let script = new Uint8Array();

  transferParams.forEach((_, i) => {
    const offset = (CONTRACT_ID_LEN + WORD_SIZE + ASSET_ID_LEN) * i;

    script = concat([
      script,
      // Load ScriptData into register 0x10.
      asm.gtf(0x10, 0x0, asm.GTFArgs.ScriptData).to_bytes(),
      // Add the offset to 0x10 so it will point to the current contract ID, store in 0x11.
      asm.addi(0x11, 0x10, offset).to_bytes(),
      // Add CONTRACT_ID_LEN to 0x11 to point to the amount in the ScriptData, store in 0x12.
      asm.addi(0x12, 0x11, CONTRACT_ID_LEN).to_bytes(),
      // Load word to the amount at 0x12 into register 0x13.
      asm.lw(0x13, 0x12, 0x0).to_bytes(),
      // Add WORD_SIZE to 0x12 to point to the asset ID in the ScriptData, store in 0x14.
      asm.addi(0x14, 0x12, WORD_SIZE).to_bytes(),
      // Perform the transfer using contract ID in 0x11, amount in 0x13, and asset ID in 0x14.
      asm.tr(0x11, 0x13, 0x14).to_bytes(),
    ]);
  });

  // Add return instruction at the end of the script
  script = concat([script, asm.ret(0x1).to_bytes()]);

  return { script, scriptData };
};
