import type { IConfigurable } from '../../types/interfaces/IConfigurable';

export function formatConfigurables(params: { configurables: IConfigurable[] }) {
  const { configurables } = params;

  const formattedConfigurables = configurables.map((c) => {
    const {
      name,
      type: {
        attributes: { inputLabel },
      },
    } = c;

    return {
      configurableName: name,
      configurableType: inputLabel,
    };
  });

  return { formattedConfigurables };
}
