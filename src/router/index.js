import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import RestaurantPage from '../pages/RestaurantPage.vue';
const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/restaurants/:slug', name: 'RestaurantPage', component: RestaurantPage },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;