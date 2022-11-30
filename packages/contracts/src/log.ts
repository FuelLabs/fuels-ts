export function log(...data: unknown[]) {
  const { log: logger } = console;
  logger(...data);
}
