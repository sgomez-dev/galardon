<template>
  <div class="flex items-center gap-2 mb-2">
    <Autocomplete
      v-model="companion.name"
      :suggestions="filteredSuggestions"
      placeholder="Nombre del acompañante"
    />
    <button @click="$emit('remove')" class="text-red-500 hover:text-red-700">
      Eliminar
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import Autocomplete from "@/components/ui/Autocomplete.vue";
import type { Companion } from "@/types/companion";

interface Props {
  companion: Companion;
  allNames: string[];
}

const props = defineProps<Props>();
const emit = defineEmits(["remove"]);

const filteredSuggestions = computed(() => {
  if (!props.companion.name) return props.allNames;
  const query = props.companion.name.toLowerCase();
  return props.allNames.filter((n) => n.toLowerCase().includes(query));
});
</script>

<style scoped></style>
