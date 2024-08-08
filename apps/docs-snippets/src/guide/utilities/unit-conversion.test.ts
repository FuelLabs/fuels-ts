import { BN, DECIMAL_GWEI, DECIMAL_KWEI, bn } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import { EchoValuesFactory } from '../../../test/typegen';

/**
 * @group node
 * @group browser
 */
describe('unit-conversion', () => {
  describe('instantiation', () => {
    it('should create a BN instance', () => {
      const expected = '100000000';

      // #region instantiation-1
      // #import { BN };

      const result = new BN('100000000').toString();
      // "100000000"
      // #endregion instantiation-1

      expect(result).toEqual(expected);
    });

    it('should return a big number instance using the bn utility function', () => {
      const expected = '100000000';

      // #region instantiation-2
      // #import { bn };

      const result = bn('100000000').toString();
      // "100000000"
      // #endregion instantiation-2

      expect(result).toEqual(expected);
    });
  });

  describe('Contract', () => {
    it('should use BN in a contract', async () => {
      using launched = await launchTestNode({
        contractsConfigs: [
          {
            factory: EchoValuesFactory,
          },
        ],
      });

      const {
        contracts: [contract],
      } = launched;

      // #region contract-calls-1
      const MAX_U64 = bn('18446744073709551615');

      const { waitForResult } = await contract.functions.echo_u64(MAX_U64).call();
      const { value } = await waitForResult();

      value.toString();
      // "18446744073709551615"
      // #endregion contract-calls-1

      expect(value.toString()).toEqual(MAX_U64.toString());
    });
  });

  describe('parseUnits', () => {
    it('should parse small units', () => {
      const expected = '1';

      // #region parse-units-1
      const result = bn.parseUnits('0.000000001').toString();
      // "1"
      // #endregion parse-units-1

      expect(result).toEqual(expected);
    });

    it('should parse large units', () => {
      const expected = '100100000000000';

      // #region parse-units-2
      const result = bn.parseUnits('100100').toString();
      // "100100000000000"
      // #endregion parse-units-2

      expect(result).toEqual(expected);
    });

    it('should parse human readable numbers', () => {
      const expected = '100100000200001';

      // #region parse-units-3
      const result = bn.parseUnits('100,100.000200001').toString();
      // "100100000200001"
      // #endregion parse-units-3

      expect(result).toEqual(expected);
    });

    it('should parse one gwei', () => {
      const expected = '1000000000';

      // #region parse-units-4
      // #import { bn, DECIMAL_GWEI };

      const result = bn.parseUnits('1', DECIMAL_GWEI).toString();
      // "1000000000"
      // #endregion parse-units-4

      expect(result).toEqual(expected);
    });
  });

  describe('format', () => {
    it('should format one Gwei into Gwei units', () => {
      const expected = '1.000';

      // #region format-1
      const oneGwei = bn('1000000000');

      const result = oneGwei.format();
      // "1.000"
      // #endregion format-1

      expect(result).toEqual(expected);
    });

    it('should format two Gwei (BN) into Gwei units', () => {
      const expected = '2.000';

      // #region format-2
      // #import { bn, DECIMAL_GWEI };

      const twoGwei = bn('2000000000');

      const result = twoGwei.format({ units: DECIMAL_GWEI });
      // "2.000"
      // #endregion format-2

      expect(result).toEqual(expected);
    });

    it('should format with precision', () => {
      const expected = '1.0';

      // #region format-3
      const oneGwei = bn('1000000000');

      const result = oneGwei.format({ precision: 1 });
      // "1.0"
      // #endregion format-3

      expect(result).toEqual(expected);
    });
  });

  describe('formatUnits', () => {
    it('should format units of one gwei', () => {
      const expected = '1.000000000';

      // #region format-units-1
      const oneGwei = bn('1000000000');

      const result = oneGwei.formatUnits();
      // "1.000000000"
      // #endregion format-units-1

      expect(result).toEqual(expected);
    });

    it('should format units of one kwei', () => {
      const expected = '1.000000000000000';

      // #region format-units-2
      // #import { bn, DECIMAL_KWEI };

      const oneKwei = bn('1000000000000000');

      const result = oneKwei.formatUnits(DECIMAL_KWEI);
      // "1.000000000000000"
      // #endregion format-units-2

      expect(result).toEqual(expected);
    });
  });
});
