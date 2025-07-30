import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue'; 

const routes = [
    {
    path: '/', // Define a rota raiz
    name: 'home', // Nome da rota
    component: HomeView, // Componente a ser renderizado para esta rota
    },
];

const router = createRouter({
    history: createWebHistory(), // Usa o modo de histórico para URLs limpas
    routes, // As rotas definidas acima
});

export default router; // Exporta o roteador
    