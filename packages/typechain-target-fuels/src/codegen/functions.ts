/* eslint-disable @typescript-eslint/no-use-before-define */
import type { CodegenConfig } from 'typechain';
import { createPositionalIdentifier } from 'typechain';

import type { AbiParameter, FunctionDeclaration, FunctionDocumentation } from '../parser/abiParser';
import { getSignatureForFn } from '../utils';

import { generateInputType, generateInputTypes } from './types';

interface GenerateFunctionOptions {
  returnResultObject?: boolean;
  isStaticCall?: boolean;
  overrideOutput?: string;
  codegenConfig: CodegenConfig;
}

export function codegenFunctions(
  options: GenerateFunctionOptions,
  fns: FunctionDeclaration[]
): string {
  if (fns.length === 1) {
    return generateFunction(options, fns[0]) + codegenForOverloadedFunctions(options, fns);
  }

  return codegenForOverloadedFunctions(options, fns);
}

export function codegenForOverloadedFunctions(
  options: GenerateFunctionOptions,
  fns: FunctionDeclaration[]
): string {
  return fns.map((fn) => generateFunction(options, fn, `"${getSignatureForFn(fn)}"`)).join('\n');
}

function generateFunction(
  options: GenerateFunctionOptions,
  fn: FunctionDeclaration,
  overloadedName?: string
): string {
  return `
  ${generateFunctionDocumentation(fn.documentation)}
  ${overloadedName ?? fn.name}(${generateInputTypes(fn.inputs, {
    useStructs: true,
  })}${`overrides?: ${'Overrides & { from?: string | Promise<string> }'}`}): ${`Promise<TransactionResponse>`};
`;
}

function generateFunctionDocumentation(doc?: FunctionDocumentation): string {
  if (!doc) return '';

  let docString = '/**';
  if (doc.details) docString += `\n * ${doc.details}`;
  if (doc.notice) docString += `\n * ${doc.notice}`;

  const params = Object.entries(doc.params || {});
  if (params.length) {
    params.forEach(([key, value]) => {
      docString += `\n * @param ${key} ${value}`;
    });
  }

  if (doc.return) docString += `\n * @returns ${doc.return}`;

  docString += '\n */';

  return docString;
}

export function generateInterfaceFunctionDescription(fn: FunctionDeclaration): string {
  return `'${getSignatureForFn(fn)}': FunctionFragment;`;
}

export function generateEncodeFunctionDataOverload(fn: FunctionDeclaration): string {
  const methodInputs = [`functionFragment: '${fn.name}'`];

  if (fn.inputs.length) {
    methodInputs.push(
      `values: [${fn.inputs
        .map((input) => generateInputType(input.type, { useStructs: true }))
        .join(', ')}]`
    );
  } else {
    methodInputs.push('values?: undefined');
  }

  return `encodeFunctionData(${methodInputs.join(', ')}): string;`;
}

export function generateDecodeFunctionDataOverload(fn: FunctionDeclaration): string {
  return `decodeFunctionData(functionFragment: '${fn.name}', data: BytesLike): DecodedValue;`;
}

export function generateParamNames(params: Array<AbiParameter>): string {
  return params
    .map((param, index) => (param.name ? createPositionalIdentifier(param.name) : `arg${index}`))
    .join(', ');
}
