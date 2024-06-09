import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/SiteHome.vue";
import BackpackView from "../views/BackpackView.vue";
import NexusView from "../views/NexusView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/backpack",
    name: "backpack",
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
