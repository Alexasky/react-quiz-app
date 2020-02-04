import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import store from './store'
import * as fb from 'firebase'
import BuyModalComponent from '@/components/Shared/BuyModal'

Vue.config.productionTip = false
Vue.component('app-buy-modal', BuyModalComponent)

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
  created () {
    const firebaseConfig = {
      apiKey: "AIzaSyBGIGHjLAlEwVB10Sk0GV-Lzz0qv7A0btk",
      authDomain: "ads-app-d413d.firebaseapp.com",
      databaseURL: "https://ads-app-d413d.firebaseio.com",
      projectId: "ads-app-d413d",
      storageBucket: "ads-app-d413d.appspot.com",
      messagingSenderId: "214449110044",
      appId: "1:214449110044:web:3dfef2769c5e8968d073d9"
    }

    fb.initializeApp(firebaseConfig);

    fb.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    })

    this.$store.dispatch('fetchAds')



  }
}).$mount('#app')
