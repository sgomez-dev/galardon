import { createRouter, createWebHistory } from "vue-router";
import InvitationView from "@/pages/InvitationView.vue";
import ConfirmedView from "@/pages/public/ConfirmedView.vue";
import DashboardView from "@/pages/admin/DashboardView.vue";
import GuestsView from "@/pages/admin/GuestsView.vue";
import LoginView from "@/pages/admin/LoginView.vue";

const routes = [
  { path: "/i/:slug", component: InvitationView },
  { path: "/i/:slug/ok", component: ConfirmedView },
  { path: "/admin/login", component: LoginView },
  { path: "/admin", component: DashboardView, meta: { requiresAuth: true } },
  {
    path: "/admin/guests",
    component: GuestsView,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = false;
  if (to.meta.requiresAuth && !isAuthenticated) next("/admin/login");
  else next();
});

export default router;
