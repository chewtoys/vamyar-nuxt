export default function ({store, route}) {
  let metadata = route.meta
  store.commit('navigation/setMeta', metadata)
  store.commit('navigation/setTitle', metadata[metadata.length - 1].title || '')
  store.commit('navigation/setPath', route.path)
}
