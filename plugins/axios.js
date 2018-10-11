export default function ({$axios, store, redirect}) {
  // Authorization
  if (store.state.admin.auth || store.state.user.auth) {
    let accessToken = store.state.user.auth || store.state.admin.auth;
    $axios.setHeader("Authorization", `Bearer ${accessToken}`)
  }

  $axios.setHeader("Content-Type", " application/json");
  //$axios.setHeader('Accept', 'application/json')
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
  $axios.onError(error => {
    let {status} = error.response
    if (status === 401) {
      store.dispatch('user/logout')
      redirect('/user')
    }
    if (_.has(error.response, 'data.error.message')) {
      //console.log({1: 'DEBUG ON AXIOS :  onError Message:', 3: error.response.data.error.message});
      store.commit('snackbar/setSnack', _.get(error, 'response.data.error.message.mobile', error.response.data.error.message))
    } else {
      console.log({1: 'DEBUG ON AXIOS :  onError:', 3: error.response})
    }
  })
}
