import * as CONSTANTS from '~/assets/js/constants.js'

const Helper = {
  // useful methods
  getTypes: function (name = null) {
    let types = CONSTANTS.advertTypes
    if (name && types[name]) {
      return types[name]
    } else {
      return types
    }
  },
  getBreadcrumb: function (title) {
    return title
  },
  getPageTitle: function (title) {
    return "آگهی‌های " + title
  },
  isFieldAllowByType(type, field, which = 'create') {
    let fields = CONSTANTS.fieldByType;
    return _.has(fields, `${type}.${which}`) ? !!(_.find(fields[type][which], {'name': field})) : false;
  },
  getFieldByType(type, field, which = 'create') {
    let fields = CONSTANTS.fieldByType;
    return _.find(_.get(fields, `${type}.${which}`, {}), {'name': field});
  },
  getFieldPath(type, field, which = 'edit') {
    let fields = CONSTANTS.fieldByType;
    return _.get(_.find(_.get(fields, `${type}.${which}`, {}), {'name': field}), 'path', field);
  },
  getTypeFields(type, which = 'create') {
    let fields = CONSTANTS.fieldByType;
    return _.get(fields, `${type}.${which}`, {})
  },
  isFieldAllowByAlias(slug, field, which = 'create') {
    let type = this.getTypeByAlias(slug).type;
    return this.isFieldAllowByType(type, field);
  },
  getTypeByAlias: function (alias = null) {
    let types = CONSTANTS.advertAliases
    if (alias && types[alias]) {
      return types[alias]
    } else {
      return types
    }
  },
  getAdvertLink: function (item) {
    let type = this.getTypes(item.advertableType)
    if (type && type.alias) {
      return "/categories/" + type.alias + "/show/" + item.advertableId
    } else {
      return "#type-not-found"
    }
  },
  getAdvertType: function (item) {
    let type = this.getTypes(item.advertableType)
    if (type.title) {
      return type.title
    } else {
      return "بدون نوع"
    }
  },
  limitStr(text = "", limit = 30, end = " ...") {
    return text.slice(0, limit) + end
  },
  priceFormat(price = null) {
    price = price * 1 // convert to number;
    if (price > 0) return price.toLocaleString("fa-IR") + " ریال"
    return "تعیین نشده"
  },
  getRawHeaders(type) {
    return _.get(CONSTANTS.rawHeaders, `${type}`, [{text: 'id'}]);
  },
  getAdminRawHeaders(type) {
    return _.get(CONSTANTS.adminRawHeaders, `${type}`, [{text: 'id'}]);
  },
  getGeneralSettingsGroup() {
    return CONSTANTS.GENERAL_SETTINGS;
  },
  selectDataForSend(type, that, which = 'create') {
    let fields = _.map(CONSTANTS.fieldByType[type][which], 'name');
    //console.log('Fields:', {fields})
    let all = {};
    _.forEach(fields, (name) => {
      _.set(all, name, _.get(that, name, ''))
    })
    return all;
  }
}

export default Helper
