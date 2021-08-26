import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import Vant from "vant";
import "vant/lib/index.css";

import "./styles/index.less";

// 自动设置 REM 基准值（html 标签字体大小）

import "amfe-flexible";

import "./utils/dayjs";

Vue.use(Vant);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
