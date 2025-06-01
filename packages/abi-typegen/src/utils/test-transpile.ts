import abi from './errorsAbi.json';
import { transpileAbi } from './transpile-abi';

console.dir(transpileAbi(abi), { depth: null });
