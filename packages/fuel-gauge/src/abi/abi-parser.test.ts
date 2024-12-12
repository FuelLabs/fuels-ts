import { AbiParser, type AbiSpecification } from 'fuels';

import { Parser } from '../../test/typegen';

import expected from './abi-parser.json';

/**
 * @group node
 * @group browser
 */
describe('AbiParser', () => {
  test('parses as expected', () => {
    const parsed = AbiParser.parse(Parser.abi as AbiSpecification);

    expect(parsed).toEqual(expected);
  });
});
