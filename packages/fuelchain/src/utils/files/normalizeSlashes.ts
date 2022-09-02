export function normalizeSlashes(path: string) {
  return process.platform === 'win32' ? path.replace(/\\/g, '/') : path;
}
