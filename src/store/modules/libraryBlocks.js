import * as types from "@/const/mutation-types";

export default {
    state: {
        categoryBlocks: [],
        blocks: []
    },
    actions: {
        async getCategory({commit}) {
            try {
                let data = await require("@/data/libraryBlocks.json");

                if (data) {
                    let categoryArr = [];
                    let blocksArr = [];

                    for (let i = 0; i < data.length; i++) {
                        categoryArr.push({id: data[i].id, title: data[i].title});

                        for (let j = 0; j < data[i].blocks.length; j++) {
                            blocksArr.push({idCategory: data[i].id, ...data[i].blocks[j]});
                        }

                    }

                    commit(types.SET_LIBRARY, {categoryBlocks: categoryArr, blocks: blocksArr});
                }
            } catch(err) {
                console.log(err);
            }
        }

    },
    mutations: {
        [types.SET_LIBRARY](state, payload) {
            state.categoryBlocks = payload.categoryBlocks;
            state.blocks = payload.blocks
        }
    },
    getters: {
        getCategoryBlocks(state) {
            return state.categoryBlocks;
        },
        getBlocks: (state) => {
            return state.blocks
        },
        getBlocksByCategory: (state) => (id) => {
            return state.blocks.filter(i => i.idCategory === id);
        },
    }
}