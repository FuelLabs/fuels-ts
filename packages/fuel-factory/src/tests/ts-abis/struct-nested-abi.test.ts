/* eslint-disable @typescript-eslint/no-unused-vars */

import type { IsTrue } from '@fuel-ts/abi-coder';

import type { InfersAbiCorrectly } from './setup';
import { dummyId, dummyProvider, factory } from './setup';

const contract = factory.contracts('struct-nested').connect(dummyId, dummyProvider);

type AbiInferredCorrectly = IsTrue<
  InfersAbiCorrectly<
    typeof contract.functions,
    {
      multi_params: {
        input: {
          x: {
            propD1: {
              propE1: {
                propA1: number;
              };
              propE2: {
                propB1: {
                  propA1: number;
                };
                propB2: number;
              };
              propE3: number;
            }[];
            propD2: number;
            propD3: {
              propF1: number;
              propF2: {
                propG1: number;
              }[];
            };
          };
        };
        output: boolean;
      };

      single_params: {
        input: {
          x: {
            propA1: number;
          };
          y: {
            propB1: {
              propA1: number;
            };
            propB2: number;
          };
          z: {
            propC1: {
              propA1: number;
            };
            propC2: {
              propB1: {
                propA1: number;
              };
              propB2: number;
            }[];
            propC3: {
              propD1: {
                propE1: {
                  propA1: number;
                };
                propE2: {
                  propB1: {
                    propA1: number;
                  };
                  propB2: number;
                };
                propE3: number;
              }[];
              propD2: number;
              propD3: {
                propF1: number;
                propF2: string;
              };
            };
            propC4: {
              propD1: {
                propE1: {
                  propA1: number;
                };
                propE2: {
                  propB1: {
                    propA1: number;
                  };
                  propB2: number;
                };
                propE3: number;
              }[];
              propD2: number;
              propD3: {
                propF1: number;
                propF2: boolean;
              };
            }[];
            propC5: {
              propD1: {
                propE1: {
                  propA1: number;
                };
                propE2: {
                  propB1: {
                    propA1: number;
                  };
                  propB2: number;
                };
                propE3: number;
              }[];
              propD2: number;
              propD3: {
                propF1: number;
                propF2: {
                  propG1: number;
                }[];
              };
            }[];
          };
        };
        output: boolean;
      };
    }
  >
>;
