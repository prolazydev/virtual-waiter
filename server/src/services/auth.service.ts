import { Message } from '@/utils/common/ServerResponseMessages';
import { verifyToken, decodeToken } from '@/utils/crypto';

import { rGet, rDel } from '@/services/redis.service';

export const isAuth = async (accessToken: string) => {
	const payload = verifyToken(accessToken);
	if ( !payload ) {
		const oldToken = decodeToken(accessToken);

		const refreshToken = await rGet(oldToken!.id!);
		const refreshTokenPayload = verifyToken(refreshToken!);
		if ( !refreshTokenPayload ) {
			const deleted = await rDel(oldToken!.id!);
			if ( !deleted )
				throw new Error(Message.DatabaseError);

			return false;
		}
	}

	return true;
};