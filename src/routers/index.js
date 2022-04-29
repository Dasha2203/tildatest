import Vue from 'vue';
import {createRouter, createWebHistory} from 'vue-router';
import Projects from "@/views/Projects.vue";
import Profile from "@/views/Profile";
import Project from "@/views/Project";

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/projects'
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
            path: '/profile',
            component: Profile
        }
    ]
})