import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {store} from './store'
import firebase from 'firebase'

Vue.config.productionTip = false

const config = {
  apiKey: "AIzaSyCZ6eb8oM_FcGXJszIxAeiMrISYQAe50jc",
  authDomain: "vuefire-88345.firebaseapp.com",
  databaseURL: "https://vuefire-88345.firebaseio.com",
  projectId: "vuefire-88345",
  storageBucket: "vuefire-88345.appspot.com",
  messagingSenderId: "77144130978",
  appId: "1:77144130978:web:2f7b4755e2a825a58a9efb"
}

firebase.initializeApp(config)

export const db = firebase.firestore()

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
