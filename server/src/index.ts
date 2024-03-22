import { initDb } from './db';
import { initRedis } from './services/redis.service';
import { createApp, initServer, initRouting } from './utils/server';
import { seed } from '../seed';
import { initMiddlewares } from './middlewares';
import { initIO } from './services/websocket.service';

// import dotenv from 'dotenv';

// dotenv.config({ path: '.env.local' });


// console.log(process.env.ACCESS_TOKEN_DURATION);

const app = createApp();

await initDb();
await initRedis();

initMiddlewares(app);
initRouting();
await initIO();

await seed();

initServer();

