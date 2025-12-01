<template>
  <div class="relative w-full">
    <input
      type="text"
      v-model="inputValue"
      @input="onInput"
      :placeholder="placeholder"
      class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
    <ul
      v-if="suggestionsFiltered.length > 0"
      class="absolute bg-white border rounded mt-1 w-full max-h-40 overflow-auto z-10 shadow"
    >
      <li
        v-for="(s, idx) in suggestionsFiltered"
        :key="idx"
        @click="selectSuggestion(s)"
        class="px-3 py-1 hover:bg-gray-200 cursor-pointer"
      >
        {{ s }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";

interface Props {
  modelValue: string;
  suggestions: string[];
  placeholder?: string;
}

const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);

const inputValue = ref(props.modelValue);

watch(inputValue, (val) => emit("update:modelValue", val));

const suggestionsFiltered = computed(() => {
  if (!inputValue.value) return props.suggestions;
  const query = inputValue.value.toLowerCase();
  return props.suggestions.filter((s) => s.toLowerCase().includes(query));
});

const selectSuggestion = (value: string) => {
  inputValue.value = value;
};
</script>

<style scoped></style>
