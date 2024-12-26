import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

execSync(`fuels-typegen -i src/contracts/src14 -o src/types`);

const typesPath = join(__dirname, '..', 'src', 'types');
const supportedRecipes = ['Src14OwnedProxy']
  .map((s) => [s, `${s}Factory`, `${s}Types`, `${s}-bytecode`, `${s}-storage-slots`])
  .flat()
  .map((s) => join(typesPath, 'contracts', `${s}.ts`))
  .concat([join(typesPath, 'common.ts')]);

const importReplacementMap = {
  Contract: '@fuel-ts/program',
  ContractFactory: '@fuel-ts/contract',
  DeployContractOptions: '@fuel-ts/contract',
  Interface: '@fuel-ts/abi-coder',
  Provider: '@fuel-ts/account',
  Account: '@fuel-ts/account',
  StorageSlot: '@fuel-ts/transactions',
  AbstractAddress: '@fuel-ts/interfaces',
  FunctionFragment: '@fuel-ts/abi-coder',
  InvokeFunction: '@fuel-ts/program',
  StrSlice: '@fuel-ts/interfaces',
  decompressBytecode: '@fuel-ts/utils',
};

for (const filepath of supportedRecipes) {
  let contents = readFileSync(filepath, 'utf-8');
  // Find all imports from 'fuels'
  const fuelImportsRegex = /import\s+(type\s+)?{([^}]+)}\s+from\s+['"]fuels['"];?/gs;
  const matches = [...contents.matchAll(fuelImportsRegex)];

  // Extract the imported items and create new import statements
  const importsByPackage = new Map<string, Set<string>>();

  matches.flatMap((match) => {
    const isTypeImport = Boolean(match[1]);
    return match[2]
      .split(',')
      .map((item) => ({
        name: item.trim(),
        isType: isTypeImport,
      }))
      .filter((item) => item.name.length > 0)
      .forEach(({ name, isType }) => {
        const packageName = importReplacementMap[name];
        if (!packageName) {
          throw new Error(`No package mapping found for: ${name}`);
        }

        if (!importsByPackage.has(packageName)) {
          importsByPackage.set(packageName, new Set());
        }
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        importsByPackage.get(packageName)!.add(isType ? `type ${name}` : name);
      });
  });

  // Create the import strings
  const newImports = Array.from(importsByPackage.entries())
    .map(([pkg, imports]) => `import { ${Array.from(imports).join(', ')} } from '${pkg}';`)
    .join('\n');

  // Add new imports at the top of the file
  const importRegex = /.*(?=import )/s;
  contents = contents.replace(importRegex, (match) => `${match}\n${newImports}`);

  // Replace all 'fuels' imports with the new imports
  matches.forEach((match) => {
    contents = contents.replace(match[0], '');
  });

  // Write the modified contents back to the file
  writeFileSync(filepath, contents);
}
