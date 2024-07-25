import { versions as builtInVersions, type BinaryVersions, type Versions } from '@fuel-ts/versions';

type InternalVersions = Pick<Versions, 'FUELS'> & Partial<Pick<Versions, 'FORC' | 'FUEL_CORE'>>;

export class VersionStore {
  private static _instance: VersionStore | null = null;
  private versions: InternalVersions;

  private constructor(versions: InternalVersions) {
    this.versions = versions;
  }

  private static instance(versions?: Partial<BinaryVersions>) {
    if (!this._instance) {
      this._instance = new VersionStore({
        FUELS: builtInVersions.FUELS,
        FUEL_CORE: versions?.FUEL_CORE,
        FORC: versions?.FORC,
      });
    }

    return this._instance;
  }

  static set(versions?: Partial<BinaryVersions>) {
    this.instance(versions);
  }

  static get(): InternalVersions {
    return this.instance().versions;
  }
}
