import * as types from "@/const/mutation-types";
import project from "@/store/modules/project";
import page from "@/store/modules/page"

export default {
    state: {
        projectTypes: [],
        projectsData: [],
    },

    actions: {
        async fetchAllProjects({commit}) {
            let projectsTypes = [];
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

                    setData(data, projectsTypes)
                } catch (err) {
                    console.error('Произошла ошибка', err)
                }
            }
            if (navigator.cookieEnabled) {
                let results = document.cookie.match(/projects=(.+?)(;|$)/);

                if (results) {
                    let data = JSON.parse(results[1]);

                    // find all projects types
                    data.forEach((project) => {
                        if (!projectsTypes.find(item => item.type === project.type)) {
                            projectsTypes.push({type: project.type, title: project.typeTitle});
                        }
                    })

                    //generate other section
                    generateOtherType('Коммерческие сайты')
                    generateOtherType('Мои сайты')

                    setData(data, projectsTypes)

                    // If cookies contain projects
                    if (!data.length) {
                        generateTypes();
                        commit(types.GENERATE_PROJECTS_TYPES, projectsTypes);
                    }
                }

                if (!results) {
                    generateTypes();
                    commit(types.GENERATE_PROJECTS_TYPES, projectsTypes);
                }
            }

            //Supporting functions

            function setData(dataProjects, dataTypes) {
                commit(types.UPDATE_PROJECTS, dataProjects);
                commit(types.GENERATE_PROJECTS_TYPES, dataTypes);
            }

            function generateTypes() {
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

            function generateOtherType(title) {
                let findIndex = projectsTypes.findIndex(item => item.title === title);
                if (findIndex === -1) {
                    projectsTypes.push({
                        type: Date.now(),
                        title
                    });
                }
            }
        },
    },

    mutations: {
        [types.UPDATE_PROJECTS](state, projects) {
            state.projectsData = projects;
        },

        [types.GENERATE_PROJECTS_TYPES](state, payload) {
            state.projectTypes = payload
        },
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

    },

    modules: {
        project,
        page
    }
}