export default function ({store, route}) {
    let breadcrumb = null
    let title = null
    let metadata = {}
    if (route.meta[2]) {
        metadata = route.meta[2]
    } else if (route.meta[1]) {
        metadata = route.meta[1]
    } else {
        metadata = route.meta[0]
    }

    if (metadata !== undefined && metadata.breadcrumb !== undefined) {
        breadcrumb = [{
            name: route.name,
            text: metadata.breadcrumb,
            disabled: false,
        }]
    }
    if (metadata !== undefined && metadata.title !== undefined) {
        title = metadata.title
    }

    store.commit('setBreadcrumb', breadcrumb)
    store.commit('setPageTitle', title)
}
