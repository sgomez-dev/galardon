<template>
  <div class="stats-grid">
    <StatsCard title="Total Invitados" :value="total" icon="👥" />
    <StatsCard title="Confirmados" :value="confirmed" icon="✅" />
    <StatsCard title="No Confirmados" :value="notConfirmed" icon="❌" />
    <StatsCard title="Pendientes" :value="pending" icon="⏳" />
  </div>
</template>

<script setup lang="ts">
import StatsCard from "@/components/admin/StatsCard.vue";
import { ref, onMounted } from "vue";
import { getAllGuests } from "@/services/guests.service";

const confirmed = ref(0);
const notConfirmed = ref(0);
const pending = ref(0);
const total = ref(0);

onMounted(async () => {
  const guests = await getAllGuests();
  total.value = guests.length;
  confirmed.value = guests.filter((g) => g.isGoing === true).length;
  notConfirmed.value = guests.filter((g) => g.isGoing === false).length;
  pending.value = guests.filter((g) => g.isGoing === null).length;
});
</script>

<style scoped>
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
