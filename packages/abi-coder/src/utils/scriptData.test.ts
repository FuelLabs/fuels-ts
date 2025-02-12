import { bn } from '@fuel-ts/math';
import { arrayify } from '@fuel-ts/utils';

import type { JsonAbi } from '../types/JsonAbiNew';

import { decodeScriptData } from './scriptData';

/**
 * @group node
 * @group browser
 */
describe('decodeScriptData', () => {
  it('decodes valid script data [w/o abi]', () => {
    const scriptData =
      '0x0000000000000000000000000000000000000000000000000000000000000000000000000000000068b1efc67fc1052e40743e7d29373cfbd4736e1709fcbe130b17cdf10912c8db00000000000028f00000000000002902000000000000000a6d696e745f636f696e7300000000000186a0';
    const actual = decodeScriptData(arrayify(scriptData));

    const expectedDecodedScriptData = {
      amount: bn(0),
      assetId: '0x0000000000000000000000000000000000000000000000000000000000000000',
      contractId: '0x68b1efc67fc1052e40743e7d29373cfbd4736e1709fcbe130b17cdf10912c8db',
      functionSelector: 'mint_coins',
      functionArgs: undefined,
    };

    expect(JSON.stringify(expectedDecodedScriptData)).toBe(JSON.stringify(actual));
  });

  it('decodes valid script data [w/ abi]', () => {
    const abi: JsonAbi = {
      programType: 'contract',
      specVersion: '1',
      encodingVersion: '1',
      concreteTypes: [
        {
          type: '()',
          concreteTypeId: '2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d',
        },
        {
          type: 'u64',
          concreteTypeId: '1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0',
        },
      ],
      metadataTypes: [],
      functions: [
        {
          inputs: [
            {
              name: 'mint_amount',
              concreteTypeId: '1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0',
            },
          ],
          name: 'mint_coins',
          output: '2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d',
          attributes: null,
        },
      ],
      loggedTypes: [],
      messagesTypes: [],
      configurables: [],
    };

    const expectedDecodedScriptData = {
      amount: bn(0),
      assetId: '0x0000000000000000000000000000000000000000000000000000000000000000',
      contractId: '0x68b1efc67fc1052e40743e7d29373cfbd4736e1709fcbe130b17cdf10912c8db',
      functionSelector: 'mint_coins',
      functionArgs: [bn(100_000)],
    };

    const scriptData =
      '0x0000000000000000000000000000000000000000000000000000000000000000000000000000000068b1efc67fc1052e40743e7d29373cfbd4736e1709fcbe130b17cdf10912c8db00000000000028f00000000000002902000000000000000a6d696e745f636f696e7300000000000186a0';
    const actual = decodeScriptData(arrayify(scriptData), abi);

    expect(JSON.stringify(expectedDecodedScriptData)).toBe(JSON.stringify(actual));
  });
});
