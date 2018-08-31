export default function ({$axios, store, redirect}) {

  let token = store.state.auth;
  if (token) $axios.setHeader('Authentication', `Bearer ${token}`)

  $axios.setHeader('Content-Type', ' application/json')
  //$axios.setHeader('Accept', 'application/json')
  //$axios.setHeader('Access-Control-Allow-Origin', '*')
  //
  //'Access-Control-Allow-Origin': '*',
  //'Content-Type': 'application/json',
  
  $axios.onResponse(response => {
    console.log({1: 'DEBUG ON AXIOS :  onResponse:', 2: response})
  })
}
