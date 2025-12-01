<template>
  <div class="card" :class="variantClass">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  variant?: "default" | "gold" | "admin";
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
});

const variantClass = computed(() => {
  switch (props.variant) {
    case "gold":
      return "card-gold";
    case "admin":
      return "card-admin";
    default:
      return "card-default";
  }
});
</script>

<style scoped>
.card {
  padding: 2rem;
  border-radius: 12px;
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-normal);
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.card-default {
  background: var(--white-pure);
  border: 1px solid var(--admin-border);
}

.card-gold {
  background: linear-gradient(135deg, var(--white-pure) 0%, var(--ivory) 100%);
  border: 2px solid var(--gold-light);
  box-shadow: var(--shadow-gold);
}

.card-admin {
  background: var(--white-pure);
  border: 1px solid var(--admin-border);
}
</style>
