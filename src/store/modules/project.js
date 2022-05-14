import * as types from "@/const/mutation-types";

export default {
    namespaced: true,
    state: {
        openProjectOptions: null,
    },
    actions: {
        addNewProject({commit, rootGetters}, payload) {
            const idProject = Date.now();
            const projectTypes = rootGetters['getProjectsTypes']

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

            commit(`${types.ADD_NEW_PROJECT}`, {generateProject}, { root: true });
        },

        changeNameProject({commit, rootGetters}, payload) {
            const projects = rootGetters['getAllProjects']
            let indexProject = projects.findIndex(i => i.id === payload.id);

            if (indexProject !== -1) {
                commit(types.CHANGE_NAME_PROJECT, {newName: payload.newName, indexProject}, { root: true });
            }
        },

        removeProject({commit, rootGetters}, payload) {
            const projects = rootGetters['getAllProjects']
            let newArrProjects = projects.filter(project => project.id !== payload.id);

            commit(types.UPDATE_PROJECTS, newArrProjects, { root: true })
        },

        changeOpenProjectOptions({commit}, payload) {
            commit(types.CHANGE_OPEN_OPTIONS, payload);
        },
    },
    mutations: {

        [types.CHANGE_OPEN_OPTIONS](state, payload) {
            if (payload) {
                state.openProjectOptions = payload.id;
            } else {
                state.openProjectOptions = null
            }
        },
    },
    getters: {
        getProjectById: (state, getters, rootState, rootGetters) => (id) => {
            const projects = rootGetters['getAllProjects']
            return projects.find(project => project.id === id)
        },
        getOpenProjectOptions(state) {
            return state.openProjectOptions
        },
    }
}