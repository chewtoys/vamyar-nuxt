export default function ({store, redirect, route}) {
  // If the user is not authenticated
  if (!store.state.user.auth) {
    let path = route.path === '/user' ? '' : route.path;
    return redirect("/user/auth?path=" + encodeURI(path))
  }
}
