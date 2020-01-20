import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'
import './plugins/fontawesome'
import App from './App.vue'
import router from './router'
import store from './store'
import AppButton from './components/AppButton'

Vue.component('AppButton', AppButton)
Vue.use(VueCompositionApi)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
