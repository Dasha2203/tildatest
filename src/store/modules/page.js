import * as types from "@/const/mutation-types";
import getIdxProjectPage from "@/helpers/getIdxProjectPage";

export default {
    namespaced: true,
    state: {
        pageImages: [],
        openSettingsPageModal: false,
        selectPage: null
    },
    actions: {
        setSelectPage({commit}, payload) {
            commit(types.SELECT_PAGE, payload)
        },
        addNewPageToProject({commit, rootGetters}, payload) {
            const {id, newName} = payload;
            const projects = rootGetters['getAllProjects'];

            let indexProject = projects.findIndex(i => i.id === id);

            if (indexProject !== -1) {
                let page = {
                    id: Date.now(),
                    title: newName
                }

                commit(types.ADD_PAGE, {indexProject, page}, {root: true})
            }
        },

        removePage({commit, rootGetters}, payload) {
            const projects = rootGetters['getAllProjects'];;
            const {idProject} = payload;

            let indexProject = projects.findIndex(i => i.id === idProject);

            if (indexProject !== -1) {
                commit(types.REMOVE_PAGE, {indexProject, ...payload}, {root: true})
            }
        },

        setSettingsPage({commit, rootGetters}, payload) {
            const projects = rootGetters['getAllProjects'];
            const {indexProject, indexPage} = getIdxProjectPage(projects, payload.id);

            commit(types.SET_SETTINGS_PAGE, {indexProject, indexPage, ...payload}, {root: true})
        },

        setImgPage({commit, rootGetters}, payload) {
            const projects = rootGetters['getAllProjects'];
            const {indexProject, indexPage} = getIdxProjectPage(projects, payload.id);


            commit(types.SET_IMG_PAGE, {indexProject, indexPage, ...payload}, {root: true});
        },

        addBlockToPage({commit, rootGetters}, payload) {
            const {idPage, idBlock, title, description} = payload;
            const projects = rootGetters['getAllProjects'];
            const {indexProject, indexPage} = getIdxProjectPage(projects, idPage);

            let payloadData = {
                indexPage,
                indexProject,
                block: {
                    id: Date.now(),
                    type: idBlock,
                    title,
                    description,
                    hide: false
                }
            }

            commit(types.ADD_BLOCK_PAGE, payloadData, {root: true})
        },

        removeSelectBlock({commit, rootGetters}, payload) {
            const {idPage, idBlock} = payload;
            const projects = rootGetters['getAllProjects'];
            const {indexProject, indexPage} = getIdxProjectPage(projects, idPage);

            let blocks = projects[indexProject].pages[indexPage].blocks

            if (blocks.length) {
                let indexBlock = blocks.findIndex(block => block.id === idBlock)

                if (indexBlock !== -1) {
                    let newArrBlocks = [
                        ...blocks.slice(0, indexBlock),
                        ...blocks.slice(indexBlock + 1)
                    ];

                    commit(types.EDIT_BLOCKS_PAGE, {indexProject, indexPage, newArrBlocks}, {root: true})
                }
            }
        },

        turnShowBlock({commit, rootGetters}, payload) {
            const {idPage, idBlock} = payload;
            const projects = rootGetters['getAllProjects'];
            const {indexProject, indexPage} = getIdxProjectPage(projects, idPage);

            let blocks = projects[indexProject].pages[indexPage].blocks;

            if (blocks.length) {
                let indexBlock = blocks.findIndex(block => block.id === idBlock)

                if (indexBlock !== -1) {

                    blocks[indexBlock].hide = !blocks[indexBlock].hide;

                    commit(types.EDIT_BLOCKS_PAGE, {indexProject, indexPage, newArrBlocks: blocks},{root: true})
                }
            }
        },

        moveSelectBlock({commit, rootGetters}, payload) {
            const {idPage, idBlock, direction} = payload;
            const projects = rootGetters['getAllProjects'];
            const {indexProject, indexPage} = getIdxProjectPage(projects, idPage);

            let blocks = [...projects[indexProject].pages[indexPage].blocks]

            if (blocks.length) {
                let indexBlock = blocks.findIndex(block => block.id === idBlock)

                if (indexBlock !== -1) {
                    let saveIndex = direction === 'up' ? indexBlock - 1 : indexBlock + 1;
                    let saveBlock = blocks[saveIndex];

                    blocks[saveIndex] = blocks[indexBlock];
                    blocks[indexBlock] = saveBlock;

                    commit(types.EDIT_BLOCKS_PAGE, {indexProject, indexPage, newArrBlocks: blocks}, {root: true})
                }
            }
        },

        duplicateSelectBlock({commit, rootGetters}, payload) {
            const {idPage, idBlock} = payload;
            const projects = rootGetters['getAllProjects'];
            const {indexProject, indexPage} = getIdxProjectPage(projects, idPage);

            let blocks = [...projects[indexProject].pages[indexPage].blocks];

            if (blocks.length) {
                let indexBlock = blocks.findIndex(block => block.id === idBlock)

                if (indexBlock !== -1) {
                    let duplicateBlock = {...blocks[indexBlock], id: Date.now()};
                    let newArrBlocks = [
                        ...blocks.slice(0, indexBlock + 1),
                        duplicateBlock,
                        ...blocks.slice(indexBlock + 1)
                    ];

                    commit(types.EDIT_BLOCKS_PAGE, {indexProject, indexPage, newArrBlocks}, {root: true})
                }
            }
        },

        editBlockPage({commit, rootGetters}, payload) {
            const {idPage, idBlock, title, description} = payload;
            const projects = rootGetters['getAllProjects'];
            const {indexProject, indexPage} = getIdxProjectPage(projects, idPage);

            let blocks = [...projects[indexProject].pages[indexPage].blocks];

            if (blocks.length) {
                let indexBlock = blocks.findIndex(block => block.id === idBlock)

                if (indexBlock !== -1) {

                    blocks[indexBlock] = {
                        ...blocks[indexBlock],
                        title,
                        description
                    }

                    commit(types.EDIT_BLOCKS_PAGE, {indexProject, indexPage, newArrBlocks: blocks},{root: true})
                }
            }
        },

        changeOpenPageSettings({commit}, payload) {
            commit(types.CHANGE_OPEN_SETTINGS, payload)
        }
    },
    mutations: {
        [types.CHANGE_OPEN_SETTINGS](state, payload) {
            state.openSettingsPageModal = payload.open;
        },
        [types.SELECT_PAGE](state, payload) {
            state.selectPage = payload.id
        }
    },
    getters: {
        getPagesByIdProject: (state, getters, rootState, rootGetters) => (id) => {
            const projects = rootGetters['getAllProjects'];
            let project = projects.find(i => i.id === id)

            return 'pages' in project ? projects.find(i => i.id === id).pages : []
        },

        getPageById: (state, getters, rootState, rootGetters) => (id) => {
            const projects = rootGetters['getAllProjects'];
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

        getBlocksPage: (state, getters) => {
            let page = getters.getPageById(state.selectPage)

            return page.blocks || []
        },

        getOpenSettingsModal(state) {
            return state.openSettingsPageModal
        },
    }
}