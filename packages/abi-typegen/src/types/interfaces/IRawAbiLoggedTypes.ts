import type { IRawAbiFunctionIO } from './IRawAbiFunction';

export interface IRawAbiLoggedTypes extends IRawAbiFunctionIO {
  logId: string;
}
