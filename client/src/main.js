import Vue from "vue";
import { store } from './vuex/store';
import VueRouter from "vue-router";
import RouterPrefetch from 'vue-router-prefetch'
import App from "./App";
import router from "./router/index";
import BlackDashboard from "./plugins/blackDashboard";
import i18n from "./i18n"
import axios from 'axios'
import 'material-icons/iconfont/material-icons.css';
import './registerServiceWorker'
import Paginate from 'vuejs-paginate';

Vue.use(BlackDashboard);
Vue.use(VueRouter);
Vue.use(RouterPrefetch);
Vue.component('paginate', Paginate);
Vue.prototype.$axios = axios;
Vue.component('V-MaterialIcon', require('vue-materials-icon/MaterialIcon').default);

new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount("#app");
