import 'dotenv/config';

import { setupPerformanceAnalysis, runOperations, parseResults, saveResults } from './helpers';
import { missing4xOutputVariableCall } from './missing-4x-variable-output-call';
import { missingOutputVariableCall } from './missing-variable-output-call';
import { scriptCall } from './script-call';
import { scriptWithPredicateCall } from './script-with-predicate-call';
import { simpleTransfer } from './simple-transfer';

const { error } = console;

const main = async () => {
  const operations = [
    simpleTransfer,
    scriptCall,
    missingOutputVariableCall,
    missing4xOutputVariableCall,
    scriptWithPredicateCall,
  ];

  const operationsParams = await setupPerformanceAnalysis();
  const results = await runOperations(operations, operationsParams);
  const parsedResults = parseResults(results);
  saveResults(parsedResults);
};

main().catch(error);
