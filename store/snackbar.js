export const state = () => ({
  snack: "",
  color: "info"
})

export const mutations = {
  setSnack(state, snack, color = "info") {
    state.snack = snack
    state.color = color
  }
}
