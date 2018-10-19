export const state = () => ({
  data: null,
  adverts: {
    count: 10
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
