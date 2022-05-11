export default function (projects, pageId) {
    let indexProject;
    let indexPage;

    projects.forEach((project, index) => {
        if (project.pages) {
            indexPage = project.pages.findIndex(page => page.id === pageId);

            if (indexPage !== -1) {
                indexProject = index;
            }
        }
    })

    return {indexProject, indexPage};
}