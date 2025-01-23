import 'dotenv/config';
import fs from 'fs';

import { preparatorySteps, runOperations, toCsv } from './helpers';
import { missing4xOutputVariableCall } from './missing-4x-variable-output-call';
import { missingOutputVariableCall } from './missing-variable-output-call';
import { scriptCall } from './script-call';
import { scriptWithPredicateCall } from './script-with-predicate-call';

const { log, error } = console;

const main = async () => {
  const operations = [
    scriptCall,
    missingOutputVariableCall,
    missing4xOutputVariableCall,
    scriptWithPredicateCall,
  ];

  const operationsParams = await preparatorySteps();
  const results = await runOperations(operations, operationsParams);

  const csvString = toCsv(['tag', 'time'], results);
  const date = new Date();
  const dirName = 'snapshots';
  const filename = `${date.toISOString().slice(0, 16)}.csv`;
  fs.mkdirSync(dirName, { recursive: true });
  fs.writeFileSync(`${dirName}/${filename}`, csvString);
  log(`Snapshots saved into "${dirName}/${filename}"`);
};

main().catch(error);
