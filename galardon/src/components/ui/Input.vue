<template>
  <input
    :type="type"
    :value="modelValue"
    :placeholder="placeholder"
    class="custom-input"
    @input="handleInput"
  />
</template>

<script setup lang="ts">
interface Props {
  modelValue: string;
  placeholder?: string;
  type?: string;
}

withDefaults(defineProps<Props>(), {
  type: "text",
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>

<style scoped>
.custom-input {
  width: 100%;
  padding: 0.875rem 1rem;
  border: 2px solid var(--admin-border);
  border-radius: 8px;
  font-size: 1rem;
  color: var(--text-primary);
  background: var(--white-pure);
  transition: all var(--transition-fast);
}

.custom-input::placeholder {
  color: var(--text-light);
}

.custom-input:focus {
  outline: none;
  border-color: var(--admin-accent);
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

.custom-input:hover {
  border-color: #c5cdd4;
}
</style>
