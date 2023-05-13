import axios from 'axios'

export const state = () => ({
  news: [],
  article: null,
  keyBefore: '',
})

export const getters = {}

export const mutations = {
  GET_NEWS(state, news) {
    news.forEach((article) => {
      state.news.push(article)
    })
  },
  GET_ARTICLE(state, article) {
    state.article = article
  },
  EDIT_ARTICLE(state, article) {
    const faund = state.news.find((el) => el.key == article.key)
    faund.title = article.title
    faund.thumb = article.image
    state.article.title = article.title
    state.article.content = [article.image]
    state.article.content.push(article.text)
    state.keyBefore = article.key
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
      const { data } = await axios.get(
        `http://localhost:3001/api/detail/${param}`
      )
      commit('GET_ARTICLE', data.results)
    } catch (error) {
      console.log(error)
    }
  },
}
