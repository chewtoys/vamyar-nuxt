export const state = () => ({
  data: [],
  unseen: []
});

export const mutations = {
  setData(state, data) {
    state.data = data
  },
  setUnseen(state, data) {
    state.unseen = data
  },
};

