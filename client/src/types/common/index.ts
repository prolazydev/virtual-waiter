import type { RouteNamedMap } from 'vue-router/auto-routes';

export type BaseDocument = {
	_id: string;
	createdAt: Date;
	updatedAt: Date;
	deleted: boolean;
};

export type BreadcrumbNode<T extends keyof RouteNamedMap = keyof RouteNamedMap> = {
	title: string;
	link?: T;
	props?: RouteNamedMap[T]['params'];
	node?: BreadcrumbNode;
};

export type Breadcrumb = {
	title: string;
	link?: keyof RouteNamedMap;
};