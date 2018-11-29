export const state = () => ({
  data: null,

  news: {
    count: 1,
  },
  adverts: {
    tradeStatusList: ['باز', 'درحال معامله', 'بسته شده'],
    count: 99999,
    filters: {
      amountArray: [],
      amount: [
        {value: null, name: 'همه'},
        {value: 0, name: 'توافقی'},
        {value: 100000000, name: 'تا ۱۰ میلیون تومان'},
        {value: 200000000, name: 'تا ۲۰ میلیون تومان'},
        {value: 500000000, name: 'تا ۵۰ میلیون تومان'},
        {value: 1000000000, name: 'تا ۱۰۰ میلیون تومان'},
        {value: 50000000000, name: 'تا ۵۰۰ میلیون تومان'},
        {value: 50000000000000, name: 'بیتشر از ۵۰۰ میلیون تومان'},
      ]
    }
  },
  tickets: {
    count: 15,
    prioritiesArray: ['زیاد', 'متوسط', 'کم'],
    priorities: [
      {id: 0, name: 'زیاد'},
      {id: 1, name: 'متوسط'},
      {id: 2, name: 'کم'},
    ],
    ticketStatusArray: ['باز', 'پاسخ داده شده', 'بسته'],
    ticketStatus: [
      {id: 0, name: 'باز'},
      {id: 1, name: 'پاسخ داده شده'},
      {id: 2, name: 'بسته'},
    ],
  },
  coSigner: {
    typeArray: ['بانک', 'دادگاه'],
    types: [
      {id: 0, name: 'بانک'},
      {id: 1, name: 'دادگاه'},
    ],
  },
  finances: {}
});

export const mutations = {
  setData(state, data) {
    state.data = data
  },
  setAmountArray(state, data) {
    state.adverts.filters.amountArray = data
  },
  setAndProcessData(state, data) {
    let all = _.map(data, function (owner) {
      return _.pick(owner, ['key', 'value'])
    });
    let processed = {}
    _.forEach(all, function (obj, key) {
      processed[obj.key] = JSON.parse(obj.value);
    })
    state.data = processed
  }
};
