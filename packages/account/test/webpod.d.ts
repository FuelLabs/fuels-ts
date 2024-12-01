/// <reference types="@webpod/ps" />

/**
 * This is a resolution on the following issue:
 * https://github.com/webpod/ps/issues/4
 */
declare module '@webpod/ps' {
  export type TPsTreeOpts = {
    pid: string | number;
    recursive?: boolean;
  };

  export type TPsLookupEntry = {
    pid: string;
    ppid?: string;
    command: string;
    arguments: string[];
  };

  export function tree(opts?: TPsTreeOpts): Promise<TPsLookupEntry[]>;
}
