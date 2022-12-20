export function thisVersionOrDefault(version?: string | boolean) {
  if (version !== undefined) {
    const versionStr = version.toString();
    if (versionStr !== 'true') {
      return versionStr;
    }
  }
  return '0.0.0';
}

export function getSupportedVersions() {
  return {
    FUELS: thisVersionOrDefault(process.env.BUILD_VERSION),
    FUEL_CORE: thisVersionOrDefault(process.env.FUEL_CORE_VERSION),
    FORC: thisVersionOrDefault(process.env.FORC_VERSION),
  };
}
