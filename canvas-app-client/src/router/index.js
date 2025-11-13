import {createRouter, createWebHistory} from 'vue-router'; 
import HomeView from '../views/HomeView.vue';
import DrawingView from '../views/DrawingView.vue';

const router = createRouter({

    history: createWebHistory(),

    routes: [
        { path : '/',  component: HomeView },
        { path : '/game', component: DrawingView }
    ]
});

export default router;

