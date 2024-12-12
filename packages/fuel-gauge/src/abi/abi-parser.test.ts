import { AbiParser, type AbiSpecification } from '@fuel-ts/abi';
import { writeFileSync } from 'fs';

import { Parser } from '../../test/typegen';

import expected from './abi-parser.json';

describe('AbiParser', () => {
  test('runs just fine', () => {
    const parsed = AbiParser.parse(Parser.abi as AbiSpecification);

    writeFileSync('asdf.json', JSON.stringify(parsed, null, 2));

    expect({ metadataTypes: parsed.metadataTypes }).toEqual({
      metadataTypes: expected.metadataTypes,
    });
    expect({ concreteTypes: parsed.types }).toEqual({ concreteTypes: expected.types });
  });
});
``;
