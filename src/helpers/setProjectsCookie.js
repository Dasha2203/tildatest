export default function (projects) {
    document.cookie = `projects=${JSON.stringify(projects)}; path=/;`
}