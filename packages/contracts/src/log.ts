export function log(...data: unknown[]) {
  const { log: logger } = console;
  logger(...data);
}

export function error(...data: unknown[]) {
  const { error: logger } = console;
  logger(...data);
}
