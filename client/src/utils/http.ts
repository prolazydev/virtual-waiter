import { createFetch, type UseFetchOptions, type UseFetchReturn } from '@vueuse/core';

const _myFetch = createFetch({
	baseUrl: 'http://localhost:4069/api/',
	fetchOptions: {
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*'
		},
		credentials: 'include',
		mode: 'cors'
	},
	
	options: {
		afterFetch: async (response) => {
			if (response.response.ok) 
				return await handleResponse(response.response)
			else 
				return await response.response.json();
		},	
	}
});

/**
 * Fetch wrapper
 * @param url - Base is set to http://localhost:4069/api/
 * @param myOptions 
 * @returns {Promise<Return<TResponse>>}
 */
export async function myFetch<TResponse = any>(url: string, data: object | string = '', initOptions: RequestInit = {}, myOptions: UseFetchOptions = {}): Promise<UseFetchReturn<TResponse>>{
	try {
		if (typeof data === 'object')
			initOptions.body = JSON.stringify(data);
		else if (typeof data === 'string' && data.length > 0)
			initOptions.body = data;

		// myOptions.afterFetch = async (response) => {
		// 	await response.response.json()
		// 	return response;
		// }

		const response = _myFetch<TResponse>(url, initOptions, myOptions);
		return response;
	} catch (error) {
		console.error('myFetch Error:', error);
		throw error;
	}
}

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
