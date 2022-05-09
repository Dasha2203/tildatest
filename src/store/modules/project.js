import * as types from "@/const/mutation-types";

export default {
    state: {
        openProjectOptions: null,
    },
    actions: {
        addNewProject({ commit, rootState}, payload) {
            const idProject = Date.now();
            let generateProject = {
                id: idProject,
                type: payload.type,
                typeTitle: rootState.projects.projectTypes.find(type => type.type === payload.type).title,
                title: `${payload.title}`,
                link: `/project/${idProject}`
            };
            let updateProjectsCookie = JSON.stringify([...rootState.projects.projectsData, generateProject]);
            document.cookie = `projects=${updateProjectsCookie}; path=/;`;
            commit(types.ADD_NEW_PROJECT, {rootState, generateProject});
        },

        changeNameProject({commit, rootState}, payload) {
            commit(types.CHANGE_NAME_PROJECT, {rootState, ...payload});
        },

        removeProject({commit, rootState}, payload) {
            let updateProjects = rootState.projects.projectsData.filter(project => project.id !== payload.id);
            document.cookie = `projects=${JSON.stringify(updateProjects)}; path=/;`
            commit(types.REMOVE_PROJECT, {rootState, projects: updateProjects})
        },

        changeOpenProjectOptions({commit}, payload) {
            commit(types.CHANGE_OPEN_OPTIONS, payload);
        },
    },
    mutations: {
        [types.ADD_NEW_PROJECT](state, {rootState, generateProject}) {
            rootState.projects.projectsData.push(generateProject)
        },

        [types.REMOVE_PROJECT](state, {rootState, projects}) {
            rootState.projects.projectsData = projects
        },

        [types.CHANGE_NAME_PROJECT](state, {rootState, id, newName}) {
            let indexProject = rootState.projects.projectsData.findIndex(i => i.id === id);

            if (indexProject !== -1) {
                rootState.projects.projectsData[indexProject].title = newName;
                document.cookie = `projects=${JSON.stringify(rootState.projects.projectsData)}; path=/;`
            }
        },

        [types.CHANGE_OPEN_OPTIONS](state, payload) {
            state.openProjectOptions = payload.id;
        },
    },
    getters: {
        getProjectById: (state, getters, rootState) => (id) => {
            return rootState.projects.projectsData.find(project => project.id === id)
        },
        getOpenProjectOptions(state) {
            return state.openProjectOptions
        },
    }
}