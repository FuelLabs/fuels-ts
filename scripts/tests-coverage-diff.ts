import { diff as coverageDiff } from 'coverage-diff';
import { readFileSync, writeFileSync } from 'fs';

const getDiff = () => {
  const base = JSON.parse(readFileSync('coverage-master/coverage-summary.json').toString());
  const head = JSON.parse(readFileSync('coverage/report/coverage-summary.json').toString());
  return coverageDiff(base, head);
};

(() => {
  const { results } = getDiff();
  const formattedResults = results.split(`${process.cwd()}/`).join('');
  const resultsSections = formattedResults.split('Total:');
  const report = `
  ***Coverage Report:***
  ${resultsSections[1]}

  <details>
  
  <summary>Changed Files:</summary>

  ${resultsSections[0]}
  </details>
  `;

  console.log(report);
  writeFileSync('coverage/report/coverage-diff.txt', report, { flag: 'w' });
})();
