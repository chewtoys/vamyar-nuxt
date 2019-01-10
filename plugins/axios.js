export default function ({$axios, store, isClient, redirect, route}) {
  // Authorization
  if (store.state.admin.auth && _.includes(route.path, 'admin')) {
    let accessToken = store.state.admin.auth;
    $axios.setHeader("Authorization", `Bearer ${accessToken}`)
  } else if (store.state.user.auth) {
    let accessToken = store.state.user.auth;
    $axios.setHeader("Authorization", `Bearer ${accessToken}`)
  }

  $axios.setHeader("Content-Type", " application/json");
  $axios.setHeader('Accept', 'application/json');
  //$axios.setHeader('Access-Control-Allow-Origin', '*')
  //
  //'Access-Control-Allow-Origin': '*',
  //'Content-Type': 'application/json',

  $axios.onRequest(config => {
    // console.log({1: "DEBUG ON AXIOS :  Request:", config, type})
  });
  $axios.onResponse(({response}) => {
    //let { code } = response
    //console.log({2: 'DEBUG ON AXIOS :  onResponse:', 2: response})
  });
  $axios.onError(err => {
    let {status} = _.get(err, 'response', 0);
    let color = 'info'
    let exceptions = ['/coupons']
    if (status < 400) color = 'success'
    let type = _.get(err, 'config.method', '');
    let path = _.get(err, 'config.url', '');
    //console.log({path})


    if (status === 401) {
      if (_.startsWith(route.path, '/user')) {
        store.dispatch('user/logout')
        redirect('/user')
      } else if (_.startsWith(route.path, '/admin')) {
        store.dispatch('admin/logout')
        redirect('/admin');
      }
      if (isClient) {

      }
    }

    let msgsArray = []
    let msgs = _.get(err, 'response.data.error.message', false);
    if (msgs) {
      //console.log({1: 'DEBUG ON AXIOS :  onError Message:', 3: error.response.data.error.message});
      if (_.isPlainObject(msgs)) {
        _.forEach(msgs, (val, key) => {
          msgsArray.push(val);
        })
      }
      //console.log({type, status})
      if (status !== 404 || type !== 'get' || _.includes(path, exceptions)) {
        if (_.isPlainObject(msgs)) {
          store.commit('snackbar/setSnack', _.join(msgsArray, ' \n '), color)
        }
        else if (_.isArray(msgs)) {
          store.commit('snackbar/setSnack', _.join(msgs, ', '), color)
        } else {
          store.commit('snackbar/setSnack', _.get(err, 'response.data.error.message.mobile', msgs), color)
        }
      }
    }
  })
}
