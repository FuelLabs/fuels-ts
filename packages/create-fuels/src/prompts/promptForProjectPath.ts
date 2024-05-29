import prompts from 'prompts';

export const promptForProjectPath = async () => {
  const res = await prompts(
    {
      type: 'text',
      name: 'projectName',
      message: 'What is the name of your project?',
      initial: 'my-fuel-project',
    },
    { onCancel: () => process.exit(0) }
  );

  return res.projectName as string;
};
