import type { Config, Services } from '../../typechain/types';

import { addPreambleOutputTransformer } from './preamble';
import { prettierOutputTransformer } from './prettier';

export type OutputTransformer = (output: string, services: Services, cfg: Config) => string;

export const outputTransformers = [addPreambleOutputTransformer, prettierOutputTransformer];
