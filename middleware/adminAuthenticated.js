export default function ({store, redirect}) {
    // If the user is not authenticated
    if (!store.state.admin.auth) {
        return redirect('/admin/auth')
    }
}