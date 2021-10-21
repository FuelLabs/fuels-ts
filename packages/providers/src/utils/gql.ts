// A no-op template literal just for code highlighting
export default function gql(strings: TemplateStringsArray, ...keys: unknown[]): string {
  const lastIndex = strings.length - 1;
  return strings.slice(0, lastIndex).reduce((p, s, i) => p + s + keys[i], '') + strings[lastIndex];
}
