import upperFirst from 'lodash.upperfirst';

import { ProgramTypeEnum } from '../types/enums/ProgramTypeEnum';

export function validateBinFile(params: {
  abiFilepath: string;
  binFilepath: string;
  binExists: boolean;
  programType: ProgramTypeEnum;
}) {
  const { abiFilepath, binFilepath, binExists, programType } = params;

  const isScript = programType === ProgramTypeEnum.SCRIPT;

  if (!binExists && isScript) {
    throw new Error(
      [
        `Could not find BIN file for counterpart ${upperFirst(programType)} ABI.`,
        `  - ABI: ${abiFilepath}`,
        `  - BIN: ${binFilepath}`,
        programType,
      ].join('\n')
    );
  }
}
