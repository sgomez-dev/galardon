<template>
  <div>
    <p class="mb-2 font-medium">Acompañantes:</p>
    <div v-for="(c, index) in companions" :key="c.id">
      <CompanionField
        :companion="c"
        :all-names="allNames"
        @remove="removeCompanion(index)"
      />
    </div>
    <button
      v-if="companions.length < 5"
      @click="addCompanion"
      class="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      + Añadir acompañante
    </button>
    <p v-else class="text-gray-500 mt-2 text-sm">
      Has alcanzado el máximo de 5 acompañantes.
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CompanionField from "./CompanionField.vue";
import type { Companion } from "@/types/companion";

const props = defineProps<{ allNames: string[] }>();

const companions = ref<Companion[]>([]);

const addCompanion = () => {
  if (companions.value.length >= 5) return;
  companions.value.push({
    id: crypto.randomUUID(),
    name: "",
    isGoing: true,
    linkedTo: "",
    confirmedBy: "",
  });
};

const removeCompanion = (index: number) => {
  companions.value.splice(index, 1);
};

defineExpose({ companions });
</script>

<style scoped></style>
