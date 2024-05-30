import prompts from 'prompts';

export const promptForProgramsToInclude = async ({
  forceDisablePrompts = false,
}: {
  forceDisablePrompts?: boolean;
}) => {
  if (forceDisablePrompts) {
    return {
      contract: false,
      predicate: false,
      script: false,
    };
  }
  const programsToIncludeInput = await prompts(
    {
      type: 'multiselect',
      name: 'programsToInclude',
      message: 'Which Sway programs do you want?',
      choices: [
        { title: 'Contract', value: 'contract', selected: true },
        { title: 'Predicate', value: 'predicate', selected: true },
        { title: 'Script', value: 'script', selected: true },
      ],
      instructions: false,
    },
    { onCancel: () => process.exit(0) }
  );

  return {
    contract: programsToIncludeInput.programsToInclude.includes('contract'),
    predicate: programsToIncludeInput.programsToInclude.includes('predicate'),
    script: programsToIncludeInput.programsToInclude.includes('script'),
  };
};
