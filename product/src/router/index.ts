import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/shop",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    children: [
      {
        path: "",
        name: "product",
        component: () => import("../views/ProductView.vue"),
      },
      {
        path: ":id",
        name: "product-detail",
        component: () => import("../views/ProductDetailView.vue"),
      },
    ],
  },
  {
    path: "/category",
    children: [
      {
        path: ":categoryId",
        name: "category",
        component: () => import("../views/ProductView.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
