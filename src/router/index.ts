import { createRouter, createWebHistory } from "vue-router";
import BackpackView from "../views/BackpackView.vue";
import NexusView from "../views/NexusView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: BackpackView,
  },
  {
    path: "/nexus",
    name: "nexus",
    component: NexusView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
	linkExactActiveClass: "active",
});

export default router;
