// #region fuel-connector-metadata
export type ConnectorMetadata = {
  image?:
    | string
    | {
        light: string;
        dark: string;
      };
  install: {
    action: string;
    link: string;
    description: string;
  };
};
// #endregion fuel-connector-metadata
