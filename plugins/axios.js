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

    if (status === 401) {
      if (_.startsWith(route.path, '/user')) {
        store.dispatch('user/logout')
        redirect('/user')
      } else if (_.startsWith(route.path, '/admin')) {
        store.dispatch('admin/logout')
        redirect('/admin');
      }
    }

    let msgs = _.get(err, 'response.data.error.message', false);
    if (msgs) {
      //console.log({1: 'DEBUG ON AXIOS :  onError Message:', 3: error.response.data.error.message});
      if (_.isPlainObject(msgs)) {
        let msgsArray = []
        _.forEach(msgs, (val, key) => {
          msgsArray.push(val);
        })
        store.commit('snackbar/setSnack', _.join(msgsArray,' \n '))
      } else if (_.isArray(msgs)) {
        store.commit('snackbar/setSnack', _.join(msgs, ', '))
      } else {
        store.commit('snackbar/setSnack', _.get(err, 'response.data.error.message.mobile', msgs))
      }
    } else {
      //console.log({1: 'DEBUG ON AXIOS :  onError:', 3: _.get(err, 'response', ''), err})
    }
  })
}
