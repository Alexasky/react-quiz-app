import * as fb from 'firebase'

class Ad {
  constructor (title, description, ownerId, imageSrc = '', promo = false, id = null) {
    this.title = title,
    this.description = description,
    this.ownerId = ownerId,
    this.imageSrc = imageSrc,
    this.promo = promo,
    this.id = id
  }
}

export default {
  state: {
    ads: []
  },
  mutations: {
    createAd (state, payload) {
      state.ads.push(payload)
    },
    updateAd (state, {title, description, id}) {
      const ad = state.ads.find(a => {
        return a.id === id
      })
      ad.title = title
      ad.description = description
    },
    loadAds (state, payload) {
      state.ads = payload
    }
  },
  actions: {
    async createAd ({commit, getters}, payload) {
      // payload.id = Math.random()
      commit('clearError')
      commit('setLoading', true)

      const image = payload.image

      try {
        const newAd = new Ad (
          payload.title,
          payload.description,
          getters.user.id,
          '',
          payload.promo
        )
        // add new ad in the auto created database field 'ads'
        //create new fields in database
        const ad = await fb.database().ref('ads').push(newAd)
        const imageExt = image.name.slice(image.name.lastIndexOf('.'))
        //put in storage firebase ad image
        const fileData = await fb.storage().ref(`ads/${ad.key}${imageExt}`).put(image)

        //fetch image url from database
        const imageSrc = await fileData.ref.getDownloadURL()

        //update imageSrc field in database of firebase, method 'update'
        //method child for access to child of 'ads'
        await fb.database().ref('ads').child(ad.key).update({
          imageSrc
        })

        commit('setLoading', false)
        // for id pass key from firebase new created object
        commit('createAd', {
          ...newAd,
          id: ad.key,
          imageSrc
        })
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }

    },
    async fetchAds ({commit}) {
      commit('clearError')
      commit('setLoading', true)

      const resultAds = []

      try {
        // fetch dirty data from firebase
        const fbVal = await fb.database().ref('ads').once('value')
        // fetch clear data this all fields
        const ads = fbVal.val()
        Object.keys(ads).forEach(key => {
          const ad = ads[key]
          resultAds.push(
            new Ad (
              ad.title,
              ad.description,
              ad.ownerId,
              ad.imageSrc,
              ad.promo,
              key
            )
          )
        })
        commit('loadAds', resultAds)
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    },
    async updateAd ({commit}, {title, description, id}){
      commit('clearError')
      commit('setLoading', true)
      try {
        await fb.database().ref('ads').child(id).update({
          title,
          description
        })
        commit('updateAd', {
          title,
          description,
          id
        })
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
      }
    }
  },
  getters: {
    ads (state) {
      return state.ads
    },
    promoAds (state) {
      return state.ads.filter(ad => ad.promo)
    },
    myAds (state, getters) {
      return state.ads.filter(ad => {
        return ad.ownerId === getters.user.id
      })
    },
    adById (state) {
      return adId => {
        return state.ads.find(ad => ad.id.toString() === adId)
      }
    }
  },
}
