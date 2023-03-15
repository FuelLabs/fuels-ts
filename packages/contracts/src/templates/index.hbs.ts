export default `{{#each paths}}
export * from './{{this}}';
{{/each}}`;