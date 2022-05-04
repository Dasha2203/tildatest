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

        addNewProject({commit, state, getters}, payload) {
            console.log('action add ', payload)
            const idProject = Date.now();
            let generateProject = {
                id: idProject,
                type: payload.type,
                typeTitle: state.projectTypes.find(type => type.type === payload.type).title,
                title: `${payload.title}`,
                link: `/project/${idProject}`
            };
            let updateProjectsCookie = JSON.stringify([...state.projectsData, generateProject]);
            document.cookie = `projects=${updateProjectsCookie}; path=/;`;
            commit(types.ADD_NEW_PROJECT, {generateProject});
        },

        addNewPageToProject({ commit }, payload) {
            commit(types.ADD_PAGE, payload)
        },

        removePage({ commit }, payload) {
            commit(types.REMOVE_PAGE, payload)
        },

        removeProject({commit, state}, payload) {
            let updateProjects = state.projectsData.filter(project => project.id !== payload.id);
            document.cookie = `projects=${JSON.stringify(updateProjects)}; path=/;`
            commit(types.REMOVE_PROJECT, {projects: updateProjects})
        },

        changeOpenProjectOptions({commit}, payload) {
            commit(types.CHANGE_OPEN_OPTIONS, payload);
        },

        changeNameProject({commit}, payload) {
            commit(types.CHANGE_NAME_PROJECT, payload);
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

        [types.ADD_PAGE](state, payload) {
            let indexProject = state.projectsData.findIndex(i => i.id === payload.id)
            if (indexProject !== -1) {
                if ( 'pages' in state.projectsData[indexProject]) {
                    state.projectsData[indexProject].pages.push({id: Date.now(), title: payload.newName})
                } else {
                    state.projectsData[indexProject].pages = [{id: Date.now(), title: payload.newName}]
                }
                document.cookie = `projects=${JSON.stringify(state.projectsData)}; path=/;`
            }
        },

        [types.REMOVE_PAGE](state, payload) {
            let indexProject = state.projectsData.findIndex(i => i.id === payload.idProject);
            if (indexProject !== -1) {
                // let indexPage = state.projectsData[indexProject].pages.findIndex(page => page.id === payload.idPage);
                state.projectsData[indexProject].pages = state.projectsData[indexProject].pages.filter(page => page.id !== payload.idPage);
                document.cookie = `projects=${JSON.stringify(state.projectsData)}; path=/;`
            }

        },

        [types.REMOVE_PROJECT](state, payload) {
            state.projectsData = payload.projects

        },

        [types.CHANGE_OPEN_OPTIONS](state, payload) {
            state.openProjectOptions = payload.id;
        },

        [types.CHANGE_NAME_PROJECT](state, payload) {
            let indexProject = state.projectsData.findIndex(i => i.id === payload.id);

            if (indexProject !== -1) {
                state.projectsData[indexProject].title = payload.newName;
                document.cookie = `projects=${JSON.stringify(state.projectsData)}; path=/;`
            }
        }
    },

    getters: {
        getAllProjects(state) {
            return state.projectsData
        },

        getProjectById: (state) => (id) => {
            return state.projectsData.find(project => project.id === id)

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
        },

        getPagesByIdProject: (state) => (id)  => {
            let project = state.projectsData.find(i => i.id === id)
            return 'pages' in project ? state.projectsData.find(i => i.id === id).pages : []
        }
    }
}