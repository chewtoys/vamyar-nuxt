import * as CONSTANTS from '~/assets/js/constants.js'

const moment = require('moment-jalaali');

const Helper = {
  nl2br(str, is_xhtml = true) {
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
  getTypeFields(type, which = 'create', isAdmin = false) {
    let fields = CONSTANTS.fieldByType;
    let list = _.get(fields, `${type}.${which}`, {})
    if (isAdmin) {
      list.push({name: 'description', path: 'advert.description'})
    }
    return list;
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
  getAdvertLink: function (item, whichType = null) {
    let types = CONSTANTS.advertTypes
    let advertType = _.get(item, 'advertableType', _.get(item, 'advert.advertableType', ''))
    let type = whichType || _.find(types, {'advertType': advertType})
    if (type && type.alias) {
      return "/categories/" + type.alias + "/show/" + _.get(item, 'advertable.id', _.get(item, 'id', 0))
    } else {
      return "#type-not-found"
    }
  }
  ,
  getAdvertType: function (item, whichType = null, getType = false) {
    let types = CONSTANTS.advertTypes
    if (whichType) return _.get(_.find(types, {'type': whichType}), 'title', whichType || 'نامشخص');
    let advertType = _.get(item, 'advertableType', _.get(item, 'advert.advertableType', ''));
    //console.log({item,advertType})
    if (getType) return _.find(types, {'advertType': advertType})
    return _.get(_.find(types, {'advertType': advertType}), 'title', advertType || 'نامشخص');
  },
  getTypeByAdvertType: function (advertType) {
    let types = CONSTANTS.advertTypes
    return _.find(types, {'advertType': advertType});
  },
  getAdvertTypeByType: function (type) {
    let types = CONSTANTS.advertTypes
    return _.find(types, {'type': type}).title;
  },
  /*
  @which = 'advert' || 'special' : advert for /adverts/~ routes
   */
  translateFieldName(name) {
    let list = CONSTANTS.COMMON_FIELD_TITLE;
    return _.get(list, name, name)
  },
  computeAdvertData: function (item, store, axios, which = 'adverts') {

    let types = CONSTANTS.advertTypes;
    let advertableType = _.get(item, 'advertableType', _.get(item, 'advert.advertableType', ''));
    let type = _.get(_.find(types, {'advertType': advertableType}), 'type', advertableType || '');
    let editable = this.getTypeFields(type, 'edit');
    let properties = [];
    let computed = {};
    let commonFields = CONSTANTS.COMMON_FIELDS;
    let fieldsArray = _.concat(commonFields, editable);
    //(field) => {
    //  console.log(field)
    //  _.get(field, 'name', field)
    //});
    fieldsArray.forEach((field) => {
      let name = _.get(field, 'name', field);
      if (!_.find(properties, {name})) {
        let title = _.get(field, 'title', this.translateFieldName(field));
        let path = _.get(item, _.get(field, 'path', _.get(field, 'name', name)), name);
        if (which === 'adverts') {
          if (commonFields.includes(name)) {
            path = name;
          } else {
            path = `advertable.${name}`;
          }
        } else {
          if (commonFields.includes(name)) {
            path = `advert.${name}`;
          } else {
            path = name;
          }
        }
        let initValue = _.get(item, path, '')
        // exceptions
        if (name === 'advertType') initValue = type;

        let value = this.computeAdvertField(name, initValue, store);

        //console.log({name, path, initValue, value});
        _.set(computed, name, value)
        properties.push({
          title,
          name,
          value
        });
      }
    })
    //console.log({properties});
    return this.properties = {base: item, computed, properties};
  },
  computeAdvertField(name, value, store = []) {
    if (name === 'title') {
      return value || ''
    } else if (name === 'jCreatedAt') {
      return this.dateFormat(value || '')
    } else if (name === 'jUpdatedAt') {
      return this.dateFormat(value || '')
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
      let details = {
        'نام': _.get(value, 'details.firstName', '-') || '-',
        'نام خانوادگی': _.get(value, 'details.lastName', '-') || '-',
        'شماره موبایل': _.get(value, 'mobile', '-') || '-',
        'ایمیل': _.get(value, 'email', '-') || '-',
        'شناسه': _.get(value, 'id', '-') || '-',
      }
      let arr = []
      _.forEach(details, (title, val) => {
        arr.push(`${val}: ${title}`)
      })
      return this.nl2br(_.join(arr, '\n'))
    } else if (name === 'price') {
      return value ? this.priceFormat(value) : 'توافقی'
    }
    else if (name === 'amount') {
      return value ? this.priceFormat(value) : 'نامشخص'
    } else if (name === 'maxAmount') {
      return value ? this.priceFormat(value) : 'توافقی'
    } else if (name === 'job') {
      return value || ''
    } else if (name === 'image') {
      return value || ''
    } else if (name === 'advertType') {
      return this.getAdvertTypeByType(value || '')
    } else if (name === 'interestRate') {
      return value ? (val + 'درصد') : ''
    } else if (name === 'tradeStatus') {
      let list = _.get(store, 'state.settings.adverts.tradeStatusList', ['باز', 'درحال معامله', 'بسته شده']);
      return list[value] || 'نا مشخص';
    } else if (name === 'instant') {
      return value ? 'بله' : 'خیر'
    } else if (name === 'verified') {
      return value ? 'بله' : 'خیر'
    } else if (name === 'ladderable') {
      return value ? 'بله' : 'خیر'
    } else if (name === 'transferable') {
      return value ? 'بله' : 'خیر'
    } else if (name === 'forBank') {
      return value ? 'بله' : 'خیر'
    } else if (name === 'forCourt') {
      return value ? 'بله' : 'خیر'
    } else if (name === 'paybackTime') {
      return value ? (value + ' سال') : 'توافقی'
    } else if (name === 'bank') {
      return (value || '')
    } else if (name === 'loanType' || name === 'loanTypes') {
      if (_.has(value, 'name')) return value.name;
      let items = [];
      _.forEach(value, (item) => {
        items.push(item.name)
      })
      return _.join(items, ', ')
    } else if (name === 'city') {
      if (!_.isNumber(value)) {
        //console.log({value})
        return _.get(value, 'name', value);
      }
      let list = _.get(store, 'state.city.data', []);
      let index = _.findIndex(list, {'id': value});
      let item = _.get(list, [index], {});
      //console.log({list, value})
      return _.get(item, 'name', '');
    } else if (name === 'guaranteeTypes' || name === 'guaranteeType') {
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
  dateFormat(val, inputFormat = 'jYYYY/jM/jD HH:mm:ss', outputFormat = 'jYY/jM/jD HH:mm') {
    if (!val) return '-';
    try {
      let m = moment(val, inputFormat)
      return (m.isValid()) ? m.format(outputFormat) : val;
    } catch (err) {
      //console.log(err, val)
      return val;
    }
  }
  ,
  priceFormat(price = null, instead = false) {
    price = price * 1 // convert to number;
    if (price > 0) return price.toLocaleString("fa-IR") + " ریال"
    return instead ? instead : "تعیین نشده"
  }
  ,
  isPremiumType(type, which = 'create') {
    let list = _.get(CONSTANTS, ['PREMIUMS', which], []);
    return list.includes(type);
  }
  ,
  getRawHeaders(type) {
    return _.get(CONSTANTS.rawHeaders, `${type}`, [{text: 'id'}]);
  }
  ,
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
  selectDataForSend(type, that, which = 'create', isAdmin = false) {
    let fields = _.map(CONSTANTS.fieldByType[type][which], 'name');
    //console.log('Fields:', {fields})
    let all = {};
    _.forEach(fields, (name) => {
      _.set(all, name, _.get(that, name, ''))
    })
    if (isAdmin) {
      _.set(all, 'description', _.get(that, 'description', ''))
    }
    return all;
  }
  ,
  getComputedFilter(obj, type = null) {
    let filter = {}, query = {};
    let maximum = {
      'maxAmountValue': true,
      'maxMaxAmountValue': true,
      'paybackTimeValue': true,
    };
    let minimum = {
      'minAmountValue': true,
      'minMaxAmountValue': true,
    };
    if (type === null) {
      // common filters
      filter = _.pick(obj, ['cityIdValue', 'instantValue', 'titleValue']);
      _.get(filter, 'instantValue', null) === 1 ? _.set(filter, 'instantValue', 'true') : _.set(filter, 'instantValue', '');
    } else if (type === 'loans') {
      filter = _.pick(obj, ['loanTypeIdValue', 'amountValue', 'maxAmountValue', 'minAmountValue', 'paybackTimeValue']);
    } else if (type === 'loanRequests') {
      filter = _.pick(obj, ['loanTypeIdValue', 'amountValue', 'maxAmountValue', 'minAmountValue', 'paybackTimeValue']);
    } else if (type === 'finances') {
      filter = _.pick(obj, ['maxMaxAmountValue', 'minMaxAmountValue']);
    } else if (type === 'financeRequests') {
      filter = _.pick(obj, ['jobValue', 'maxMaxAmountValue', 'minMaxAmountValue']);
    } else if (type === 'coSigners') {
      filter = _.pick(obj, ['guaranteeTypeValue']);
    } else if (type === 'coSignerRequests') {
      filter = _.pick(obj, ['guaranteeTypes', 'typeValue']);
    }
    let prefix = '';
    _.forEach(filter, (val, key) => {
      if (val !== null || _.isNumber(val)) {
        prefix = _.has(maximum, key) ? '<' : (_.has(minimum, key) ? '>' : '');
        key = key.replace('maxAmount', 'amount').replace('minAmount', 'amount').replace('minMaxAmount', 'maxAmount').replace('maxMaxAmount', 'maxAmount')
        _.set(query, key.replace('Value', '') + prefix, val)
      }
    })
    //console.log({obj, filter, query});
    return query;
  }

}

export default Helper
