import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login")
  },
  {
    path: "/",
    component: () => import("@/views/layout"),
    children: [
      {
        path: "",
        name: "home",
        component: () => import("@/views/home")
      },
      {
        path: "/qa",
        name: "qa",
        component: () => import("@/views/qa")
      },
      {
        path: "/video",
        name: "video",
        component: () => import("@/views/video")
      },
      {
        path: "/my",
        name: "my",
        component: () => import("@/views/my")
      }
    ]
  },
  {
    path: "/search",
    name: "search",
    component: () => import("@/views/search")
  },
  {
    path: "/article/:articleId",
    name: "article",
    component: () => import("@/views/article"),
    // 将动态路由参数映射到组件的 props 中，无论是访问还是维护性都很方便
    // 参考文档：https://router.vuejs.org/zh/guide/essentials/passing-props.html
    props: true
  },
  // {
  //   path: "/user/profile",
  //   name: "user-profile",
  //   component: () => import("@/views/user-profile"),
  //   meta: { requiresAuth: false }
  // },
  {
    path: "/user/chat",
    name: "user-chat",
    component: () => import("@/views/user-chat"),
    meta: { requiresAuth: true }
  }
];

const router = new VueRouter({
  routes
});

export default router;
