/* eslint-disable semi */
import type { EventEmitter } from 'events';
import type { RawData } from 'ws';

// Augment the WebSocket interface from the 'ws' module
declare module 'ws' {
    // Extend the existing WebSocket interface
    export default interface WebSocket extends EventEmitter {
        // Add a new property 'isAlive'
        isAlive: boolean;
    }

    interface IWebSocketClients {
        threads: {
            [x: string]: WebSocket[];
        }
    }

    type MyRawData = RawData & number[];
}