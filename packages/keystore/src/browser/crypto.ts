const { crypto, btoa } = globalThis;

if (!crypto) {
  throw new Error(`Could not found 'crypto' in current browser environment`);
}

if (!btoa) {
  throw new Error(`Could not found 'btoa' in current browser environment`);
}

export { crypto, btoa };
