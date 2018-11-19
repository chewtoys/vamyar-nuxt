export default function ({store, route, redirect, error}) {
  let status = _.get(store.state, 'settings.data.site.isSiteOpen', true);
  let text = _.get(store.state, 'settings.data.site.closedSiteText', 'سایت در حال بروزرسانی می باشد');
  if(!status) return error({statusCode: 503 , message: text})
}
