import { createApp } from 'vue'
import App from './App.vue'
import ServiceFactory from './factory/ServiceFactory';
import AxiosAdapter from './infra/AxiosAdapter';
import Router from './router/Router'


const app = createApp(App);
const httpClient = new AxiosAdapter();
const baseUrl = "http://localhost:3002";
const serviceFactory = new ServiceFactory(httpClient, baseUrl);
const router = new Router(serviceFactory);
app.use(router.build());
app.mount('#app')
