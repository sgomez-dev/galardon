<template>
  <div class="autocomplete-wrapper">
    <input
      type="text"
      v-model="inputValue"
      @input="onInput"
      @focus="showSuggestions = true"
      @blur="handleBlur"
      :placeholder="placeholder"
      class="autocomplete-input"
    />
    <ul
      v-if="showSuggestions && suggestionsFiltered.length > 0"
      class="suggestions-list"
    >
      <li
        v-for="(s, idx) in suggestionsFiltered"
        :key="idx"
        @mousedown.prevent="selectSuggestion(s)"
        class="suggestion-item"
      >
        <span class="suggestion-icon">👤</span>
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
const showSuggestions = ref(false);

watch(inputValue, (val) => emit("update:modelValue", val));

watch(
  () => props.modelValue,
  (val) => {
    inputValue.value = val;
  }
);

const onInput = () => {
  showSuggestions.value = true;
};

const handleBlur = () => {
  setTimeout(() => {
    showSuggestions.value = false;
  }, 200);
};

const suggestionsFiltered = computed(() => {
  if (!inputValue.value) return props.suggestions;
  const query = inputValue.value.toLowerCase();
  return props.suggestions.filter((s) => s.toLowerCase().includes(query));
});

const selectSuggestion = (value: string) => {
  inputValue.value = value;
  showSuggestions.value = false;
};
</script>

<style scoped>
.autocomplete-wrapper {
  position: relative;
  width: 100%;
  flex: 1;
}

.autocomplete-input {
  width: 100%;
  padding: 0.625rem 0.875rem;
  font-size: 0.9375rem;
  color: var(--text-primary);
  background: var(--white-pure);
  border: none;
  border-radius: 8px;
  outline: none;
  transition: all 0.2s ease;
}

.autocomplete-input::placeholder {
  color: var(--text-tertiary);
}

.autocomplete-input:focus {
  background: var(--surface);
}

.suggestions-list {
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  right: 0;
  max-height: 200px;
  overflow-y: auto;
  background: var(--white-pure);
  border: 2px solid var(--gold-primary);
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  z-index: 1000;
  padding: 0.5rem;
}

.suggestion-item {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.75rem 0.875rem;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.15s ease;
  color: var(--text-primary);
  font-size: 0.9375rem;
}

.suggestion-item:hover {
  background: linear-gradient(
    135deg,
    var(--gold-light) 0%,
    rgba(184, 134, 11, 0.15) 100%
  );
  color: var(--gold-dark);
  transform: translateX(4px);
}

.suggestion-icon {
  font-size: 1.125rem;
}

.suggestions-list::-webkit-scrollbar {
  width: 6px;
}

.suggestions-list::-webkit-scrollbar-track {
  background: var(--surface);
  border-radius: 3px;
}

.suggestions-list::-webkit-scrollbar-thumb {
  background: var(--gold-primary);
  border-radius: 3px;
}

.suggestions-list::-webkit-scrollbar-thumb:hover {
  background: var(--gold-dark);
}
</style>
