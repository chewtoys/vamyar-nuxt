export const state = () => ({
  meta: null,
  title: null,
  path: null,
  drawer: false,
  isMobile: false
})

export const mutations = {
  setDrawer(state, val) {
    state.drawer = val
  }, setMeta(state, items) {
    state.meta = items
  },
  pushMeta(state, items) {
    state.meta.push(items)
  },
  setTitle(state, title) {
    state.title = title
  },
  setPath(state, data) {
    state.path = data
  }
}
