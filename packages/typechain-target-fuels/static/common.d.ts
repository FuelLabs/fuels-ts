type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;

type IsUnion<T> = [T] extends [UnionToIntersection<T>] ? false : true;

/* 
  Enum from Sway takes one and only one key-value
*/
export type Enum<T> = IsUnion<keyof T> extends true ? never : {} extends T ? never : T;