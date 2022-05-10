import * as types from "@/const/mutation-types";

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
            let indexProject;
            let indexPage;

            projects.forEach((project, index) => {
                if (project.pages) {
                    indexPage = project.pages.findIndex(page => page.id === payload.id)
                    if (indexPage !== -1) {
                        indexProject = index

                    }
                }
            })
            commit(types.SET_SETTINGS_PAGE, {indexProject, indexPage, ...payload})
        },

        setImgPage({commit, rootState}, payload) {
            const {projectsData} = rootState.projects;
            let indexProject;
            let indexPage;

            projectsData.forEach((project, index) => {
                if (project.pages) {

                    indexPage = project.pages.findIndex(page => page.id === payload.id);

                    if (indexPage !== -1) {
                        indexProject = index
                    }
                }
            })

            commit(types.SET_IMG_PAGE, {indexProject, indexPage, ...payload});
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
                    findPage = project.pages.find(page => page.id === id)
                }
            })

            return findPage
        },
    }
}