import { DateTime } from '@fuel-ts/utils';
import { GraphQLObjectType, GraphQLSchema, Kind, graphql } from 'graphql';

import { Tai64Scalar, UnixMillisecondScalar } from './scalars';

/**
 * @group node
 */
describe('GraphQL Scalars', () => {
  const tai64: string = '4611686020108779312';
  const unixMilliseconds: number = 1681391398000;

  describe('Tai64', () => {
    it('should be able to serialize a Tai64', () => {
      const date = DateTime.fromTai64(tai64);
      const serialized = Tai64Scalar.serialize(date);

      expect(serialized).toEqual(tai64);
    });

    it('should throw while calling serialize on a non-DateTime value', () => {
      expect(() => Tai64Scalar.serialize('Some string')).toThrow();
      expect(() => Tai64Scalar.serialize('1312313')).toThrow();
    });

    it('should be able to parse a Tai64', () => {
      const date = Tai64Scalar.parseValue(tai64);

      expect(date).toBeDefined();
      expect(date?.toTai64()).toEqual(tai64);
    });

    it('should throw when parsing a non-string value', () => {
      expect(() => Tai64Scalar.parseValue(123123)).toThrow();
      expect(() => Tai64Scalar.parseValue(0.0132)).toThrow();
    });

    it('should be able to parse a Tai64 literal', () => {
      const date = Tai64Scalar.parseLiteral({ kind: Kind.STRING, value: tai64 });

      expect(date).toBeDefined();
      expect(date?.toTai64()).toEqual(tai64);
    });

    it('should throw when parsing a non-supported literal', () => {
      expect(() =>
        Tai64Scalar.parseLiteral({ kind: Kind.INT, value: (123123).toString() })
      ).toThrow();
      expect(() =>
        Tai64Scalar.parseLiteral({ kind: Kind.FLOAT, value: (0.0132).toString() })
      ).toThrow();
    });
  });

  describe('UnixMilliseconds', () => {
    it('should be able to serialize a UnixMilliseconds', () => {
      const date = DateTime.fromUnixMilliseconds(unixMilliseconds);
      const serialized = UnixMillisecondScalar.serialize(date);

      expect(serialized).toEqual(unixMilliseconds);
    });

    it('should throw while calling serialize on a non-DateTime value', () => {
      expect(() => UnixMillisecondScalar.serialize('Some string')).toThrow();
      expect(() => UnixMillisecondScalar.serialize('1312313')).toThrow();
    });

    it('should be able to parse a UnixMilliseconds', () => {
      const date = UnixMillisecondScalar.parseValue(unixMilliseconds);

      expect(date).toBeDefined();
      expect(date?.toUnixMilliseconds()).toEqual(unixMilliseconds);
    });

    it('should throw when parsing a non-number value', () => {
      expect(() => UnixMillisecondScalar.parseValue('Some string')).toThrow();
      expect(() => UnixMillisecondScalar.parseValue('123123')).toThrow();
    });

    it('should be able to parseLiteral', () => {
      const date = UnixMillisecondScalar.parseLiteral({
        kind: Kind.INT,
        value: unixMilliseconds.toString(),
      });

      expect(date).toBeDefined();
      expect(date?.toUnixMilliseconds()).toEqual(unixMilliseconds);
    });

    it('should throw when parsing a non-supported literal', () => {
      expect(() =>
        UnixMillisecondScalar.parseLiteral({ kind: Kind.STRING, value: 'Some string' })
      ).toThrow();
      expect(() =>
        UnixMillisecondScalar.parseLiteral({ kind: Kind.FLOAT, value: (0.0132).toString() })
      ).toThrow();
    });
  });

  describe('Integration', () => {
    const rootQuery = new GraphQLObjectType({
      name: 'Query',
      fields: {
        tai64: { type: Tai64Scalar, resolve: () => DateTime.fromTai64(tai64) },
        unixMilliseconds: {
          type: UnixMillisecondScalar,
          resolve: () => DateTime.fromUnixMilliseconds(unixMilliseconds),
        },
      },
    });
    const types = [Tai64Scalar, UnixMillisecondScalar];
    const schema = new GraphQLSchema({ query: rootQuery, types });

    beforeEach(() => vi.resetAllMocks);

    it('should be able to query a Tai64', async () => {
      const query = `
        query {
          tai64
        }
      `;

      const result = await graphql({
        schema,
        source: query,
      });

      expect(result).toBeDefined();
      expect(result.errors).toBeUndefined();
      expect(result.data?.tai64).toEqual(tai64);
    });

    it('should be able to query a UnixMilliseconds', async () => {
      const query = `
        query {
          unixMilliseconds
        }
      `;

      const result = await graphql({
        schema,
        source: query,
      });

      expect(result).toBeDefined();
      expect(result.errors).toBeUndefined();
      expect(result.data?.unixMilliseconds).toEqual(unixMilliseconds);
    });
  });
});
