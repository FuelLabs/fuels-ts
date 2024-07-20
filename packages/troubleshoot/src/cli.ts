import { snapshot } from './snapshot';

export function runTroubleshoot() {
  const { log } = console;
  log(JSON.stringify(snapshot, null, 2));
}
