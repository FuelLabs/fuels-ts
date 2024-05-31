import { createServer } from 'restify';

import runEncodingDecodingTest from './encodingDecodingTest';

const server = createServer();

server.get('/', (req, res, next) => {
  runEncodingDecodingTest();
  res.send({});
  next();
});

server.listen(3000);

process.on('SIGINT', () => {
  console.error('Caught SIGINT, shutting down.');
  server.close();
});
