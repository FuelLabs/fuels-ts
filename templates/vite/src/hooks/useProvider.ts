import { Provider } from 'fuels';
import { useEffect, useState } from 'react';

import { useEnvironment } from './useEnvironment';

/**
 * Hook to use the initialized provider instance that is running against the dApp.
 */
export const useProvider = () => {
  const { providerUrl } = useEnvironment();
  const [provider, setProvider] = useState<Provider>();

  useEffect(() => {
    const initProvider = async () => {
      const newProvider = await Provider.create(providerUrl);
      setProvider(newProvider);
    };

    initProvider();
  }, []);

  return {
    provider,
  };
};
