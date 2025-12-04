<template>
  <div class="companion-field">
    <Autocomplete
      v-model="companion.name"
      :suggestions="filteredSuggestions"
      placeholder="Nombre del acompañante"
    />
    <button
      type="button"
      @click="$emit('remove')"
      class="remove-btn"
      title="Eliminar acompañante"
    >
      <span class="icon">×</span>
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

<style scoped>
.companion-field {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  padding: 0.75rem;
  background: var(--white-pure);
  border: 2px solid var(--border-light);
  border-radius: 12px;
  transition: all 0.2s ease;
}

.companion-field:hover {
  border-color: var(--gold-primary);
  box-shadow: 0 2px 8px rgba(184, 134, 11, 0.1);
}

.companion-field:focus-within {
  border-color: var(--gold-primary);
  box-shadow: 0 0 0 3px rgba(184, 134, 11, 0.1);
}

.remove-btn {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--error-bg);
  color: var(--error);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 600;
}

.remove-btn:hover {
  background: var(--error);
  color: var(--white-pure);
  transform: scale(1.1);
}

.remove-btn .icon {
  font-size: 1.5rem;
  line-height: 1;
}
</style>
