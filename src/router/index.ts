import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import Portal from '../views/Portal.vue';
import Subscription from '../views/Subscription.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'Home', component: Home },
  { path: '/portal', name: 'Portal', component: Portal },
  { path: '/subscription', name: 'Subscription', component: Subscription }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
