/**
 * Fuel Storage represent the storage interface used by Fuel Connector Manager.
 * On browser the default storage is the localStorage. For other environments
 * the storage should be provided.
 */
export interface FuelStorage {
  setItem: (key: string, value: string) => void;
  getItem: (key: string) => string | null;
  removeItem: (key: string) => void;
}
