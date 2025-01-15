import { getRandomB256 } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import { ScriptMainReturnStruct } from '../../test/typegen/scripts/ScriptMainReturnStruct';
import type { ScriptMainReturnStructInputs } from '../../test/typegen/scripts/ScriptMainReturnStruct';
import {
  ScriptWithComplexArgs,
  type AssetIdInput,
  type ScriptWithComplexArgsInputs,
} from '../../test/typegen/scripts/ScriptWithComplexArgs';
import type { Vec } from '../../test/typegen/scripts/common';

/**
 * @group browser
 * @group node
 */
describe('abi-script', () => {
  describe('decodeArguments', () => {
    it('should decode arguments with a simple script', async () => {
      using launched = await launchTestNode();
      const {
        wallets: [funder],
      } = launched;

      const args: ScriptMainReturnStructInputs = [1, { x: 2 }];

      // Run script
      const script = new ScriptMainReturnStruct(funder);
      const tx = await script.functions.main(...args).call();
      const { value, transactionResult } = await tx.waitForResult();
      expect(value).toEqual({ x: 3 });

      // Assert script data
      const scriptData = transactionResult.transaction.scriptData;
      if (!scriptData) {
        throw new Error('No script data');
      }

      // Assert the decoded script data matches the input arguments
      const fn = script.interface.getFunction('main');
      const decoded = fn.decodeArguments(scriptData);
      expect(decoded).toEqual(args);
    });

    it('should decode arguments with a complex script', async () => {
      using launched = await launchTestNode();

      const {
        wallets: [wallet],
      } = launched;

      const arg1 = 100;
      const arg2 = { bits: getRandomB256() };
      const arg3 = 100;
      const arg4 = [[{ bits: getRandomB256() }, { bits: getRandomB256() }, true]] as Vec<
        [AssetIdInput, AssetIdInput, boolean]
      >;
      const arg5 = { Address: { bits: getRandomB256() } };
      const arg6 = 100;

      // Run script
      const script = new ScriptWithComplexArgs(wallet);
      const args: ScriptWithComplexArgsInputs = [arg1, arg2, arg3, arg4, arg5, arg6];
      const tx = await script.functions.main(...args).call();
      const { value, transactionResult } = await tx.waitForResult();
      expect(value).toEqual(true);

      // Assert script data
      const scriptData = transactionResult.transaction.scriptData;
      if (!scriptData) {
        throw new Error('No script data');
      }

      // Assert the decoded script data matches the input arguments
      const fn = script.interface.getFunction('main');
      const decoded = fn.decodeArguments(scriptData);
      expect(decoded).toEqual([
        expect.toEqualBn(arg1),
        arg2,
        expect.toEqualBn(arg3),
        arg4,
        arg5,
        expect.toEqualBn(arg6),
      ]);
    });
  });
});
