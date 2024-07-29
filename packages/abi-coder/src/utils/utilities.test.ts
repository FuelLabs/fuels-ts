import { OPTION_CODER_TYPE } from './constants';
import { hasNestedOption, type TCoders } from './utilities';

/**
 * @group node
 * @group browser
 */
describe('findNestedOption', () => {
  it('finds a deeply nested option - true', () => {
    const coders: TCoders = {
      DeepEnum: {
        name: 'DeepEnum',
        type: 'enum DeepEnum',
        encodedLength: 36,
        // @ts-expect-error enum coder contains coders
        coders: {
          a: {
            name: 'tuple',
            type: `(boolean, [${OPTION_CODER_TYPE}; 3])`,
            encodedLength: 28,
            coders: [
              {
                name: 'boolean',
                type: 'boolean',
                encodedLength: 1,
                options: { padToWordSize: false },
              },
              {
                name: 'array',
                type: `[${OPTION_CODER_TYPE}; 3]`,
                encodedLength: 27,
                // Deeply nested option
                coder: {
                  name: 'Option',
                  type: `${OPTION_CODER_TYPE}`,
                  encodedLength: 9,
                  coders: {
                    None: { name: 'tuple', type: '()', encodedLength: 0, coders: [] },
                    Some: {
                      name: 'number',
                      type: 'u8',
                      encodedLength: 1,
                      baseType: 'u8',
                      options: { padToWordSize: false },
                    },
                  },
                },
                length: 3,
              },
            ],
          },
        },
      },
    };

    expect(hasNestedOption(coders)).toBe(true);
  });

  it('finds a deeply nested option - false', () => {
    const coders: TCoders = {
      DeepEnum: {
        name: 'DeepEnum',
        type: 'enum DeepEnum',
        encodedLength: 36,
        // @ts-expect-error enum coder contains coders
        coders: {
          a: {
            name: 'tuple',
            type: `(boolean, [${OPTION_CODER_TYPE}; 3])`,
            encodedLength: 28,
            coders: [
              {
                name: 'boolean',
                type: 'boolean',
                encodedLength: 1,
                options: { padToWordSize: false },
              },
              {
                name: 'array',
                type: `[${OPTION_CODER_TYPE}; 3]`,
                encodedLength: 27,
                coder: {
                  name: 'AnotherEnum',
                  type: 'enum NotAnOption',
                  encodedLength: 9,
                  coders: {
                    None: { name: 'tuple', type: '()', encodedLength: 0, coders: [] },
                    Some: {
                      name: 'number',
                      type: 'u8',
                      encodedLength: 1,
                      baseType: 'u8',
                      options: { padToWordSize: false },
                    },
                  },
                },
                length: 3,
              },
            ],
          },
        },
      },
    };

    expect(hasNestedOption(coders)).toBe(false);
  });
});
