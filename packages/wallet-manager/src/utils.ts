export function getPassword(password: Bytes | string): Uint8Array {
  if (typeof password === 'string') {
    return toUtf8Bytes(password, UnicodeNormalizationForm.NFKC);
  }
  return arrayify(password);
}
