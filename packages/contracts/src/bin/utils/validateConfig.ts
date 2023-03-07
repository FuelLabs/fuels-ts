/* eslint-disable @typescript-eslint/no-explicit-any */
import * as yup from 'yup';

import type { ContractsConfig } from '../../types';

const schema = yup
  .object({
    workspace: yup.string(),
    contracts: yup
      .array(yup.string().required('config.contracts.path should be a valid string'))
      .when('workspace', {
        is: (w?: string) => !w,
        then: yup.array().required().min(1, 'config.contracts should be a valid array'),
      }),
    output: yup.string().required('config.types.output should be a valid string'),
  })
  .required();

export async function validateConfig(config: ContractsConfig) {
  try {
    await schema.validate(config);
  } catch (err: any) {
    throw new Error(err.message);
  }
}
