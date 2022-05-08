import * as types from "@/const/mutation-types";

export default {
    state: {
        pageImages: []
    },
    actions: {
        addNewPageToProject({commit, rootState}, payload) {
            commit(types.ADD_PAGE, {rootState, ...payload})
        },

        removePage({commit, rootState}, payload) {
            commit(types.REMOVE_PAGE, {rootState, ...payload})
        },

        setSettingsPage({commit, rootState}, payload) {
            commit(types.SET_SETTINGS_PAGE, {rootState, ...payload})
        },

        setImgPage({commit, rootState}, payload) {
            commit(types.SET_IMG_PAGE, {rootState, ...payload});
        }
    },

    mutations: {
        [types.ADD_PAGE](state, {rootState, id, newName}) {
            let indexProject = rootState.projects.projectsData.findIndex(i => i.id === id)
            if (indexProject !== -1) {
                if ('pages' in rootState.projects.projectsData[indexProject]) {
                    rootState.projects.projectsData[indexProject].pages.push({id: Date.now(), title: newName})
                } else {
                    rootState.projects.projectsData[indexProject].pages = [{id: Date.now(), title: newName}]
                }
                document.cookie = `projects=${JSON.stringify(rootState.projects.projectsData)}; path=/;`
            }
        },

        [types.REMOVE_PAGE](state, {rootState, idProject, idPage}) {
            let indexProject = rootState.projects.projectsData.findIndex(i => i.id === idProject);

            if (indexProject !== -1) {
                rootState.projects.projectsData[indexProject].pages =
                    rootState.projects.projectsData[indexProject].pages.filter(page => page.id !== idPage);
                document.cookie = `projects=${JSON.stringify(rootState.projects.projectsData)}; path=/;`
            }

        },

        [types.SET_SETTINGS_PAGE](state, {rootState, id, title, description}) {
            let findProject;
            let indexPage;

            rootState.projects.projectsData.forEach((project, index) => {
                if (project.pages) {
                    indexPage = project.pages.findIndex(page => page.id === id)
                    if (indexPage !== -1) {
                        findProject = index

                    }
                }
            })

            rootState.projects.projectsData[findProject].pages[indexPage] = {
                ...rootState.projects.projectsData[findProject].pages[indexPage],
                title: title,
                description: description
            }
            document.cookie = `projects=${JSON.stringify(state.projectsData)}; path=/;`
        },

        [types.SET_IMG_PAGE](state, {rootState, id, srcImg}) {
            let findProject;
            let indexPage;
            rootState.projectsData.forEach((project, index) => {
                if (project.pages) {
                    indexPage = project.pages.findIndex(page => page.id === id)
                    if (indexPage !== -1) {
                        findProject = index

                    }
                }
            })

            rootState.projectsData[findProject].pages[indexPage] = {
                ...rootState.projectsData[findProject].pages[indexPage],
                srcImg
            }

            document.cookie = `projects=${JSON.stringify(state.projectsData)}; path=/;`
        }
    },
    getters: {

        getPagesByIdProject: (state, getters, rootState) => (id) => {
            let project = rootState.projects.projectsData.find(i => i.id === id)
            return 'pages' in project ? rootState.projects.projectsData.find(i => i.id === id).pages : []
        },

        getPageById: (state, getters, rootState) => (id) => {
            let findPage;
            rootState.projects.projectsData.forEach(project => {
                if (project.pages) {
                    findPage = project.pages.find(page => page.id === id)

                }
            })

            return findPage
        },

        getLinkPage: (state, getters, rootState) => (id) => {
            let findProject;
            rootState.projects.projectsData.forEach(project => {
                if (project.pages) {
                    let page = project.pages.find(page => page.id === id)
                    if (page) {
                        findProject = project
                    }

                }
            })

            return `https://project_${findProject.id}/page_${id}`
        }
    }
}