import { $ } from "bun";

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
        const test = await $`ngrok http --url=free-anemone-vocal.ngrok-free.app 3000`;

        

        // TODO: List endpoints
        // Pass the authtoken programmatically if needed
        // await ngrok.authtoken(NGROK_TOKEN);

        // TODO: check if a connection already exists
        // const existingUrl = ngrok.getUrl();
        // const test = ngrok.getApi();
        // if (existingUrl) {
        //     console.log('Ngrok is already running at: ' + existingUrl);
        //     return;
        // }

        // Start Ngrok on port 3000
        // const url = await ngrok.connect(3000);
        // const url = await ngrok.connect({
        //     proto: 'http', // http|tcp|tls, defaults to http
        //     addr: 3000, // port or network address, defaults to 80
        //     // basic_auth: 'user:pwd', // http basic authentication for tunnel
        //     subdomain: 'free-anemone-vocal.ngrok-free.app', // reserved tunnel name https://alex.ngrok.io
            
            
        //     authtoken: NGROK_TOKEN, // your authtoken from ngrok.com
        //     // region: 'eu', // one of ngrok regions (us, eu, au, ap, sa, jp, in), defaults to us
        //     // configPath: '~/git/project/ngrok.yml', // custom path for ngrok config file
        //     // binPath: path => path.replace('app.asar', 'app.asar.unpacked'), // custom binary path, eg for prod in electron
        //     onStatusChange: status => {}, // 'closed' - connection is lost, 'connected' - reconnected
        //     onLogEvent: data => {
        //         console.log('Ngrok log event: ', data);
        //     }, // returns stdout messages from ngrok process
        // });
        
        console.log('Ngrok URL: ' + url);

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

