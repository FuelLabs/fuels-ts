import { AbiParser, type AbiSpecification } from 'fuels';

import { Parser } from '../../test/typegen';

import expected from './abi-parser.json';

/**
 * @group node
 * @group browser
 */
describe('AbiParser', () => {
  test('parses encoding version as expected', () => {
    const parsed = AbiParser.parse(Parser.abi as AbiSpecification);
    expect(parsed.encodingVersion).toEqual(expected.encodingVersion);
  });

  test('parses program type as expected', () => {
    const parsed = AbiParser.parse(Parser.abi as AbiSpecification);
    expect(parsed.programType).toEqual(expected.programType);
  });

  test('parses metadata types as expected', () => {
    const parsed = AbiParser.parse(Parser.abi as AbiSpecification);
    expect(parsed.metadataTypes).toEqual(expected.metadataTypes);
  });

  test('parses concrete types as expected', () => {
    const parsed = AbiParser.parse(Parser.abi as AbiSpecification);
    expect(parsed.concreteTypes).toEqual(expected.concreteTypes);
  });

  test('parses functions as expected', () => {
    const parsed = AbiParser.parse(Parser.abi as AbiSpecification);
    expect(parsed.functions).toEqual(expected.functions);
  });

  test('parses logged types as expected', () => {
    const parsed = AbiParser.parse(Parser.abi as AbiSpecification);
    expect(parsed.loggedTypes).toEqual(expected.loggedTypes);
  });

  test('parses message types as expected', () => {
    const parsed = AbiParser.parse(Parser.abi as AbiSpecification);
    expect(parsed.messageTypes).toEqual(expected.messageTypes);
  });

  test('parses configurables as expected', () => {
    const parsed = AbiParser.parse(Parser.abi as AbiSpecification);
    expect(parsed.configurables).toEqual(expected.configurables);
  });
});
