// #region full
import { arrayify, hexlify } from 'fuels';

// Example: A real contract ID (B256 format)
const contractId: string = '0x625531542be70834dd127e771101ac1014111718451bfae996d97abe700c66a5';

// Convert B256 hex string to Uint8Array (raw bytes)
const bytes: Uint8Array = arrayify(contractId);
console.log('Bytes length:', bytes.length); // 32

// Convert back to B256 hex string
const hexString: string = hexlify(bytes);
console.log('Back to B256:', hexString);
// Both representations are equivalent
// #endregion full
