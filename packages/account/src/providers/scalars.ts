import { DateTime } from '@fuel-ts/utils';
import { GraphQLScalarType, Kind } from 'graphql';

export const UnixMillisecondScalar = new GraphQLScalarType<DateTime, number>({
  name: 'UnixMilliseconds',
  description: 'DateTime custom scalar type',
  serialize(value: unknown): number {
    if (value instanceof DateTime) {
      return value.toUnixMilliseconds();
    }

    throw new Error('Unable to serialize value');
  },
  parseValue(value: unknown): DateTime {
    if (typeof value === 'number') {
      return DateTime.fromUnixMilliseconds(value);
    }
    throw new Error('Unable to parse value');
  },
  parseLiteral(ast): DateTime {
    if (ast.kind === Kind.INT) {
      return DateTime.fromUnixMilliseconds(Number(ast.value));
    }
    throw new Error('Unable to parse literal');
  },
});

export const Tai64Scalar = new GraphQLScalarType<DateTime, string>({
  name: 'Tai64',
  description: 'Tai64 custom scalar type',
  serialize(value: unknown): string {
    if (value instanceof DateTime) {
      return value.toTai64();
    }

    throw new Error('Unable to serialize value');
  },
  parseValue(value: unknown): DateTime {
    if (typeof value === 'string') {
      return DateTime.fromTai64(value);
    }
    throw new Error('Unable to parse value');
  },
  parseLiteral(ast): DateTime {
    if (ast.kind === Kind.STRING) {
      return DateTime.fromTai64(ast.value);
    }
    throw new Error('Unable to parse literal');
  },
});
