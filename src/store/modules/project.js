import * as types from "@/const/mutation-types";

export default {
    state: {
        openProjectOptions: null,
    },
    actions: {
        addNewProject({ commit, getters }, payload) {
            const idProject = Date.now();
            const projectTypes = getters.getProjectsTypes;

            const currentType = projectTypes.find(type => type.type === payload.type);
            let currentTypeTitle = '';

            if (currentType) {
                currentTypeTitle = currentType.title;
            }

            let generateProject = {
                id: idProject,
                type: payload.type,
                typeTitle: currentTypeTitle,
                title: `${payload.title}`,
                link: `/project/${idProject}`
            };

            commit(types.ADD_NEW_PROJECT, { generateProject });
        },

        changeNameProject({commit, getters}, payload) {
            const projects = getters.getAllProjects;
            let indexProject = projects.findIndex(i => i.id === payload.id);

            if (indexProject !== -1) {
                commit(types.CHANGE_NAME_PROJECT, {newName: payload.newName, indexProject});
            }
        },

        removeProject({ commit, getters}, payload) {
            let projects = getters.getAllProjects;
            let newArrProjects = projects.filter(project => project.id !== payload.id);

            commit(types.UPDATE_PROJECTS, newArrProjects)
        },

        changeOpenProjectOptions({commit}, payload) {
            commit(types.CHANGE_OPEN_OPTIONS, payload);
        },
    },
    mutations: {

        [types.CHANGE_OPEN_OPTIONS](state, payload) {
            state.openProjectOptions = payload.id;
        },
    },
    getters: {
        getProjectById: (state, getters) => (id) => {
            let projects = getters.getAllProjects;
            return projects.find(project => project.id === id)
        },
        getOpenProjectOptions(state) {
            return state.openProjectOptions
        },
    }
}