import Vuex from "vuex";

import * as types from "@/const/mutation-types";

import projects from "@/store/modules/projects";
import project from "@/store/modules/project";
import page from "@/store/modules/page";
import libraryBlocks from "@/store/modules/libraryBlocks";
import setProjectsCookie from "@/helpers/setProjectsCookie";

export default new Vuex.Store({
    state: {
        projectTypes: [],
        projectsData: [],
    },
    mutations: {
        [types.UPDATE_PROJECTS](state, projects) {
            state.projectsData = projects;
        },
        [types.GENERATE_PROJECTS_TYPES](state, payload) {
            state.projectTypes = payload
        },

        // Mutations with one project
        [types.ADD_NEW_PROJECT](state, { generateProject }) {
            state.projectsData.push(generateProject);
            setProjectsCookie(state.projectsData);
        },

        [types.CHANGE_NAME_PROJECT](state, {indexProject, newName}) {
            state.projectsData[indexProject].title = newName;
            setProjectsCookie(state.projectsData);
        },

        // Mutations with page
        [types.ADD_PAGE](state, { indexProject, page}) {
            if ('pages' in state.projectsData[indexProject]) {
                state.projectsData[indexProject].pages.push(page)
            } else {
                state.projectsData[indexProject].pages = [page]
            }
            setProjectsCookie(state.projectsData);
        },

        [types.REMOVE_PAGE](state, {indexProject, idPage}) {
            state.projectsData[indexProject].pages = state.projectsData[indexProject].pages.filter(page => page.id !== idPage);
            setProjectsCookie(state.projectsData);
        },

        [types.SET_SETTINGS_PAGE](state, payload) {
            const {indexProject, indexPage, title, description, path} = payload;

            state.projectsData[indexProject].pages[indexPage] = {
                ...state.projectsData[indexProject].pages[indexPage],
                title,
                description,
                path
            }
            setProjectsCookie(state.projectsData);
        },

        [types.SET_IMG_PAGE](state, payload) {
            const {srcImg, indexProject, indexPage} = payload;

            state.projectsData[indexProject].pages[indexPage] = {
                ...state.projectsData[indexProject].pages[indexPage],
                srcImg
            }

            setProjectsCookie(state.projectsData);
        },

        [types.ADD_BLOCK_PAGE](state, payload) {
            const {indexProject, indexPage, block} = payload;
            if ('blocks' in state.projectsData[indexProject].pages[indexPage]) {
                state.projectsData[indexProject].pages[indexPage].blocks.push(block)
            } else {
                state.projectsData[indexProject].pages[indexPage].blocks = [block]
            }
            setProjectsCookie(state.projectsData);
        },

        [types.EDIT_BLOCKS_PAGE](state, payload) {
            const {indexPage, indexProject, newArrBlocks} = payload;
            state.projectsData[indexProject].pages[indexPage].blocks = newArrBlocks
            setProjectsCookie(state.projectsData);
        }
    },

    modules: {
        projects,
        project,
        page,
        libraryBlocks
    }
})