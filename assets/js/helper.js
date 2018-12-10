import * as CONSTANTS from '~/assets/js/constants.js'

const Helper = {
  nl2br(str, is_xhtml = true) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Philip Peterson
    // +   improved by: Onno Marsman
    // +   improved by: Atli Þór
    // +   bugfixed by: Onno Marsman
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: Maximusya
    // *     example 1: nl2br('Kevin\nvan\nZonneveld');
    // *     returns 1: 'Kevin<br />\nvan<br />\nZonneveld'
    // *     example 2: nl2br("\nOne\nTwo\n\nThree\n", false);
    // *     returns 2: '<br>\nOne<br>\nTwo<br>\n<br>\nThree<br>\n'
    // *     example 3: nl2br("\nOne\nTwo\n\nThree\n", true);
    // *     returns 3: '<br />\nOne<br />\nTwo<br />\n<br />\nThree<br />\n'
    const breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br ' + '/>' : '<br>'; // Adjust comment to avoid issue on phpjs.org display
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
  }
  ,
// useful methods
  getTypes: function (name = null) {
    let types = CONSTANTS.advertTypes
    if (name && types[name]) {
      return types[name]
    } else {
      return types
    }
  }
  ,
  getBreadcrumb: function (title) {
    return title
  }
  ,
  getPageTitle: function (title) {
    return "آگهی‌های " + title
  }
  ,
  getFiltersByType(type) {
    return _.get(CONSTANTS.filtersByField, type, []);
  }
  ,
  isFieldAllowByType(type, field, which = 'create') {
    let fields = CONSTANTS.fieldByType;
    return _.has(fields, `${type}.${which}`) ? !!(_.find(fields[type][which], {'name': field})) : false;
  }
  ,
  getFieldByType(type, field, which = 'create') {
    let fields = CONSTANTS.fieldByType;
    return _.find(_.get(fields, `${type}.${which}`, {}), {'name': field});
  }
  ,
  getFieldPath(type, field, which = 'edit') {
    let fields = CONSTANTS.fieldByType;
    return _.get(_.find(_.get(fields, `${type}.${which}`, {}), {'name': field}), 'path', field);
  }
  ,
  getTypeFields(type, which = 'create') {
    let fields = CONSTANTS.fieldByType;
    return _.get(fields, `${type}.${which}`, {})
  }
  ,
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
  }
  ,
  getAdvertLink: function (item) {
    let types = CONSTANTS.advertTypes
    let advertType = _.get(item, 'advertableType', _.get(item, 'advert.advertableType', ''))
    let type = _.find(types, {'advertType': advertType})
    if (type && type.alias) {
      return "/categories/" + type.alias + "/show/" + _.get(item, 'advertable.id', _.get(item, 'id', 0))
    } else {
      return "#type-not-found"
    }
  }
  ,
  getAdvertType: function (item) {
    let types = CONSTANTS.advertTypes
    let advertType = _.get(item, 'advertableType', _.get(item, 'advert.advertableType', ''));
    //console.log({item,advertType})
    return _.get(_.find(types, {'advertType': advertType}), 'title', advertType || 'نامشخص');
  },
  /*
  @which = 'advert' || 'special' : advert for /adverts/~ routes
   */
  computeAdvertData: function (item, store, axios, which = 'advert') {

    let types = CONSTANTS.advertTypes;
    let advertableType = _.get(item, 'advertableType', _.get(item, 'advert.advertableType', ''));
    let type = _.get(_.find(types, {'advertType': advertableType}), 'type', advertableType || 'loans');
    let editable = this.getTypeFields(type, 'edit');
    let properties = [];
    let computed = {};
    let commonFields = CONSTANTS.COMMON_FIELDS;
    _.concat(commonFields, editable).forEach((field) => {
      let name = _.get(field, 'name', field);
      let title = _.get(field, 'title', field);
      let path = _.get(item, _.get(field, 'path', _.get(field, 'name', name)), name);
      if (which === 'advert') {
        if (commonFields.includes(name)) {
          path = _.get(field, 'path', _.get(field, 'name', name)).replace('advert.', '');
        } else {
          path = 'advertable.' + _.get(field, 'path', _.get(field, 'name', name)).replace('advert.', '');
        }
      }
      let value = this.computeAdvertField(name, _.get(item, path, ''), store);
      console.log({name, value});
      _.set(computed, name, value)
      properties.push({
        title,
        name,
        value
      });
    })
    //console.log({properties});
    return this.properties = {base: item, computed, properties};

  },
  computeAdvertField(name, value, store) {
    if (name === 'title') {
      return value || ''
    } else if (name === 'jCreatedAt') {
      return value || ''
    } else if (name === 'jUpdatedAt') {
      return value || ''
    } else if (name === 'image') {
      return value || ''
    } else if (name === 'description') {
      return value || ''
    } else if (name === 'id') {
      return value || ''
    } else if (name === 'text') {
      return this.nl2br(value || '')
    } else if (name === 'mobile') {
      return value || ''
    } else if (name === 'user') {
      return value || ''
    } else if (name === 'price') {
      return this.priceFormat(value || '')
    } else if (name === 'amount') {
      return this.priceFormat(value || '')
    } else if (name === 'maxAmount') {
      return this.priceFormat(value || '')
    } else if (name === 'job') {
      return value || ''
    } else if (name === 'interestRate') {
      return value || ''
    } else if (name === 'paybackTime') {
      return value + ' ماه' || ''
    } else if (name === 'bank') {
      return (value || '')
    } else if (name === 'loanType') {
      let list = _.get(store, 'state.loanType.data', []);
      let index = _.findIndex(list, {'id': value});
      let item = _.get(list, [index], {});
      return _.get(item, 'name', 'نامشخص');
    } else if (name === 'city') {
      if (!_.isNumber(value)) return value;
      let list = _.get(store, 'state.city.data', []);
      let index = _.findIndex(list, {'id': value});
      let item = _.get(list, [index], {});
      return _.get(item, 'name', '');
    } else if (name === 'guaranteeTypes') {
      let items = [];
      _.forEach(value, (item) => {
        items.push(item.name)
      })
      return _.join(items, ', ')
    }
  },
  limitStr(text = "", limit = 30, end = " ...") {
    return text.slice(0, limit) + end
  }
  ,
  priceFormat(price = null) {
    price = price * 1 // convert to number;
    if (price > 0) return price.toLocaleString("fa-IR") + " ریال"
    return "توافقی"
  },
  isPremiumType(type, which = 'create') {
    let list = _.get(CONSTANTS, ['PREMIUMS', which], []);
    return list.includes(type);
  }
  ,
  getRawHeaders(type) {
    return _.get(CONSTANTS.rawHeaders, `${type}`, [{text: 'id'}]);
  },
  getCommonHeaders() {
    return _.get(CONSTANTS, 'COMMON_FIELDS', [{text: 'id'}]);
  }
  ,
  //getAdminRawHeaders(type) {
  //  return _.get(CONSTANTS.adminRawHeaders, `${type}`, [{text: 'id'}]);
  //}
  //,
  getGeneralSettingsGroup() {
    return CONSTANTS.GENERAL_SETTINGS;
  }
  ,
  selectDataForSend(type, that, which = 'create') {
    let fields = _.map(CONSTANTS.fieldByType[type][which], 'name');
    //console.log('Fields:', {fields})
    let all = {};
    _.forEach(fields, (name) => {
      _.set(all, name, _.get(that, name, ''))
    })
    return all;
  },
  getComputedFilter(obj, type = null) {
    let filter = {}, query = {};
    let maximum = {
      'amountValue': true,
      'paybackTimeValue': true,
      'maxAmountValue': true
    };
    let minimum = {};
    if (type === null) {
      // common filters

      filter = _.pick(obj, ['cityIdValue', 'instantValue', 'titleValue']);
      _.get(filter, 'instantValue', null) === 1 ? _.set(filter, 'instantValue', 'true') : _.set(filter, 'instantValue', '');
    } else if (type === 'loans') {
      filter = _.pick(obj, ['loanTypeValue', 'amountValue', 'paybackTimeValue']);
    } else if (type === 'loanRequests') {
      filter = _.pick(obj, ['loanTypeValue', 'amountValue', 'paybackTimeValue']);
    } else if (type === 'finances') {
      filter = _.pick(obj, ['maxAmountValue']);
    } else if (type === 'financeRequests') {
      filter = _.pick(obj, ['jobValue', 'maxAmount', 'maxAmountValue']);
    } else if (type === 'coSigners') {
      filter = _.pick(obj, ['guaranteeTypeValue']);
    } else if (type === 'coSignerRequests') {
      filter = _.pick(obj, ['guaranteeTypes', 'typeValue']);
    }

    let prefix = '';
    _.forEach(filter, (val, key) => {
      prefix = _.has(maximum, key) ? '<' : (_.has(minimum, key) ? '>' : '');
      if (val) _.set(query, key.replace('Value', ''), prefix + val)
    })

    //console.log({obj, filter, query});
    return query;
  }

}

export default Helper
