import upperFirst from 'lodash.upperfirst';

import { ProgramTypeEnum } from '../types/enums/ProgramTypeEnum';

export function validateBinFile(params: {
  abiFilepath: string;
  binFilepath: string;
  binExists: boolean;
  category: ProgramTypeEnum;
}) {
  const { abiFilepath, binFilepath, binExists, category } = params;

  const isScript = category === ProgramTypeEnum.SCRIPT;

  if (!binExists && isScript) {
    throw new Error(
      [
        `Could not find BIN file for counterpart ${upperFirst(category)} ABI.`,
        `  - ABI: ${abiFilepath}`,
        `  - BIN: ${binFilepath}`,
        category,
      ].join('\n')
    );
  }
}
