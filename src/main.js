import Vue from 'vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from './utils/communication.js'



Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$axios = axios;
//require('./mock')

import App from './App.vue'
new Vue({
	router,
	render: h => h(App),
	axios,
}).$mount('#app')
