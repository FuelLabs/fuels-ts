import * as cr from 'crypto';

export class CryptoMock {
  constructor(private toUndefined?: 'subtle' | 'randomUUID' | 'getRandomValues') {}

  get subtle() {
    return this.toUndefined === 'subtle' ? undefined : cr.subtle;
  }

  get randomUUID() {
    return this.toUndefined === 'randomUUID' ? undefined : cr.randomUUID;
  }

  get getRandomValues() {
    return this.toUndefined === 'getRandomValues' ? undefined : cr.getRandomValues;
  }
}
