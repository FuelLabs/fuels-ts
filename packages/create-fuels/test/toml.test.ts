import toml from '@iarna/toml';

const processWorkspaceToml = (
  fileContents: string,
  programsToInclude: { contract: boolean; predicate: boolean; script: boolean }
) => {
  const parsed = toml.parse(fileContents) as {
    workspace: {
      members: string[];
    };
  };

  parsed.workspace.members = parsed.workspace.members.filter((member) => {
    if (member === 'predicate' && !programsToInclude.predicate) {
      return false;
    }
    if (member === 'contract' && !programsToInclude.contract) {
      return false;
    }
    if (member === 'script' && !programsToInclude.script) {
      return false;
    }
    return true;
  });

  return toml.stringify(parsed);
};

test('toml parsing', () => {
  const fileContents = `[workspace]
  members=[
    "contract",
    "predicate",
    "script"
  ]`;

  const parsed = processWorkspaceToml(fileContents, {
    contract: false,
    predicate: true,
    script: true,
  });

  console.log(parsed);
});
