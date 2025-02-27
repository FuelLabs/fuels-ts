type ExcludeResourcesString = {
  utxos: string[];
  messages: string[];
};

export const adjustResourcesToExclude = (params: {
  userInput: ExcludeResourcesString;
  cached: ExcludeResourcesString;
  maxInputs: number;
}) => {
  const { userInput, cached, maxInputs } = params;

  const final = { ...userInput };

  let total = final.utxos.length + final.messages.length;
  if (total >= maxInputs) {
    return final;
  }

  final.utxos = [...final.utxos, ...cached.utxos.slice(0, maxInputs - total)];

  total = final.utxos.length + final.messages.length;

  if (total < maxInputs) {
    final.messages = [...final.messages, ...cached.messages.slice(0, maxInputs - total)];
  }

  return final;
};
