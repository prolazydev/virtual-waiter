import type { BaseDocument } from './common';

export type UserReview = {
	userId: string;
	businessId: string;
	rating: number;
	review: string;
} & BaseDocument;