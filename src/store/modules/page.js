import * as types from "@/const/mutation-types";
import getIdxProjectPage from "@/helpers/getIdxProjectPage";

export default {
    state: {
        pageImages: []
    },
    actions: {
        addNewPageToProject({commit, getters}, payload) {
            const { id, newName } = payload;
            const projects = getters.getAllProjects;

            let indexProject = projects.findIndex(i => i.id === id);

            if (indexProject !== -1) {
                let page = {
                    id: Date.now(),
                    title: newName
                }

                commit(types.ADD_PAGE, {indexProject, page})
            }
        },

        removePage({commit, getters}, payload) {
            const projects = getters.getAllProjects;
            const { idProject } = payload;

            let indexProject = projects.findIndex(i => i.id === idProject);

            if (indexProject !== -1) {
                commit(types.REMOVE_PAGE, {indexProject, ...payload})
            }
        },

        setSettingsPage({commit, getters}, payload) {
            const projects = getters.getAllProjects;
            const {indexProject, indexPage} = getIdxProjectPage(projects, payload.id);

            commit(types.SET_SETTINGS_PAGE, {indexProject, indexPage, ...payload})
        },

        setImgPage({commit, getters}, payload) {
            const projects = getters.getAllProjects;
            const {indexProject, indexPage} = getIdxProjectPage(projects, payload.id);


            commit(types.SET_IMG_PAGE, {indexProject, indexPage, ...payload});
        },

        addBlockToPage({ commit, getters }, payload) {
            const { idPage, idBlock, title, description } = payload;
            const projects = getters.getAllProjects;
            const {indexProject, indexPage} = getIdxProjectPage(projects, idPage);

            let payloadData = {
                indexPage,
                indexProject,
                block: {
                    id: Date.now(),
                    type: idBlock,
                    title,
                    description
                }
            }

            commit(types.ADD_BLOCK_PAGE, payloadData)
        }
    },

    getters: {
        getPagesByIdProject: (state, getters) => (id) => {
            const projects = getters.getAllProjects;
            let project = projects.find(i => i.id === id)

            return 'pages' in project ? projects.find(i => i.id === id).pages : []
        },

        getPageById: (state, getters) => (id) => {
            const projects = getters.getAllProjects;
            let findPage;

            projects.forEach(project => {
                if (project.pages) {
                    let page = project.pages.find(page => page.id === id);

                    if (page) {
                        findPage = page
                    }

                }
            })

            return findPage
        },

        getBlocksPage: (state, getters) => (id) => {
            let page = getters.getPageById(id);

            return page.blocks || []
        }
    }
}