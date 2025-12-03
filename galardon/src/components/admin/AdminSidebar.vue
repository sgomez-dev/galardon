<template>
  <aside class="admin-sidebar">
    <div class="sidebar-header">
      <h2 class="sidebar-title">🎓 Galardon</h2>
      <p class="sidebar-subtitle">Admin Panel</p>
    </div>

    <nav class="sidebar-nav">
      <button
        class="nav-item"
        :class="{ active: isActive('/admin') }"
        @click="router.push('/admin')"
      >
        <span class="nav-icon">🏠</span>
        <span class="nav-text">Dashboard</span>
      </button>

      <button
        class="nav-item"
        :class="{ active: isActive('/admin/guests') }"
        @click="router.push('/admin/guests')"
      >
        <span class="nav-icon">👥</span>
        <span class="nav-text">Invitados</span>
      </button>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import { computed } from "vue";

const router = useRouter();
const route = useRoute();

const isActive = (path: string) => {
  return computed(() => route.path === path);
};
</script>

<style scoped>
.admin-sidebar {
  width: 260px;
  min-height: 100vh;
  background: var(--admin-sidebar);
  color: var(--white-pure);
  padding: 2rem 0;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
}

.sidebar-header {
  padding: 0 1.5rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 1.5rem;
}

.sidebar-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.sidebar-subtitle {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 400;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0 1rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.875rem 1rem;
  background: transparent;
  border: none;
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: all var(--transition-fast);
  text-align: left;
  width: 100%;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.1);
  color: var(--white-pure);
  transform: translateX(4px);
}

.nav-item.active {
  background: rgba(52, 152, 219, 0.2);
  color: var(--white-pure);
  font-weight: 600;
  border-left: 3px solid var(--admin-accent);
}

.nav-icon {
  font-size: 1.25rem;
  min-width: 24px;
  text-align: center;
}

.nav-text {
  font-size: 1rem;
}

@media (max-width: 768px) {
  .admin-sidebar {
    width: 100%;
    min-height: auto;
    padding: 1rem 0;
  }

  .sidebar-nav {
    flex-direction: row;
    overflow-x: auto;
  }

  .nav-item {
    flex-direction: column;
    min-width: 80px;
    text-align: center;
  }
}
</style>
