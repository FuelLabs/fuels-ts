import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';
import { bn } from '@fuel-ts/math';

import type { Policy } from './policy';
import { PoliciesCoder, PolicyType } from './policy';

/**
 * @group node
 * @group browser
 */
describe('PoliciesCoder', () => {
  describe('encode', () => {
    it('should encode policy correctly (Tip)', () => {
      const policies: Policy[] = [{ type: PolicyType.Tip, data: bn(57) }];
      const encoded = new PoliciesCoder().encode(policies);

      expect(encoded).toStrictEqual(Uint8Array.from([0, 0, 0, 0, 0, 0, 0, 57]));
    });

    it('should encode policy correctly (WitnessLimit)', () => {
      const policies: Policy[] = [{ type: PolicyType.WitnessLimit, data: bn(10) }];
      const encoded = new PoliciesCoder().encode(policies);

      expect(encoded).toStrictEqual(Uint8Array.from([0, 0, 0, 0, 0, 0, 0, 10]));
    });

    it('should encode policy correctly (Maturity)', () => {
      const policies: Policy[] = [{ type: PolicyType.Maturity, data: 254 }];
      const encoded = new PoliciesCoder().encode(policies);

      expect(encoded).toStrictEqual(Uint8Array.from([0, 0, 0, 0, 0, 0, 0, 254]));
    });

    it('should encode policy correctly (MaxFee)', () => {
      const policies: Policy[] = [{ type: PolicyType.MaxFee, data: bn(76) }];
      const encoded = new PoliciesCoder().encode(policies);

      expect(encoded).toStrictEqual(Uint8Array.from([0, 0, 0, 0, 0, 0, 0, 76]));
    });

    it('should encode policy correctly (Tip + MaxFee)', () => {
      const policies: Policy[] = [
        { type: PolicyType.Tip, data: bn(19) },
        { type: PolicyType.MaxFee, data: bn(76) },
      ];
      const encoded = new PoliciesCoder().encode(policies);

      expect(encoded).toStrictEqual(
        Uint8Array.from([0, 0, 0, 0, 0, 0, 0, 19, 0, 0, 0, 0, 0, 0, 0, 76])
      );
    });

    it('should encode policy correctly (WitnessLimit + Maturity)', () => {
      const policies: Policy[] = [
        { type: PolicyType.WitnessLimit, data: bn(87) },
        { type: PolicyType.Maturity, data: 26 },
      ];
      const encoded = new PoliciesCoder().encode(policies);

      expect(encoded).toStrictEqual(
        Uint8Array.from([0, 0, 0, 0, 0, 0, 0, 87, 0, 0, 0, 0, 0, 0, 0, 26])
      );
    });

    it('should encode policy correctly (WitnessLimit + Maturity + MaxFee)', () => {
      const policies: Policy[] = [
        { type: PolicyType.WitnessLimit, data: bn(87) },
        { type: PolicyType.Maturity, data: 26 },
        { type: PolicyType.MaxFee, data: bn(199) },
      ];
      const encoded = new PoliciesCoder().encode(policies);

      expect(encoded).toStrictEqual(
        Uint8Array.from([
          0, 0, 0, 0, 0, 0, 0, 87, 0, 0, 0, 0, 0, 0, 0, 26, 0, 0, 0, 0, 0, 0, 0, 199,
        ])
      );
    });

    it('should encode policy correctly (Tip + WitnessLimit + Maturity + MaxFee)', () => {
      const policies: Policy[] = [
        { type: PolicyType.Tip, data: bn(28) },
        { type: PolicyType.WitnessLimit, data: bn(87) },
        { type: PolicyType.Maturity, data: 26 },
        { type: PolicyType.MaxFee, data: bn(199) },
      ];
      const encoded = new PoliciesCoder().encode(policies);

      expect(encoded).toStrictEqual(
        Uint8Array.from([
          0, 0, 0, 0, 0, 0, 0, 28, 0, 0, 0, 0, 0, 0, 0, 87, 0, 0, 0, 0, 0, 0, 0, 26, 0, 0, 0, 0, 0,
          0, 0, 199,
        ])
      );
    });

    it('should ensure unsorted policies array will not reflect in error when encoding', () => {
      const policies: Policy[] = [
        { type: PolicyType.MaxFee, data: bn(199) },
        { type: PolicyType.Tip, data: bn(28) },
        { type: PolicyType.Maturity, data: 26 },
        { type: PolicyType.WitnessLimit, data: bn(87) },
      ];
      const encoded = new PoliciesCoder().encode(policies);

      expect(encoded).toStrictEqual(
        Uint8Array.from([
          0, 0, 0, 0, 0, 0, 0, 28, 0, 0, 0, 0, 0, 0, 0, 87, 0, 0, 0, 0, 0, 0, 0, 26, 0, 0, 0, 0, 0,
          0, 0, 199,
        ])
      );
    });

    it('should throw an error when a duplicated policy is found', async () => {
      const policies: Policy[] = [
        { type: PolicyType.MaxFee, data: bn(199) },
        { type: PolicyType.MaxFee, data: bn(199) },
        { type: PolicyType.Tip, data: bn(28) },
        { type: PolicyType.Maturity, data: 26 },
        { type: PolicyType.WitnessLimit, data: bn(87) },
      ];

      await expectToThrowFuelError(
        () => new PoliciesCoder().encode(policies),
        new FuelError(
          ErrorCode.DUPLICATED_POLICY,
          `Duplicate policy type found: ${PolicyType.MaxFee}`
        )
      );
    });
  });

  describe('decode', () => {
    it('should decode tip', () => {
      // tip is 100
      const byteArr = [0, 0, 0, 0, 0, 0, 0, 100];
      const data = Uint8Array.from(byteArr);

      // bitfield is 1 representing tip
      const policyTypes = PolicyType.Tip;

      const [policies] = new PoliciesCoder(policyTypes).decode(data, 0);

      expect(policies).toHaveLength(1);
      expect(policies[0]).toStrictEqual({
        type: PolicyType.Tip,
        data: bn(byteArr),
      });
    });

    it('should decode witnessLimit', () => {
      // witnessLimit is 3000
      const byteArr = [0, 0, 0, 0, 0, 0, 11, 184];
      const data = Uint8Array.from(byteArr);

      // bitfield is 2 representing witnessLimit
      const policyTypes = PolicyType.WitnessLimit;

      const [policies] = new PoliciesCoder(policyTypes).decode(data, 0);

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

      const [policies] = new PoliciesCoder(policyTypes).decode(data, 0);

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

      const [policies] = new PoliciesCoder(policyTypes).decode(data, 0);

      expect(policies).toHaveLength(1);
      expect(policies[0]).toStrictEqual({
        type: PolicyType.MaxFee,
        data: bn(byteArr),
      });
    });

    it('should decode garPrice and witnessLimit', () => {
      const tipByteArr = [0, 0, 0, 0, 0, 0, 0, 100];
      const witLimitByteArr = [0, 0, 0, 0, 0, 0, 11, 184];

      const data = Uint8Array.from([...tipByteArr, ...witLimitByteArr]);

      // bitfield is 3 representing gasLimit + witnessLimit
      const policyTypes = PolicyType.Tip + PolicyType.WitnessLimit;
      expect(policyTypes).toBe(3);

      const [policies] = new PoliciesCoder(policyTypes).decode(data, 0);

      expect(policies).toHaveLength(2);
      expect(policies[0]).toStrictEqual({
        type: PolicyType.Tip,
        data: bn(tipByteArr),
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

      const [policies] = new PoliciesCoder(policyTypes).decode(data, 0);

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

      const [policies] = new PoliciesCoder(policyTypes).decode(data, 0);

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
      const tipByteArr = [0, 0, 0, 0, 0, 0, 0, 100];
      const witLimitByteArr = [0, 0, 0, 0, 0, 0, 11, 184];
      const maturityByteArr = [0, 0, 0, 0, 0, 0, 0, 25];
      const maxFeeByteArr = [0, 0, 0, 0, 0, 0, 1, 244];

      const data = Uint8Array.from([
        ...tipByteArr,
        ...witLimitByteArr,
        ...maturityByteArr,
        ...maxFeeByteArr,
      ]);

      // bitfield is 15 representing witnessLimit + maxFee
      const policyTypes =
        PolicyType.Tip + PolicyType.WitnessLimit + PolicyType.Maturity + PolicyType.MaxFee;
      expect(policyTypes).toBe(15);

      const [policies] = new PoliciesCoder(policyTypes).decode(data, 0);

      expect(policies).toHaveLength(4);
      expect(policies).toStrictEqual([
        {
          type: PolicyType.Tip,
          data: bn(tipByteArr),
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
