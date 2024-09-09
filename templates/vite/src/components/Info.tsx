import { useEnvironment } from "../hooks/useEnvironment";

export default function Info() {
  const { providerUrl } = useEnvironment();

  return (
    <div id="text" className="col-span-3 px-4 py-8">
      <h1 className="pb-1 pt-6 text-3xl font-medium">Welcome to Fuel</h1>
      <p>
        This Vite + React template was bootstrapped with the{" "}
        <a
          href="https://docs.fuel.network/docs/fuels-ts/fuels-cli/#getting-started"
          target="_blank"
          className="text-green-500/80 transition-colors hover:text-green-500"
          rel="noreferrer"
        >
          Fuels CLI
        </a>
      </p>
      <p className="pt-8">
        You are currently connected to:{" "}
        <span className="font-mono">{providerUrl}</span>
      </p>
      <a
        href="https://docs.fuel.network/docs"
        target="_blank"
        className="inline-block pt-8 text-green-500/80 transition-colors hover:text-green-500"
        rel="noreferrer"
      >
        Check out the Fuel Docs
      </a>
    </div>
  );
}
