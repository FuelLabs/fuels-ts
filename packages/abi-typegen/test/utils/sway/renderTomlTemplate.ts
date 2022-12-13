/*
  Renders a Toml file template to be used in Sway projects
*/
export function renderTomlTemplate(params: { contractFilename: string; contractName: string }) {
  const template = `
[project]
authors = ["fuellabs"]
entry = "${params.contractFilename}"
license = "Apache-2.0"
name = "${params.contractName}"

[dependencies]`;

  return template;
}
