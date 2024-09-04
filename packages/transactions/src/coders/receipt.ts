import { sha256 } from '@fuel-ts/hasher';
import type { AssetId } from '@fuel-ts/interfaces';
import { arrayify, concat } from '@fuel-ts/utils';

export const getMintedAssetId = (contractId: string, subId: string): string => {
  const contractIdBytes = arrayify(contractId);
  const subIdBytes = arrayify(subId);

  return sha256(concat([contractIdBytes, subIdBytes]));
};

export const createAssetId = (contractId: string, subId: string): AssetId => ({
  bits: getMintedAssetId(contractId, subId),
});
