import * as fb from 'firebase'

class User {
  constructor (id) {
    this.id = id
  }
}
export default {
  state: {
    user: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    async registerUser ({commit}, {email, password}) {
      // clear all errors that exist
      commit('clearError')
      // loader is active
      commit('setLoading', true)
      //create new user
      try {
        const user = await fb.auth().createUserWithEmailAndPassword(email, password)
        // uid user id
        //add new user
        console.log('1');

        commit('setUser', new User(user.uid))
        //loader is inactive
        commit('setLoading', false)

      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw(error)
      }
    },
    async loginUser ({commit, getters},{email,password}) {
      // clear all errors that exist
      commit('clearError')
      // loader is active
      commit('setLoading', true)
      //login in account
      try {
        const user = await fb.auth().signInWithEmailAndPassword(email, password)
        // uid user id
        //add new user
        if (getters.user.id === '') {
          commit('setUser', new User(user.uid))
        }
        //loader is inactive
        commit('setLoading', false)

      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw(error)
      }
    },
    autoLoginUser ({commit}, payload) {
      commit('setUser', new User(payload.uid))
    },
    logoutUser ({commit}) {
      fb.auth().signOut()
      commit('setUser', null)
    }
  },
  getters: {
    user (state) {
      console.log(state.user);

      return state.user
    },
    isUserLoggedIn (state) {
      return state.user !== null
    }
  }
}
