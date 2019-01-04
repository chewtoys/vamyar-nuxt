export default function ({store, $axios, redirect, route}) {
  // If the user is not authenticated
  if (!store.state.user.auth) {
    let path = route.path === '/user' ? '' : route.path;
    return redirect("/user/auth?path=" + encodeURI(path))
  } else {
    $axios.$get("/user/subscriptions",{params:{include:'subscriptionPlan'}}).then(res => {
      if (_.has(res, 'data')) {
        //console.log(1,_.get(res,'data',''))
        store.commit("user/updateUserSubscription", _.get(res, 'data', null))
      }
    })

  }
}
