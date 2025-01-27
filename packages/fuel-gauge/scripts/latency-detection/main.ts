import 'dotenv/config';
import fs from 'fs';

import { preparatorySteps, runOperations } from './helpers';
import { missing4xOutputVariableCall } from './missing-4x-variable-output-call';
import { missingOutputVariableCall } from './missing-variable-output-call';
import { scriptCall } from './script-call';
import { scriptWithPredicateCall } from './script-with-predicate-call';

const { log, error } = console;

const DIR_NAME = 'snapshots';

const main = async () => {
  const operations = [
    scriptCall,
    missingOutputVariableCall,
    missing4xOutputVariableCall,
    scriptWithPredicateCall,
  ];

  const operationsParams = await preparatorySteps();
  const results = await runOperations(operations, operationsParams);

  const date = new Date();

  const filename = `${date.toISOString().slice(0, 16)}.json`;

  fs.mkdirSync(DIR_NAME, { recursive: true });
  fs.writeFileSync(`${DIR_NAME}/${filename}`, JSON.stringify(results, null, 2));

  log(`Snapshots saved into "${DIR_NAME}/${filename}"`);
};

main().catch(error);
