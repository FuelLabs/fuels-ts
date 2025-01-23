import { arrayCoderFactory } from './array';
import { enumCoderFactory } from './enum';
import { optionFactory } from './option';
import { stringFactory } from './string';
import { structCoderFactory } from './struct';
import { tupleCoderFactory } from './tuple';
import { vectorFactory } from './vector';

export const factories = {
  array: arrayCoderFactory,
  enum: enumCoderFactory,
  tuple: tupleCoderFactory,
  struct: structCoderFactory,
  vector: vectorFactory,
  string: stringFactory,
  option: optionFactory,
};
