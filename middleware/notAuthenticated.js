export default function ({store, redirect}) {
  // If the user is not authenticated
  if (store.state.user.auth) {
    if (store.state.user.info.details) {
      return redirect("/user")
    } else {
      return redirect("/user/edit")
    }
  }
}
