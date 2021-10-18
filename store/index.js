export const state = () => ({
  data: [],
  filters: [],
  detail: {}
})

export const mutations = {
  setToArray(state, payload) {
    state.data = payload
  },
  mutateData(state, payload) {
    state.data = [...state.data, payload]
  },
  mutateModel(state, payload) {
    const [model] = state.data.filter((v) => v.id === payload)
    if (model) {
      const newModel = Object.assign({}, model)
      newModel.completed = true
      state.data = state.data.filter((v) => v.id !== payload)
      state.data.push(newModel)
    }
  },
  deleteData(state, payload) {
    state.data = state.data.filter((v) => v.id !== payload)
  },
  setDetail(state, payload) {
    state.detail = payload
  },
  searchByTitle(state, payload) {
    state.filters = state.data.filter(({title}) => {
      const filter = payload.toUpperCase()
      return (title.toUpperCase().includes(filter))
    })
  }
}

export const getters = {
  getData: (state) => (key) => {
    return state[key]
  },
}

export const actions = {
  async getDataByApi({ commit }) {
    try {
      const { data } = await this.$axios.get('todos')
      commit('setToArray', data)
    } catch (error) {
      console.error(error)
    }
  },
  async getDetailDataByApi({ commit }, id) {
    try {
      const { data } = await this.$axios.get(`todos/${id}`)
      commit('setDetail', data)
    } catch (error) {
      console.error(error)
    }
  },
  async saveDataToApi({ commit }, payload) {
    try {
      const { data } = await this.$axios.post('todos', payload)
      commit('mutateData', data)
    } catch (error) {
      console.error(error)
    }
  },
  async deleteDataFromApi({ commit }, id) {
    try {
      await this.$axios.delete(`todos/${id}`)
      commit('deleteData', id)
    } catch (error) {
      console.error(error)
    }
  },
  async updateModelDataFromApi({ commit }, { payload, id }) {
    try {
      const { data } = await this.$axios.put(`todos/${id}`, payload)
      if (data) {
        commit('mutateData', payload)
      }
    } catch (error) {
      console.error(error)
    }
  },
  async updateCompleteDataToApi({ commit }, id) {
    try {
      const { data } = await this.$axios.patch(`todos/${id}`)
      if (data) {
        commit('mutateModel', id)
      }
    } catch (error) {
      console.error(error)
    }
  },
}
