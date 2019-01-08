export default function ({store, route, redirect, error}) {
  let status = _.get(store.state, 'settings.data.site.isSiteOpen', true);
  let defaultMsg = 'سایت در حال حاضر بسته است';
  let text = _.get(store.state, 'settings.data.site.closedSiteText', defaultMsg) || defaultMsg;

  if (!status) return error({statusCode: 503, message: text})
}
