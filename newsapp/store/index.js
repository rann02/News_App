import axios from 'axios'

export const state = () => ({
  news: [],
  article: null,
})

export const getters = {
  // getCounter(state) {
  //   return state.counter
  // },
}

export const mutations = {
  GET_NEWS(state, news) {
    news.forEach((article) => {
      state.news.push(article)
    })
  },
  GET_ARTICLE(state, article) {
    state.article = article
  },
}

export const actions = {
  async getNews({ commit }) {
    try {
      const { data } = await axios.get('http://localhost:3001/api/games?page=4')
      commit('GET_NEWS', data)
    } catch (error) {
      console.log(error)
    }
  },
  async getArticle({ commit }, param) {
    try {
      console.log('masuk')
      const { data } = await axios.get(
        `http://localhost:3001/api/detail/${param}`
      )
      commit('GET_ARTICLE', data.results)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  },
}
