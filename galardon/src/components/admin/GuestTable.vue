<template>
  <div class="overflow-x-auto bg-white shadow rounded-lg p-4">
    <table class="w-full table-auto border-collapse">
      <thead>
        <tr class="bg-gray-200">
          <th class="px-4 py-2">Nombre</th>
          <th class="px-4 py-2">Asistencia</th>
          <th class="px-4 py-2">Acompañantes</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="guest in guests" :key="guest.id" class="border-b">
          <td class="px-4 py-2">{{ guest.name }}</td>
          <td class="px-4 py-2">
            <span
              v-if="guest.isGoing === true"
              class="text-green-600 font-semibold"
              >Sí</span
            >
            <span
              v-else-if="guest.isGoing === false"
              class="text-red-600 font-semibold"
              >No</span
            >
            <span v-else class="text-gray-500">Pendiente</span>
          </td>
          <td class="px-4 py-2">{{ guest.companions?.length || 0 }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Guest } from "@/types/guest.type";
import { getAllGuests } from "@/services/guests.service";

const guests = ref<Guest[]>([]);

onMounted(async () => {
  guests.value = await getAllGuests();
});
</script>
