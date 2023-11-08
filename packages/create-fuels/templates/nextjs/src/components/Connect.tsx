import { useState } from 'react';
import {
  useConnect,
  useConnectors,
  useDisconnect,
  useIsConnected,
} from '@fuel-wallet/react';

export const Connect = () => {
  const [connector, setConnector] = useState('');
  const { connectors } = useConnectors();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { isConnected } = useIsConnected();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        padding: 10,
        maxWidth: 300,
      }}
    >
      <select
        onChange={(e) => {
          console.log(e.target.value);
          setConnector(e.target.value);
        }}
      >
        <option value=''>Select a wallet connector</option>
        {connectors.map((c) => (
          <option key={c.name} value={c.name}>
            {c.name}
          </option>
        ))}
      </select>
      {!isConnected && connector && (
        <button
          className='
        px-4 py-2 bg-slate-500 text-white rounded-md
        hover:bg-slate-600 transition-colors duration-200
        mt-4 disabled:opacity-50 disabled:cursor-not-allowed
      '
          disabled={!connector}
          onClick={() => connect(connector)}
        >
          Connect to {connector}
        </button>
      )}

      {isConnected && connector && (
        <button
          className='
        px-4 py-2 bg-slate-500 text-white rounded-md
        hover:bg-slate-600 transition-colors duration-200
        mt-4 disabled:opacity-50 disabled:cursor-not-allowed
      '
          disabled={!connector}
          onClick={() => disconnect()}
        >
          Disconnect from {connector}
        </button>
      )}
    </div>
  );
};
