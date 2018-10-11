export const state = () => ({
  data: null,
  adverts: {
    count: 10
  }
});

export const mutations = {
  setData(state, data) {
    state.data = data
  }
};

