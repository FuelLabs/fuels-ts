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
