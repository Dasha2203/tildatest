import Vue from 'vue';
import Vuex from "vuex";

// Vue.use(Vuex);

export default  new Vuex.Store({
    state: {
        count: 6990,
        projects: [
            {
                id: 1,
                title: 'Project from Vuex 1',
                link: '/project/1'
            },
            {
                id: 2,
                title: 'Project from Vuex 2',
                link: '/project/2'
            },
            {
                id: 3,
                title: 'Project from Vuex 3',
                link: '/project/3'
            }
        ]
    },
    getters: {
        getProjects(state) {
            console.log('state', state.projects)
            return state.projects
        }
    },
    mutations: {
        increment (state) {
            state.count++
        }
    }
})