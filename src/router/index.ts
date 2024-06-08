import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import Portal from '../views/Portal.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'Home', component: Home },
  { path: '/portal', name: 'Portal', component: Portal },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
