export interface Account {
  title: string;
  address: string;
  publicKey: string;
  vaultId: string;
}

export abstract class Vault<TOptions = any> {
  static readonly type: string;
  readonly entropy: string;

  constructor(options: TOptions & { entropy: string }) {
    this.entropy = options.entropy;
  }

  addAccount(index: number): { publicKey: string; address: string } {
    return {
      address: '',
      publicKey: '',
    };
  }

  exportAccount(index: number): string {
    return index.toString();
  }
}
