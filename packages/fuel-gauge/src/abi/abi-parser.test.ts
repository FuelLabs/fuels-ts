import { AbiParser, type AbiSpecification } from 'fuels';

import { Parser } from '../../test/typegen';

import expected from './abi-parser.json';

/**
 * @group node
 * @group browser
 */
describe('AbiParser', () => {
  test('runs just fine', () => {
    const parsed = AbiParser.parse(Parser.abi as AbiSpecification);

    expect(parsed).toEqual(expected);
  });
});
