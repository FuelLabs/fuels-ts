export const getEnv = () => ({
  ZeroBytes32: '0x0000000000000000000000000000000000000000000000000000000000000000',
  get NativeAssetId() {
    return this.ZeroBytes32;
  },

  EmptyRoot: '0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
});
