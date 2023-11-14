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
  writeFileSync('coverage/report/coverage-diff.txt', formattedResults, { flag: 'w' });
})();
