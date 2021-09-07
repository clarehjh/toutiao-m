/**
 * 封装 axios 请求模块
 */
import axios from "axios";
// 在非组件模块中获取 store 必须通过这种方式
// 这里单独加载 store，和在组件中 this.$store 一个东西
import store from "@/store/";
import jsonBig from "json-bigint";
import { Toast } from "vant";
import router from "@/router/";

// import router from "@/router/";

const refreshTokenReq = axios.create({
  baseURL: "http://ttapi.research.itcast.cn/"
});
const request = axios.create({
  baseURL: "http://ttapi.research.itcast.cn/", // 基础路径

  // transformResponse 允许自定义原始的响应数据（字符串）
  transformResponse: [
    function(data) {
      try {
        // 如果转换成功则返回转换的数据结果
        return jsonBig.parse(data);
      } catch (err) {
        // 如果转换失败，则包装为统一数据格式并返回
        return {
          data
        };
      }
    }
  ]
});
// Add a request interceptor请求拦截器
request.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    const { user } = store.state;
    //  如果用户已登录，统一给接口设置token信息
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor响应拦截器
axios.interceptors.response.use(
  function(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async function(error) {
    // 请求响应失败进入这里
    // 超过 2xx 的状态码都会进入这里

    const status = error.response.status;
    if (status === 400) {
      // 客户端请求参数错误
      Toast.fail("客户端请求参数异常");
    } else if (status === 401) {
      // token 无效
      // 如果没有 user 或者 user.token，直接去登录
      const { user } = store.state;
      if (!user || !user.token) {
        // 直接跳转到登录页
        return redirectLogin();
      }

      // 使用 refresh_token 请求获取新的 token
      try {
        const { data } = await refreshTokenReq({
          method: "PUT",
          url: "/app/v1_0/authorizations",
          headers: {
            Authorization: `Bearer ${user.refresh_token}`
          }
        });

        // 拿到新的 token 之后把它更新到容器中
        user.token = data.data.token;
        store.commit("setUser", user);

        // 把失败的请求重新发出去
        // error.config 是本次请求的相关配置信息对象
        // 这里使用 request 发请求，它会走自己的拦截器
        // 它的请求拦截器中通过 store 容器访问 token 数据
        return request(error.config);
      } catch (err) {
        // 刷新 token 都失败了，直接跳转登录页
        redirectLogin();
      }
    } else if (status === 403) {
      // 没有权限操作
      Toast.fail("没有权限操作");
    } else if (status >= 500) {
      // 服务端异常
      Toast.fail("服务端异常，请稍后重试");
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
function redirectLogin() {
  router.replace({
    name: "login",
    // 传递查询参数，查询参数会以 ？ 作为分隔符放到 url 后面
    query: {
      // 数据名是自己起的
      // router.currentRoute 和我们在组件中获取的 this.$route 是一个东西
      redirect: router.currentRoute.fullPath
    }
  });
}

export default request;
