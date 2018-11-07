export const state = () => ({
  data: null,
  adverts: {
    count: 99999,
  },
  tickets: {
    count: 15,
    prioritiesArray: ['زیاد','متوسط','کم'],
    priorities: [
      {id: 0, name: 'زیاد'},
      {id: 1, name: 'متوسط'},
      {id: 2, name: 'کم'},
    ],
  }
});

export const mutations = {
  setData(state, data) {
    state.data = data
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
