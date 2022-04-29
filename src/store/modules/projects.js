import * as types from "@/const/mutation-types";
import project from "@/views/Project";

export default {
    state: {
        projectTypes: [],
        projectsData: [],
        openProjectOptions: null
    },

    actions: {
        async fetchAllProjects({commit}) {
            let projectsTypes = [];

            function generateTypes () {
                projectsTypes = [
                    {
                        type: Date.now(),
                        title: 'Мои сайты'
                    },
                    {
                        type: Date.now() + Math.floor(Math.random() * (100 - 1 + 1)) + 1,
                        title: 'Коммерческие сайты'
                    }
                ];
            }

            // if cookie not enabled
            if (navigator.cookieEnabled === false) {
                try {
                    let data = await require("@/data/projects.json")
                    let projectsTypes = []

                    data.forEach((project) => {
                        if (!projectsTypes.find(item => item.type === project.type)) {
                            projectsTypes.push({type: project.type, title: project.typeTitle});
                        }
                    })

                    commit(types.UPDATE_PROJECTS, data);
                    commit(types.GENERATE_PROJECTS_TYPES, projectsTypes);
                } catch (err) {
                    console.error('Произошла ошибка', err)
                }
            } else {
                let results = document.cookie.match(/projects=(.+?)(;|$)/);
                if (results) {
                    let data = JSON.parse(results[1]);

                    // If cookies contain projects
                    if (data.length) {

                        // find all projects types
                        data.forEach((project) => {
                            if (!projectsTypes.find(item => item.type === project.type)) {
                                projectsTypes.push({type: project.type, title: project.typeTitle});
                            }
                        })

                        //generate other section
                        let findIndex = projectsTypes.findIndex(item => item.title === 'Коммерческие сайты');
                        if (findIndex === -1) {
                            projectsTypes.push({
                                type: Date.now(),
                                title: 'Коммерческие сайты'
                            });
                        }

                        findIndex = projectsTypes.findIndex(item => item.title === 'Мои сайты');
                        if (findIndex === -1) {
                            projectsTypes = [{
                                type: Date.now(),
                                title: 'Мои сайты'
                            }, ...projectsTypes]
                        }

                        commit(types.UPDATE_PROJECTS, data);
                        commit(types.GENERATE_PROJECTS_TYPES, projectsTypes);
                    } else {
                        generateTypes();
                        commit(types.GENERATE_PROJECTS_TYPES, projectsTypes);
                    }
                } else {
                    generateTypes();
                    commit(types.GENERATE_PROJECTS_TYPES, projectsTypes);
                }
            }

        },
        addNewProject({commit, state, getters}, payload) {
            const idProject = Date.now();
            let generateProject = {
                id: idProject,
                type: payload.type,
                typeTitle: state.projectTypes.find(type => type.type === payload.type).title,
                title: `${payload.title} ${getters.getTypeProjects(payload.type).length + 1}`,
                link: `/project/${idProject}`
            };
            let updateProjectsCookie = JSON.stringify([...state.projectsData, generateProject]);
            document.cookie = `projects=${updateProjectsCookie}`;
            commit(types.ADD_NEW_PROJECT, {generateProject});
        },
        removeProject({commit, state}, payload) {
            let updateProjects = state.projectsData.filter(project => project.id !== payload.id);
            document.cookie = `projects=${JSON.stringify(updateProjects)}`
            commit(types.REMOVE_PROJECT, {projects: updateProjects})
        },

        changeOpenProjectOptions({commit}, payload) {
            commit(types.CHANGE_OPEN_OPTIONS, payload);
        }
    },
    mutations: {

        [types.UPDATE_PROJECTS](state, projects) {
            state.projectsData = projects;
        },

        [types.GENERATE_PROJECTS_TYPES](state, payload) {
            state.projectTypes = payload
        },

        [types.ADD_NEW_PROJECT](state, {generateProject}) {
            state.projectsData.push(generateProject)

        },

        [types.REMOVE_PROJECT](state, payload) {
            state.projectsData = payload.projects

        },

        [types.CHANGE_OPEN_OPTIONS](state, payload) {
            state.openProjectOptions = payload.id;
        }
    },

    getters: {
        getAllProjects(state) {
            return state.projectsData
        },

        // Get types of projects
        getProjectsTypes(state) {
            return state.projectTypes
        },

        // getting projects of a given type
        getTypeProjects: (state) => (type) => {
            return state.projectsData.filter(i => i.type === type);
        },

        getOpenProjectOptions(state) {
            return state.openProjectOptions
        }
    }
}