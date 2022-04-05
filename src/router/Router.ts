import ServiceFactory from '@/factory/ServiceFactory';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

export default class Router {

	constructor (readonly serviceFactory: ServiceFactory) {
	}

	build() {
		const routes: Array<RouteRecordRaw> = [
			{
				path: '/',
				name: 'HomeView',
				component: () => import('../views/HomeView.vue'),
				props: {
					serviceFactory: this.serviceFactory
				}
			},
		];
		const router = createRouter({
			history: createWebHistory(process.env.BASE_URL),
			routes
		});
		return router;
	}
}