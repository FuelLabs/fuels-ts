export const OPTION_CODER_TYPE = 'enum Option';
export const stringRegEx = /str\[(?<length>[0-9]+)\]/;
export const arrayRegEx = /\[(?<item>[\w\s\\[\]]+);\s*(?<length>[0-9]+)\]/;
export const structRegEx = /^struct (?<name>\w+)$/;
export const enumRegEx = /^enum (?<name>\w+)$/;
export const tupleRegEx = /^\((?<items>.*)\)$/;
export const genericRegEx = /^generic (?<name>\w+)$/;
