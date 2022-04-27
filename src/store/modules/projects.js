import {ADD_NEW_PROJECT} from "@/const/mutation-types";

export default {
    actions: {
        async fetchAllProjects(context) {
            try {
                let data = await require("@/data/projects.json")
                let projectsTypes = []

                data.forEach((project) => {
                    if (!projectsTypes.find(item => item.type === project.type)) {
                        projectsTypes.push({type: project.type, title: project.typeTitle});
                    }
                })

                context.commit('updateProjects', data);
                context.commit('generateTypesProjects', projectsTypes);
            } catch (err) {
                console.error('Произошла ошибка', err)
            }
        }
    },
    mutations: {
        updateProjects(state, projects) {
            state.projectsData = projects;
        },

        generateTypesProjects(state, payload) {
            state.projectTypes = payload
        },

        [ADD_NEW_PROJECT](state, id) {
            let index = state.projectsData.findIndex(item => item.id === id);

            if (index !== -1) {
                let generateProject = {
                    id: state.projectsData[id].projects.length + 1,
                    title: 'My project',
                    link: `/project/${state.projectsData[id].projects.length + 1}`
                }
                state.projectsData[index].projects.push(generateProject)
            }
        }
    },
    state: {
        projectTypes: [{type: 4, title: ''}],
        projectsData: []
    },
    getters: {
        getAllProjects(state) {
            return state.projectsData
        },
        getTypeProjects(state) {
            return state.projectTypes
        }
    }
}