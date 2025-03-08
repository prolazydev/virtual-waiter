import { seed } from '@/../seed';

import { ONLINE_MODE } from '@/utils/constants';

import { initDb } from '@/db';
import { createApp, initServer, initRouting } from '@/utils/server';
import { initMiddlewares } from '@/middlewares';
import { initSocketIO } from '@/sockets';
import { initRedis } from '@/services/redis.service';

console.log('online mode:', ONLINE_MODE)
// Check for online switching
if (ONLINE_MODE === 'on') {
	// @ts-expect-error test
	const { startNgrok } = import('@/utils/server/ngrok');
	await startNgrok();
}

const app = createApp();

await initDb();
await initRedis();

initMiddlewares(app);
initRouting();

await seed();

const server = initServer();

await initSocketIO(server);