export default  {
    actions: {
        async fetchAllProjects(context) {
            try {
                let data = await require("@/data/projects.json")
                console.log('context', context)
                context.commit('updateProjects', data)
            } catch(err) {
                console.error('Произошла ошибка', err)
            }
        }
    },
    mutations: {
        updateProjects(state, projects) {
            state.projectsData = projects;
        },
        addNewProject(state, id) {
            if (index !== -1) {
                console.log('count', state.projectsData[id].projects.length)
                console.log(state)
                let generateProject = {
                    id: state.projectsData[id].projects.length + 1,
                    title: 'My project',
                    link: `/project/${state.projectsData[id].projects.length + 1}`
                }
                state.projectsData[index].projects.push(generateProject)
            }
        }
    },
    state: {
        projectsData: []
    },
    getters: {
        getAllProjects(state) {
            return state.projectsData
        }
    }
}