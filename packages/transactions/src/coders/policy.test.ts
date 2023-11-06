import { bn } from '@fuel-ts/math';

import { PoliciesCoder, PolicyType } from './policy';

describe('PolicyCoder', () => {
  describe('decode', () => {
    it('should decode gasPrice', () => {
      // gasPrice is 100
      const byteArr = [0, 0, 0, 0, 0, 0, 0, 100];
      const data = Uint8Array.from(byteArr);

      // bitfield is 1 representing gasPrice
      const policyTypes = PolicyType.GasPrice;

      const [policies] = new PoliciesCoder().decode(data, 0, policyTypes);

      expect(policies).toHaveLength(1);
      expect(policies[0]).toStrictEqual({
        type: PolicyType.GasPrice,
        data: bn(byteArr),
      });
    });

    it('should decode witnessLimit', () => {
      // witnessLimit is 3000
      const byteArr = [0, 0, 0, 0, 0, 0, 11, 184];
      const data = Uint8Array.from(byteArr);

      // bitfield is 2 representing witnessLimit
      const policyTypes = PolicyType.WitnessLimit;

      const [policies] = new PoliciesCoder().decode(data, 0, policyTypes);

      expect(policies).toHaveLength(1);
      expect(policies[0]).toStrictEqual({
        type: PolicyType.WitnessLimit,
        data: bn(byteArr),
      });
    });

    it('should decode maturity', () => {
      // maturity is 25
      const byteArr = [0, 0, 0, 0, 0, 0, 0, 25];
      const data = Uint8Array.from(byteArr);

      // bitfield is 4 representing maturity
      const policyTypes = PolicyType.Maturity;

      const [policies] = new PoliciesCoder().decode(data, 0, policyTypes);

      expect(policies).toHaveLength(1);
      expect(policies[0]).toStrictEqual({
        type: PolicyType.Maturity,
        data: bn(byteArr).toNumber(),
      });
    });

    it('should decode maxFee', () => {
      // maxFee is 500
      const byteArr = [0, 0, 0, 0, 0, 0, 1, 244];
      const data = Uint8Array.from(byteArr);

      // bitfield is 8 representing maxFee
      const policyTypes = PolicyType.MaxFee;

      const [policies] = new PoliciesCoder().decode(data, 0, policyTypes);

      expect(policies).toHaveLength(1);
      expect(policies[0]).toStrictEqual({
        type: PolicyType.MaxFee,
        data: bn(byteArr),
      });
    });

    it('should decode garPrice and witnessLimit', () => {
      const gasPriceByteArr = [0, 0, 0, 0, 0, 0, 0, 100];
      const witLimitByteArr = [0, 0, 0, 0, 0, 0, 11, 184];

      const data = Uint8Array.from([...gasPriceByteArr, ...witLimitByteArr]);

      // bitfield is 3 representing gasLimit + witnessLimit
      const policyTypes = PolicyType.GasPrice + PolicyType.WitnessLimit;
      expect(policyTypes).toBe(3);

      const [policies] = new PoliciesCoder().decode(data, 0, policyTypes);

      expect(policies).toHaveLength(2);
      expect(policies[0]).toStrictEqual({
        type: PolicyType.GasPrice,
        data: bn(gasPriceByteArr),
      });
      expect(policies[1]).toStrictEqual({
        type: PolicyType.WitnessLimit,
        data: bn(witLimitByteArr),
      });
    });

    it('should decode witnessLimit and maturity', () => {
      const witLimitByteArr = [0, 0, 0, 0, 0, 0, 11, 184];
      const maturityByteArr = [0, 0, 0, 0, 0, 0, 0, 25];

      const data = Uint8Array.from([...witLimitByteArr, ...maturityByteArr]);

      // bitfield is 6 representing witnessLimit + maturity
      const policyTypes = PolicyType.WitnessLimit + PolicyType.Maturity;
      expect(policyTypes).toBe(6);

      const [policies] = new PoliciesCoder().decode(data, 0, policyTypes);

      expect(policies).toHaveLength(2);
      expect(policies[0]).toStrictEqual({
        type: PolicyType.WitnessLimit,
        data: bn(witLimitByteArr),
      });
      expect(policies[1]).toStrictEqual({
        type: PolicyType.Maturity,
        data: bn(maturityByteArr).toNumber(),
      });
    });

    it('should decode witnessLimit and maxFee', () => {
      const witLimitByteArr = [0, 0, 0, 0, 0, 0, 11, 184];
      const maxFeeByteArr = [0, 0, 0, 0, 0, 0, 1, 244];

      const data = Uint8Array.from([...witLimitByteArr, ...maxFeeByteArr]);

      // bitfield is 10 representing witnessLimit + maxFee
      const policyTypes = PolicyType.WitnessLimit + PolicyType.MaxFee;
      expect(policyTypes).toBe(10);

      const [policies] = new PoliciesCoder().decode(data, 0, policyTypes);

      expect(policies).toHaveLength(2);
      expect(policies[0]).toStrictEqual({
        type: PolicyType.WitnessLimit,
        data: bn(witLimitByteArr),
      });
      expect(policies[1]).toStrictEqual({
        type: PolicyType.MaxFee,
        data: bn(maxFeeByteArr),
      });
    });

    it('should decode when all policy types are present', () => {
      const gasPriceByteArr = [0, 0, 0, 0, 0, 0, 0, 100];
      const witLimitByteArr = [0, 0, 0, 0, 0, 0, 11, 184];
      const maturityByteArr = [0, 0, 0, 0, 0, 0, 0, 25];
      const maxFeeByteArr = [0, 0, 0, 0, 0, 0, 1, 244];

      const data = Uint8Array.from([
        ...gasPriceByteArr,
        ...witLimitByteArr,
        ...maturityByteArr,
        ...maxFeeByteArr,
      ]);

      // bitfield is 15 representing witnessLimit + maxFee
      const policyTypes =
        PolicyType.GasPrice + PolicyType.WitnessLimit + PolicyType.Maturity + PolicyType.MaxFee;
      expect(policyTypes).toBe(15);

      const [policies] = new PoliciesCoder().decode(data, 0, policyTypes);

      expect(policies).toHaveLength(4);
      expect(policies).toStrictEqual([
        {
          type: PolicyType.GasPrice,
          data: bn(gasPriceByteArr),
        },
        {
          type: PolicyType.WitnessLimit,
          data: bn(witLimitByteArr),
        },
        {
          type: PolicyType.Maturity,
          data: bn(maturityByteArr).toNumber(),
        },
        {
          type: PolicyType.MaxFee,
          data: bn(maxFeeByteArr),
        },
      ]);
    });
  });
});
