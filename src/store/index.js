import Vue from "vue";
import Vuex from "vuex";
import { getItem, setItem } from "@/utils/storage.js";
Vue.use(Vuex);
const USER_KEY = "toutiao-user";

export default new Vuex.Store({
  state: {
    user: getItem(USER_KEY) // 当前登录用户的登录状态（token等数据）
  },
  mutations: {
    setUser: function(state, data) {
      state.user = data;

      // 为了防止页面刷新数据丢失，我们还需要把数据放到本地存储中，这里仅仅是为了持久化数据
      setItem(USER_KEY, state.user);
      // window.localStorage.setItem('user', JSON.stringify(state.user))
    }
  },
  actions: {},
  modules: {}
});
