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

/**
 * Generate functions and overloaded functions for the target abi
 */
export function codegenFunctions(
  options: GenerateFunctionOptions,
  fns: FunctionDeclaration[]
): string {
  if (fns.length === 1) {
    return generateFunction(options, fns[0]) + codegenForOverloadedFunctions(options, fns);
  }

  return codegenForOverloadedFunctions(options, fns);
}

/**
 * Generate overloaded functions for the target abi
 */
export function codegenForOverloadedFunctions(
  options: GenerateFunctionOptions,
  fns: FunctionDeclaration[]
): string {
  return fns.map((fn) => generateFunction(options, fn, `"${getSignatureForFn(fn)}"`)).join('\n');
}

/**
 * Generate function, docs and returns types for the target abi
 */
function generateFunction(
  options: GenerateFunctionOptions,
  fn: FunctionDeclaration,
  overloadedName?: string
): string {
  return `
  ${generateFunctionDocumentation(fn.documentation)}
  ${overloadedName ?? fn.name}(${generateInputTypes(fn.inputs, {
    useStructs: true,
  })}${`overrides?: ${'Overrides & { from?: string | Promise<string> }'}`}): ${`Promise<any>`};
`;
}

/**
 * Generate function documentation
 */
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

/**
 * Generate function interface
 */
export function generateInterfaceFunctionDescription(fn: FunctionDeclaration): string {
  return `'${getSignatureForFn(fn)}': FunctionFragment;`;
}

/**
 * Generate abi encode function for target
 */
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

/**
 * Generate abi decode function for target
 */
export function generateDecodeFunctionDataOverload(fn: FunctionDeclaration): string {
  return `decodeFunctionData(functionFragment: '${fn.name}', data: BytesLike): DecodedValue;`;
}

/**
 * Generate param names for abi target
 */
export function generateParamNames(params: Array<AbiParameter>): string {
  return params
    .map((param, index) => (param.name ? createPositionalIdentifier(param.name) : `arg${index}`))
    .join(', ');
}
