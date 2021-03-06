import {createRouter, createWebHistory} from 'vue-router';

import Projects from "@/views/Projects.vue";
import Profile from "@/views/Profile";
import Project from "@/views/Project";
import ProjectSettings from "@/views/PageSettings";
import PreviewPage from "@/views/PreviewPage";

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
        },
        {
            path: '/project/settings/page/:id',
            component: ProjectSettings
        },
        {
            path: '/project/settings/preview/page/:id',
            component: PreviewPage
        }
    ]
})