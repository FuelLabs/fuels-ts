import { createServer } from 'restify';

import { runMnemonicToSeedTest } from './crypto';

const server = createServer();

server.get('/', (req: any, res: any, next: any) => {
  runMnemonicToSeedTest();
  res.send({});
  next();
});

server.listen(3000);

process.on('SIGINT', () => {
  console.error('Caught SIGINT, shutting down.');
  server.close();
});
