export default `{{header}}

{{#if isGeneratingContracts}}
{{#each abis}}
export type { {{name}} } from './{{name}}';
{{/each}}
{{/if}}

{{#each abis}}
export { {{name}}__factory } from './factories/{{name}}__factory';
{{/each}}
`;
