<template>
  <button
    :type="type"
    :class="['btn', variantClass, sizeClass]"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  variant?: "primary" | "secondary" | "danger" | "gold";
  size?: "sm" | "md" | "lg";
  type?: "button" | "submit" | "reset";
}

const props = withDefaults(defineProps<Props>(), {
  variant: "gold",
  size: "md",
  type: "button",
});

const variantClass = computed(() => {
  switch (props.variant) {
    case "secondary":
      return "btn-secondary";
    case "danger":
      return "btn-danger";
    case "primary":
      return "btn-primary";
    case "gold":
      return "btn-gold";
    default:
      return "btn-gold";
  }
});

const sizeClass = computed(() => {
  switch (props.size) {
    case "sm":
      return "btn-sm";
    case "lg":
      return "btn-lg";
    default:
      return "btn-md";
  }
});
</script>

<style scoped>
.btn {
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.btn:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.3);
}

/* Variants */
.btn-gold {
  background: linear-gradient(
    135deg,
    var(--gold-primary) 0%,
    var(--gold-dark) 100%
  );
  color: var(--white-pure);
  box-shadow: var(--shadow-sm);
}

.btn-gold:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.btn-primary {
  background: var(--admin-accent);
  color: var(--white-pure);
}

.btn-primary:hover {
  background: #2980b9;
}

.btn-secondary {
  background: var(--admin-bg);
  color: var(--text-primary);
  border: 2px solid var(--admin-border);
}

.btn-secondary:hover {
  background: #e8ebed;
}

.btn-danger {
  background: #e74c3c;
  color: var(--white-pure);
}

.btn-danger:hover {
  background: #c0392b;
}

/* Sizes */
.btn-sm {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.btn-md {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
}

.btn-lg {
  padding: 1rem 2rem;
  font-size: 1.125rem;
}

.btn:active {
  transform: translateY(0);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
}
</style>
