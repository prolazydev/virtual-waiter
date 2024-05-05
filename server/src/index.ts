import { initDb } from './db';
import { initRedis } from './services/redis.service';
import { createApp, initServer, initRouting } from './utils/server';
import { seed } from '../seed';
import { initMiddlewares } from './middlewares';
import { initSocketIO } from './sockets';

const app = createApp();

await initDb();
await initRedis();

initMiddlewares(app);
initRouting();

await seed();

const server = initServer();

await initSocketIO(server);

