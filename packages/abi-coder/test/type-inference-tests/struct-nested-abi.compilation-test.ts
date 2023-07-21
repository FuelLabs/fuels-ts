/* eslint-disable @typescript-eslint/no-unused-vars */

import { Interface } from '../../src';
import type { IsTrue } from '../../src/type-inferrer/type-utilities';

import type { InfersAbiCorrectly } from './setup';
import { structNestedAbi } from './struct-nested-abi';

const abi = new Interface(structNestedAbi.abi);

type AbiInferredCorrectly = IsTrue<
  InfersAbiCorrectly<
    typeof abi.functions,
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
