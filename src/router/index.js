import { createRouter, createWebHistory } from 'vue-router';
import UserAdmin from '@/views/UserAdmin.vue';

const routes = [
  {
    path: '/user-admin',
    name: 'UserAdmin',
    component: UserAdmin
  },
  {
    path: '/products-admin',
    name: 'ProductsAdmin',
    component: () => import('@/views/ProductAdmin.vue')
  },
  {
    path: '/',
    name: 'home',
    component: () => import ('@/views/HomeView.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutMeView.vue'),
  },
  {
    path: '/reach-us',
    name: 'ReachUs',
    component: ()  => import('@/views/ReachMeView.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () =>  import('@/views/AdminView.vue')
  },
  {
    path: '/products',
    name: 'Products',
    component: ()  => import('@/views/ProductsView.vue')
  },
  {
    path: '/products/:id',
    name: 'ProductDetails',
    component: () => import ('@/views/ProductDetails.vue')
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
export default router;