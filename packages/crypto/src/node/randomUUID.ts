import { randomUUID as UUID } from 'crypto';

import type { CryptoApi } from '../types';

export const randomUUID: CryptoApi['randomUUID'] = () => UUID();
