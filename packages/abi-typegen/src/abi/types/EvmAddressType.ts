import type { IType } from '../../types/interfaces/IType';

import { AType } from './AType';

export class EvmAddressType extends AType implements IType {
  public static swayType = 'struct EvmAddress';

  public name = 'evmAddress';

  static MATCH_REGEX: RegExp = /^struct (std::vm::evm::evm_address::)?EvmAddress$/m;

  static isSuitableFor(params: { type: string }) {
    return EvmAddressType.MATCH_REGEX.test(params.type);
  }

  public parseComponentsAttributes(_params: { types: IType[] }) {
    const capitalizedName = 'EvmAddress';

    this.attributes = {
      inputLabel: capitalizedName,
      outputLabel: capitalizedName,
    };

    this.requiredFuelsMembersImports = [capitalizedName];

    return this.attributes;
  }
}
