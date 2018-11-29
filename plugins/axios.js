export default function ({$axios, store, isClient, redirect, route}) {
  // Authorization
  if (store.state.admin.auth) {
    let accessToken = store.state.admin.auth;
    $axios.setHeader("Authorization", `Bearer ${accessToken}`)
  } else if (store.state.user.auth) {
    let accessToken = store.state.user.auth;
    $axios.setHeader("Authorization", `Bearer ${accessToken}`)
  }

  $axios.setHeader("Content-Type", " application/json");
  $axios.setHeader('Accept', 'application/json')
  //$axios.setHeader('Access-Control-Allow-Origin', '*')
  //
  //'Access-Control-Allow-Origin': '*',
  //'Content-Type': 'application/json',

  $axios.onRequest(config => {
    //console.log({1: "DEBUG ON AXIOS :  Request:", config})
  });
  $axios.onResponse(({response}) => {
    //let { code } = response
    //console.log({2: 'DEBUG ON AXIOS :  onResponse:', 2: response})
  });
  $axios.onError(err => {
    let {status} = _.get(err, 'response', 0);

    if (status === 401 ) {
      if (_.startsWith(route.path, '/user')) {
        store.dispatch('user/logout')
        redirect('/user')
      } else if (_.startsWith(route.path, '/admin')) {
        store.dispatch('admin/logout')
        redirect('/admin')
      }
    }

    if (_.has(err, 'response.data.error.message')) {
      //console.log({1: 'DEBUG ON AXIOS :  onError Message:', 3: error.response.data.error.message});
      store.commit('snackbar/setSnack', _.get(err, 'response.data.error.message.mobile', err.response.data.error.message))
    } else {
      //console.log({1: 'DEBUG ON AXIOS :  onError:', 3: _.get(err, 'response', ''), err})
    }
  })
}
