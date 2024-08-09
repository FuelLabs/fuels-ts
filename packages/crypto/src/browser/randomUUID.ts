import type { CryptoApi } from '../types';

import { crypto } from './crypto';

export const randomUUID: CryptoApi['randomUUID'] = () => crypto.randomUUID();
