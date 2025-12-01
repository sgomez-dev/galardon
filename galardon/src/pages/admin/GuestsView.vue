<template>
  <div class="admin-page">
    <div class="page-header">
      <div>
        <h1 class="page-title">Invitados</h1>
        <p class="page-subtitle">Gestión de invitados y confirmaciones</p>
      </div>
      <Button variant="primary" @click="showAddGuest = true">
        + Agregar Invitado
      </Button>
    </div>

    <div class="page-content">
      <GuestTable />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import GuestTable from "@/components/admin/GuestTable.vue";
import Button from "@/components/ui/Button.vue";

const showAddGuest = ref(false);
</script>

<style scoped>
.admin-page {
  padding: 2rem;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  background: var(--white-pure);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid var(--admin-border);
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
}
</style>
