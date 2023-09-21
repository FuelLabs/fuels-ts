export type ForcToml = {
  project: {
    authors?: Array<string>;
    entry: string;
    license: string;
    name: string;
  };
  workspace: {
    members: Array<string>;
  };
  dependencies: {
    [key: string]: string;
  };
};

export enum SwayType {
  contract = 'contract',
  script = 'script',
  predicate = 'predicate',
}
