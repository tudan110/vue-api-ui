import Vue from 'vue'
import App from './App.vue'
import VueApiUi from '../packages'

Vue.use(VueApiUi)
// 在 App.vue 中引用，并启动项目查看

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')
