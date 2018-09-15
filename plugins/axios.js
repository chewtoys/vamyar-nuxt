export default function ({$axios, store, redirect}) {


  // Authorization
  if (store.state.admin.auth || store.state.user.auth) {
    let accessToken = store.state.user.auth || store.state.admin.auth;
    $axios.setHeader('Authorization', `Bearer ${accessToken}`)
  }

  $axios.setHeader('Content-Type', ' application/json')
  //$axios.setHeader('Accept', 'application/json')
  //$axios.setHeader('Access-Control-Allow-Origin', '*')
  //
  //'Access-Control-Allow-Origin': '*',
  //'Content-Type': 'application/json',

  $axios.onRequest(config => {
    //console.log({1: 'DEBUG ON AXIOS :  Request:', config})
  })
  $axios.onResponse(response => {
    let {code} = response;
    //console.log({2: 'DEBUG ON AXIOS :  onResponse:', 2: response})
  })
}
