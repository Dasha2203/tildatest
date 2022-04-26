import Vue from 'vue';
import Vuex from "vuex";

// Vue.use(Vuex);

export default  new Vuex.Store({
    state: {
        count: 6990,
        projectsData: [
            {
                id: 1,
                title: "Мои сайты",
                projects: [
                    {
                        id: 1,
                        title: 'My project',
                        link: '/project/1'
                    },
                    {
                        id: 2,
                        title: 'My project',
                        link: '/project/2'
                    },
                    {
                        id: 3,
                        title: 'My project',
                        link: '/project/3'
                    }
                ]
            },
            {
                id: 2,
                title: "Чужие сайты",
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
            }
        ],

    },
    getters: {
        getProjects(state) {
            return state.projectsData
        }
    },
    mutations: {
        increment (state) {
            state.count++
        },
        addProjects(state, id) {
            console.log('asd', id)
            let index = state.projectsData.findIndex(item => item.id === id);
            if (index !== -1) {
                console.log('count', state.projectsData[id].projects.length)
                let generateProject = {
                    id: state.projectsData[id].projects.length + 1,
                    title: 'My project',
                    link: `/project/${state.projectsData[id].projects.length + 1}`
                }
                state.projectsData[index].projects.push(generateProject)
            }

        }
    }
})