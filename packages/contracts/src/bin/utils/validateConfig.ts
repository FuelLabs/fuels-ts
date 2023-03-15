/* eslint-disable @typescript-eslint/no-explicit-any */
import * as yup from 'yup';

import type { ContractsConfig } from '../../types';

const schema = yup
  .object({
    workspace: yup.string(),
    contracts: yup
      .array(yup.string().required('config.contracts should be a valid string'))
      .when('workspace', {
        is: (w?: string) => !w,
        then: yup
          .array()
          .required('config.contracts should be a valid array')
          .min(1, 'config.contracts should have at least 1 item'),
      }),
    scripts: yup.array(yup.string()),
    predicates: yup.array(yup.string()),
    output: yup.string().required('config.output should be a valid string'),
  })
  .required();

export async function validateConfig(config: ContractsConfig) {
  try {
    const isValid = await schema.validate(config);
    return isValid;
  } catch (err: any) {
    throw new Error(err.message);
  }
}
