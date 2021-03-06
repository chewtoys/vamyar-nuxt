export const state = () => ({
  data: null,
  arrayList: null
});

export const mutations = {
  setData(state, data) {
    state.data = data
  },
  setArrayList(state, data) {
    state.arrayList = data
  },
  setAndProcessData(state, data) {
    let all = _.map(data, function (owner) {
      return _.pick(owner, ['title', 'id'])
    });
    state.arrayList = _.map(all, 'title');
    state.data = all
  }
};

