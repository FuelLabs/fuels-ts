import { encrypt, decrypt } from "fuels";

/**
 * Will throw if ESM support for NodeJS is broken:
 *  - https://github.com/FuelLabs/fuels-ts/issues/909
 */
export { encrypt, decrypt };
