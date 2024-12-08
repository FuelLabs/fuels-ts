import { Coder } from '@fuel-ts/abi';
import { ErrorCode, FuelError } from '@fuel-ts/errors';
import type { BN } from '@fuel-ts/math';
import { concat } from '@fuel-ts/utils';

import { coders } from './coders';

// Bitfield of used policy types.
export enum PolicyType {
  Tip = 1,
  WitnessLimit = 2,
  Maturity = 4,
  MaxFee = 8,
}

export type Policy = PolicyTip | PolicyWitnessLimit | PolicyMaturity | PolicyMaxFee;

export type PolicyTip = {
  type: PolicyType.Tip;
  data: BN;
};

export type PolicyWitnessLimit = {
  type: PolicyType.WitnessLimit;
  data: BN;
};

export type PolicyMaturity = {
  type: PolicyType.Maturity;
  data: number;
};

export type PolicyMaxFee = {
  type: PolicyType.MaxFee;
  data: BN;
};

export const sortPolicies = (policies: Policy[]): Policy[] =>
  policies.sort((a, b) => a.type - b.type);

function validateDuplicatedPolicies(policies: Policy[]): void {
  const seenTypes = new Set<PolicyType>();

  policies.forEach((policy) => {
    if (seenTypes.has(policy.type)) {
      throw new FuelError(
        ErrorCode.DUPLICATED_POLICY,
        `Duplicate policy type found: ${PolicyType.MaxFee}`
      );
    }
    seenTypes.add(policy.type);
  });
}

export class PoliciesCoder extends Coder<Policy[], Policy[]> {
  private policyTypeFilter: number;

  override type = 'Policies';

  public constructor(policyTypeFilter: number = 0) {
    super();
    this.policyTypeFilter = policyTypeFilter;
  }

  encode(policies: Policy[]): Uint8Array {
    validateDuplicatedPolicies(policies);
    const sortedPolicies = sortPolicies(policies);

    const parts: Uint8Array[] = [];

    sortedPolicies.forEach(({ data, type }) => {
      switch (type) {
        case PolicyType.MaxFee:
        case PolicyType.Tip:
        case PolicyType.WitnessLimit:
          parts.push(coders.u64.encode(data));
          break;

        case PolicyType.Maturity:
          parts.push(coders.u32.encode(data));
          break;

        default: {
          throw new FuelError(ErrorCode.INVALID_POLICY_TYPE, `Invalid policy type: ${type}`);
        }
      }
    });

    return concat(parts);
  }

  decode(data: Uint8Array, offset: number): [Policy[], number] {
    let o = offset;
    const policies: Policy[] = [];

    if (this.policyTypeFilter & PolicyType.Tip) {
      const [tip, nextOffset] = coders.u64.decode(data, o);
      o = nextOffset;
      policies.push({ type: PolicyType.Tip, data: tip });
    }

    if (this.policyTypeFilter & PolicyType.WitnessLimit) {
      const [witnessLimit, nextOffset] = coders.u64.decode(data, o);
      o = nextOffset;
      policies.push({ type: PolicyType.WitnessLimit, data: witnessLimit });
    }

    if (this.policyTypeFilter & PolicyType.Maturity) {
      const [maturity, nextOffset] = coders.u32.decode(data, o);
      o = nextOffset;
      policies.push({ type: PolicyType.Maturity, data: maturity });
    }

    if (this.policyTypeFilter & PolicyType.MaxFee) {
      const [maxFee, nextOffset] = coders.u64.decode(data, o);
      o = nextOffset;
      policies.push({ type: PolicyType.MaxFee, data: maxFee });
    }

    return [policies, o];
  }
}
