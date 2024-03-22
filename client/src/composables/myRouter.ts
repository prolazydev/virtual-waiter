import type { Router } from 'vue-router';
import { useTost } from './toast';

/**
 * Navigate to a new route and display a tost message
 * @param router - Vue Router
 * @param path - Path to navigate to
 * @param tostMessage - Message to display in tost
 * @param timeout - Time to display tost. Default: 3000ms
 * @returns Promise<void>
 */
export const tostRouterTo = (router: Router, path: string, tostMessage: string, timeout: number = 3000) => 
	router.push(path).then(() => 
		useTost(tostMessage, timeout)) 


