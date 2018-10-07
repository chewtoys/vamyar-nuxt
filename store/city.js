export const state = () => ({
  data: null,
});

export const mutations = {
  setData(state, data) {
    state.data = data
  }
};

export const actions = {
  async update({commit}) {
    let method = '/cities?number=1000';
    try {
      let {data} = await this.$axios.$get(method);
      //console.log('Fetched Data', data)
      commit('setData', data)
    } catch (error) {
      //console.log(error)
    }
  }
};
