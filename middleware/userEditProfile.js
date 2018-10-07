export default function ({store, redirect, route}) {
  // If the user is not authenticated

  if (store.state.user.auth) {
    if (!(_.has(store.state.user.info, 'details.firstName')) && _.startsWith(route.path, '/user/profile/edit')) {
      return redirect("/user/profile/edit")
    }
  }
}
