import chainConfigJson from './defaultSnapshots/chainConfig.json';
import metadataJson from './defaultSnapshots/metadata.json';
import stateConfigJson from './defaultSnapshots/stateConfig.json';
import type { SnapshotConfigs } from './types';

export const defaultSnapshotConfigs: SnapshotConfigs = {
  chainConfig: chainConfigJson,
  metadata: metadataJson,
  stateConfig: stateConfigJson,
};

export const defaultConsensusKey =
  '0xa449b1ffee0e2205fa924c6740cc48b3b473aa28587df6dab12abc245d1f5298';
