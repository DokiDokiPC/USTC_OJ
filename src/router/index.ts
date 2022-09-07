import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "index",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AppIndex.vue"),
      children: [
        {
          path: "/",
          name: "home",
          component: () => import("../components/home/AppHome.vue"),
        },
        {
          path: "/problem",
          name: "problem",
          component: () => import("../components/problem/ProblemList.vue"),
        },
        {
          path: "/add-problem",
          name: "add-problem",
          component: () => import("../components/problem/AddProblem.vue"),
        },
        {
          // (\\d+)只匹配数字
          path: "/problem/:id(\\d+)",
          name: "problem-detail",
          component: () => import("../components/problem/ProblemDetail.vue"),
        },
        {
          path: "/user",
          name: "user",
          component: () => import("../components/user/UserList.vue"),
        },
        {
          path: "/user/:username",
          name: "user-detail",
          component: () => import("../components/user/UserDetail.vue"),
        },
        {
          path: "/status",
          name: "status",
          component: () => import("../components/status/StatusList.vue"),
        },
        {
          // (\\d+)只匹配数字
          path: "/status/:id(\\d+)",
          name: "status-detail",
          component: () => import("../components/status/StatusDetail.vue"),
        },
        {
          path: "/contest",
          name: "contest",
          component: () => import("../components/contest/ContestList.vue"),
        },
        {
          path: "/add-contest",
          name: "add-contest",
          component: () => import("../components/contest/AddContest.vue"),
        },
        {
          // (\\d+)只匹配数字
          path: "/contest/:id(\\d+)",
          name: "contest-detail",
          component: () => import("../components/contest/ContestDetail.vue"),
        },
      ],
    },
    {
      // (.*)匹配所有
      path: "/:catchAll(.*)",
      name: "PageNotFound",
      component: () => import("../views/PageNotFound.vue"),
    },
  ],
});

export default router;
