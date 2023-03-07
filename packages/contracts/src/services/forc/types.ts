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
