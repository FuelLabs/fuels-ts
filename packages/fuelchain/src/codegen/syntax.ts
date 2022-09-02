/**
 * A set of reserved words in EcmaScript 2021
 * @see https://262.ecma-international.org/12.0/#prod-ReservedWord
 */
// prettier-ignore
const RESERVED_WORDS = new Set([
  'await',    'break',      'case',
  'catch',    'class',      'const',
  'continue', 'debugger',   'default',
  'delete',   'do',         'else',
  'enum',     'export',     'extends',
  'false',    'finally',    'for',
  'function', 'if',         'import',
  'in',       'instanceof', 'new',
  'null',     'return',     'super',
  'switch',   'this',       'throw',
  'true',     'try',        'typeof',
  'var',      'void',       'while',
  'with',     'yield'
])

/**
 * Creates an identifier prefixing reserved words with `_`.
 * We can only use this for function parameters and tuple element names.
 * Using it for method names would clas with runtime codegen.
 *
 * @internal
 */
export function createPositionalIdentifier(identifierName: string): string {
  if (RESERVED_WORDS.has(identifierName)) {
    return `_${identifierName}`;
  }
  return identifierName;
}

/**
 * @internal
 */
export function getUsedIdentifiers(identifiers: string[], sourceFile: string): string[] {
  const usedIdentifiers: Set<string> = new Set();
  identifiers.forEach((identifier) => {
    if (new RegExp(`\\W${identifier}(\\W|$)`).test(sourceFile)) usedIdentifiers.add(identifier);
  });
  return Array.from(usedIdentifiers);
}

/**
 * @internal
 */
function createImportDeclaration(identifiers: string[], moduleSpecifier: string) {
  return identifiers.length > 0
    ? `import { ${identifiers.join(', ')} } from "${moduleSpecifier}"`
    : '';
}

/**
 * @internal
 */
export function createImportTypeDeclaration(identifiers: string[], moduleSpecifier: string) {
  return identifiers.length > 0
    ? `import type { ${identifiers.join(', ')} } from "${moduleSpecifier}"`
    : '';
}

type ModuleSpecifier = string;
type Identifier = string;
/**
 * @internal
 */
export function createImportsForUsedIdentifiers(
  possibleImports: Record<ModuleSpecifier, Identifier[]>,
  sourceFile: string
) {
  const typePrefix = 'type ';
  return Object.entries(possibleImports)
    .map(([moduleSpecifier, identifiers]) =>
      moduleSpecifier.startsWith(typePrefix)
        ? createImportTypeDeclaration(
            getUsedIdentifiers(identifiers, sourceFile),
            moduleSpecifier.substring(typePrefix.length)
          )
        : createImportDeclaration(getUsedIdentifiers(identifiers, sourceFile), moduleSpecifier)
    )
    .join('\n');
}
