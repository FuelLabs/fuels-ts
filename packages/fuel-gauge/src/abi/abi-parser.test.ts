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

    /**
     * This is split up instead of comparing the whole object
     * so that we can see the specific differences
     * because the JSON is huge and the diff gets cut off in the terminal
     */
    expect({ encodingVersion: parsed.encodingVersion }).toEqual({
      encodingVersion: expected.encodingVersion,
    });
    expect({ programType: parsed.programType }).toEqual({ programType: expected.programType });
    expect({ metadataTypes: parsed.metadataTypes }).toEqual({
      metadataTypes: expected.metadataTypes,
    });
    expect({ concreteTypes: parsed.concreteTypes }).toEqual({
      concreteTypes: expected.concreteTypes,
    });
    expect({ functions: parsed.functions }).toEqual({ functions: expected.functions });
    expect({ loggedTypes: parsed.loggedTypes }).toEqual({ loggedTypes: expected.loggedTypes });
    expect({ messageTypes: parsed.messageTypes }).toEqual({ messageTypes: expected.messageTypes });
    expect({ configurables: parsed.configurables }).toEqual({
      configurables: expected.configurables,
    });
  });
});
