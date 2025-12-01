<template>
  <div class="admin-page">
    <div class="page-header">
      <h1 class="page-title">Dashboard</h1>
      <p class="page-subtitle">Vista general del evento</p>
    </div>

    <div class="page-content">
      <StatsView />
    </div>
  </div>
</template>

<script setup lang="ts">
import StatsView from "./StatsView.vue";
</script>

<style scoped>
.admin-page {
  padding: 2rem;
}

.page-header {
  margin-bottom: 2rem;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.page-subtitle {
  font-size: 1rem;
  color: var(--text-secondary);
}

.page-content {
  /* El contenido ocupará el espacio disponible */
}
</style>
