import Vue from 'vue';
import {createRouter, createWebHistory} from 'vue-router';
import Home from "@/views/Home.vue";
import Projects from "@/views/Projects.vue";
import Todos from "@/views/Todos";
import Profile from "@/views/Profile";
import Project from "@/views/Project";

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/projects',
            component: Projects
        },
        {
            path:'/project/:id',
            component: Project
        },
        {
            path: '/todo',
            component: Todos
        },
        {
            path: '/profile',
            component: Profile
        }
    ]
})