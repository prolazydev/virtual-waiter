import { createFetch, type UseFetchOptions, type UseFetchReturn } from '@vueuse/core';
import { SERVER_PORT } from './constants/env';

const _myFetch = createFetch({
	baseUrl: `http://localhost:${SERVER_PORT}/api/`,
	fetchOptions: {
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*'
		},
		credentials: 'include',
		mode: 'cors',
		method: 'GET',
	},
	
	options: {
		onFetchError: async (error) => {
			if (!error.response) {
				console.error('Fetch Error:', error);
				throw error;
			}
			if (error.response.status === 401 || error.response.status === 403) {
				// TODO: Handle error
				console.error(`Unauthorized Response: ${error.response.status}`);
                
				if ( useAuth().isAuth() )
					useUserStore().logoutUser();
			}
			else 
				console.error('Fetch Error:', error);
			throw error;
		},
		afterFetch: async (response) => {
			if (response.response.ok) 
				return await handleResponse(response.response)
			else if (response.response.status === 401 || response.response.status === 403) {
				console.error(`Unauthorized Response: ${response.response.text()}`);
                
				if ( useAuth().isAuth() )
					useUserStore().logoutUser();
			}
			else 
				return await response.response.json();
		},	
	}
});

/**
 * Fetch wrapper
 * @param url - Base is set to http://localhost:4069/api/
 * @param myOptions - Fetch options, Default method is set to GET
 */
export default async <TResponse = any>(
    url: string, 
    data: object | string = '', 
    initOptions: RequestInit = {}, 
    options: UseFetchOptions = {},
): Promise<UseFetchReturn<TResponse>> => {
	try {
		if (typeof data === 'object')
			initOptions.body = JSON.stringify(data);
		else if (typeof data === 'string' && data.length > 0)
			initOptions.body = data;
		return _myFetch<TResponse>(url, initOptions, options);
	} catch (error) {
		console.error('myFetch Error:', error);
		throw error;
	}
}
// /**
//  * Fetch wrapper
//  * @param url - Base is set to http://localhost:4069/api/
//  * @param myOptions 
//  * @returns {Promise<Return<TResponse>>}
//  */
// export async function myFetch<TResponse = any>(url: string, data: object | string = '', initOptions: RequestInit = {}, myOptions: UseFetchOptions = {}): Promise<UseFetchReturn<TResponse>>{
// 	try {
// 		if (typeof data === 'object')
// 			initOptions.body = JSON.stringify(data);
// 		else if (typeof data === 'string' && data.length > 0)
// 			initOptions.body = data;

// 		// myOptions.afterFetch = async (response) => {
// 		// 	await response.response.json()
// 		// 	return response;
// 		// }

// 		const response = _myFetch<TResponse>(url, initOptions, myOptions);
// 		return response;
// 	} catch (error) {
// 		console.error('myFetch Error:', error);
// 		throw error;
// 	}
// }

// PRIVATE
async function handleResponse(response: Response) {
	const contentType = response.headers.get('content-type');
	if (contentType?.includes('application/json')) 
		return response.json();
	else if (contentType?.includes('application/pdf')) 
		return response.blob();
	else if (contentType?.includes('text/html') || contentType?.includes('text/plain')) 
		return response.text();
	else 
		return response.json();
}
