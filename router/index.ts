import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Index from "../pages/index.vue";
import Dashboard from "../pages/dashboard.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: Index,
  },
  {
    name: "dashboard",
    path: "/dashboard",
    component: Dashboard,
  },
  // {
  //   path: '/404',
  //   component: Page404Layout,
  //   children: [
  //     {
  //       name: 'not-found-advanced',
  //       path: 'not-found-advanced',
  //       component: () => import('../pages/404-pages/VaPageNotFoundSearch.vue'),
  //     },
  //     {
  //       name: 'not-found-simple',
  //       path: 'not-found-simple',
  //       component: () => import('../pages/404-pages/VaPageNotFoundSimple.vue'),
  //     },
  //     {
  //       name: 'not-found-custom',
  //       path: 'not-found-custom',
  //       component: () => import('../pages/404-pages/VaPageNotFoundCustom.vue'),
  //     },
  //     {
  //       name: 'not-found-large-text',
  //       path: '/pages/not-found-large-text',
  //       component: () => import('../pages/404-pages/VaPageNotFoundLargeText.vue'),
  //     },
  //   ],
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
