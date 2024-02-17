/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Target Object that represents the global event bus used by Fuel Connector Manager.
 * On browser the default target is the window or document. For other environments
 * the event bus should be provided.
 */
export interface TargetObject {
  on?: (event: string, callback: any) => void;
  off?: (event: string, callback: any) => void;
  emit?: (event: string, data: any) => void;
  addEventListener?: (event: string, callback: any) => void;
  removeEventListener?: (event: string, callback: any) => void;
  postMessage?: (message: string) => void;
}
