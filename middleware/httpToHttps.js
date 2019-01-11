export default function ({store, route, redirect}) {

  let url = route.fullPath;
  if (!_.includes(url, 'localhost') && _.startsWith(url, 'http://www')) {
    console.log('www')
    redirect(301, _.replace(url, 'http://', 'https://'));
  } else if (!_.includes(url, 'localhost') && _.startsWith(url, 'http://')) {
    console.log('!www')
    redirect(301, _.replace(url, 'http://', 'https://www.'));
  } else {
    console.log('redirect fails!', {url}, _.startsWith(url, 'http://'))
  }

}
