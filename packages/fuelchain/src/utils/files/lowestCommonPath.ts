export function lowestCommonPath(paths: string[]) {
  const pathParts = paths.map((path) => path.split(/[\\/]/));
  const commonParts = pathParts[0].filter((part, index) =>
    pathParts.every((parts) => parts[index] === part)
  );
  return commonParts.join('/');
}
