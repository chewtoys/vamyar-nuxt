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
  isFiledAllowByType(type, field, which = 'create') {
    let fileds = CONSTANTS.filedByType;
    return _.has(fileds, `${type}.${which}`) ? !!(_.find(fileds[type][which], {'name': field})) : false;
  },
  isFiledAllowByAlias(slug, field, which = 'create') {
    let type = this.getTypeByAlias(slug).type;
    return this.isFiledAllowByType(type, field);
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
    return rawHeaders && rawHeaders[type] ? rawHeaders[type] : []
  }
}


export default Helper
