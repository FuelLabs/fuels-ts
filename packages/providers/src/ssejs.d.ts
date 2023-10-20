declare module 'sse.js' {
  interface SSEOptions extends globalThis.RequestInit, EventSourceInit {
    debug?: boolean;
  }

  interface SSE extends EventSource {}

  declare let SSE: {
    new (url: string | URL, options?: SSEOptions): SSE;
    readonly CLOSED: number;
    readonly CONNECTING: number;
    readonly OPEN: number;
  };
}
