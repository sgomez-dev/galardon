<template>
  <div class="stats-card">
    <div class="stats-header">
      <span class="stats-icon" v-if="icon">{{ icon }}</span>
      <p class="stats-title">{{ title }}</p>
    </div>
    <p class="stats-value">{{ value }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  value: number | string;
  icon?: string;
}

defineProps<Props>();
</script>

<style scoped>
.stats-card {
  background: var(--white-pure);
  border-radius: 12px;
  padding: 1.75rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid var(--admin-border);
  transition: all var(--transition-fast);
}

.stats-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}

.stats-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.stats-icon {
  font-size: 1.5rem;
}

.stats-title {
  font-size: 0.95rem;
  color: var(--text-secondary);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stats-value {
  font-size: 2.25rem;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1;
}
</style>
