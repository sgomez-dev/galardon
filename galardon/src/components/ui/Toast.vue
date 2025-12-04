<template>
  <teleport to="body">
    <transition name="toast">
      <div v-if="show" :class="['toast', `toast-${type}`]">
        <span class="toast-icon">{{ icon }}</span>
        <span class="toast-message">{{ message }}</span>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

interface Props {
  message: string;
  type?: "success" | "error" | "warning" | "info";
  duration?: number;
}

const props = withDefaults(defineProps<Props>(), {
  type: "info",
  duration: 3000,
});

const show = ref(true);

const icon = {
  success: "✓",
  error: "✗",
  warning: "⚠",
  info: "ℹ",
}[props.type];

watch(
  () => props.message,
  () => {
    show.value = true;
    setTimeout(() => {
      show.value = false;
    }, props.duration);
  },
  { immediate: true }
);
</script>

<style scoped>
.toast {
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 9999;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  font-weight: 600;
  min-width: 300px;
  max-width: 500px;
  animation: slideIn 0.3s ease-out;
}

.toast-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.toast-message {
  flex: 1;
  font-size: 0.9375rem;
}

.toast-success {
  background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
  color: #065f46;
  border: 2px solid #6ee7b7;
}

.toast-error {
  background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
  color: #991b1b;
  border: 2px solid #fca5a5;
}

.toast-warning {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  color: #92400e;
  border: 2px solid #fcd34d;
}

.toast-info {
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
  color: #1e40af;
  border: 2px solid #93c5fd;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateY(-1rem);
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@media (max-width: 640px) {
  .toast {
    top: 1rem;
    right: 1rem;
    left: 1rem;
    min-width: auto;
  }
}
</style>
