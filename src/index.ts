import { createServer } from 'node:http';
import {
  createRequestListener,
  createRouter,
  listen,
  sendJson,
} from '@ravshansbox/mini-app';

const router = createRouter();

const todos = [
  { id: 1, description: 'Buy milk' },
  { id: 2, description: 'Call John' },
  { id: 3, description: 'Return early' },
];

router.get('/', ({ response }) => {
  sendJson(response, todos);
});

const server = createServer(createRequestListener(router.routes));

listen(server, 3000).then((addressInfo) => {
  console.info('Listening on', addressInfo);
});
