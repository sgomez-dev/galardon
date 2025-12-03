import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
  type NavigationGuardNext,
  type RouteLocationNormalized,
} from "vue-router";
import { auth } from "@/services/firebase";
import InvitationView from "@/pages/public/InvitationView.vue";
import ConfirmedView from "@/pages/public/ConfirmedView.vue";
import AdminLayout from "@/layouts/AdminLayout.vue";
import DashboardView from "@/pages/admin/DashboardView.vue";
import GuestsView from "@/pages/admin/GuestsView.vue";
import LoginView from "@/pages/admin/LoginView.vue";

const routes: RouteRecordRaw[] = [
  { path: "/i/:slug", component: InvitationView },
  { path: "/i/:slug/ok", component: ConfirmedView },
  { path: "/admin/login", component: LoginView },
  {
    path: "/admin",
    component: AdminLayout,
    meta: { requiresAuth: true },
    children: [
      { path: "", component: DashboardView },
      { path: "guests", component: GuestsView },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(
  (
    to: RouteLocationNormalized,
    _from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    const isAuthenticated = auth.currentUser !== null;
    if (to.meta.requiresAuth && !isAuthenticated) next("/admin/login");
    else next();
  }
);

export default router;
