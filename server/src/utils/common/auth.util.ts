import type { Request } from 'express';
import { decodeToken, verifyToken } from '../crypto';
import type { UserResult } from '@/types';
import { rDel, rGet } from '@/services/redis.service';

export const getValidAccessToken = (req: Request) => {
	let accessToken: string = req.cookies.accessToken ?? req.signedCookies.accessToken;

	// Check if there is a token in the header, workaround
	let altToken = req.headers.authorization;
	if (altToken && altToken.startsWith('Bearer') && !accessToken) {
		altToken = altToken.split(' ')[ 1 ];

		accessToken = altToken;
	}

	return accessToken;
};

export const getValidRefreshToken = async (id: string) => {
	try {
		const refreshToken = await rGet(id);
		if ( !refreshToken )
			return null

		const { payload: refreshTokenPayload, err } = verifyToken<UserResult>(refreshToken!);
		if ( refreshToken && err ) {
			const deleted = await rDel(id);
			if ( !deleted )
				return null
			
			return null
		}

		return refreshTokenPayload;
	} catch (error) {
		console.error('Error occurred while getting Refresh Token:', error);
		return null;
	}
};