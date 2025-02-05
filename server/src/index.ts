import ngrok from 'ngrok'

import { seed } from '@/../seed';

import { initDb } from '@/db';
import { createApp, initServer, initRouting } from '@/utils/server';
import { initMiddlewares } from '@/middlewares';
import { initSocketIO } from '@/sockets';
import { initRedis } from '@/services/redis.service';

import { NGROK_TOKEN, ONLINE_MODE } from './utils/constants';
import fs from 'fs/promises';
import path from 'path';

const app = createApp();

await initDb();
await initRedis();

initMiddlewares(app);
initRouting();

await seed();

const server = initServer();

await initSocketIO(server);

// Check for online switching

async function startNgrok() {
    try {
        await ngrok.authtoken(NGROK_TOKEN);
        const url = await ngrok.connect(3000);

        await setNgrokUrlInEnv(url);
        console.log('Updated .env.online file with Ngrok URL');
    } catch (error) {
        console.error('Error starting Ngrok: ', error);
    }
}
if (ONLINE_MODE === 'on') {
    await startNgrok();
}
async function setNgrokUrlInEnv(url: string) {
    const envFilePath = path.resolve(__dirname, '../../client/.env.online');
    const envFileContent = await fs.readFile(envFilePath, 'utf8');
    const updatedEnvFileContent = envFileContent.replace(/VITE_API_URL=.*/, `VITE_API_URL=${url}/api/`);

    await fs.writeFile(envFilePath, updatedEnvFileContent);
}

