// /* eslint-disable semi */
// import type { EventEmitter } from 'events';

// Augment the WebSocket interface from the 'ws' module
// declare module 'ws' {
    // Extend the existing WebSocket interface
    // export default interface WebSocket extends EventEmitter {
    //     // Add a new property 'isAlive'
    //     isAlive: boolean;
    // }
// }

interface WebSocket {
	_pingTimeout: NodeJS.Timeout;
}