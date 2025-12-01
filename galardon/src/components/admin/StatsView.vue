<template>
  <div class="grid grid-cols-3 gap-4">
    <StatsCard title="Confirmados" :value="confirmed" />
    <StatsCard title="No confirmados" :value="notConfirmed" />
    <StatsCard title="Total invitados" :value="total" />
  </div>
</template>

<script setup lang="ts">
import StatsCard from "./StatsCard.vue";
import { ref, onMounted } from "vue";
import { getAllGuests } from "@/services/guests.service";

const confirmed = ref(0);
const notConfirmed = ref(0);
const total = ref(0);

onMounted(async () => {
  const guests = await getAllGuests();
  total.value = guests.length;
  confirmed.value = guests.filter((g) => g.isGoing === true).length;
  notConfirmed.value = guests.filter((g) => g.isGoing === false).length;
});
</script>
