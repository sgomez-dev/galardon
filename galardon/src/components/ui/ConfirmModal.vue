<template>
  <teleport to="body">
    <transition name="modal-fade">
      <div v-if="show" class="confirm-modal-overlay" @click="handleCancel">
        <div class="confirm-modal" @click.stop>
          <div class="confirm-icon">{{ icon }}</div>
          <h3 class="confirm-title">{{ title }}</h3>
          <p class="confirm-message">{{ message }}</p>
          <div class="confirm-actions">
            <button @click="handleCancel" class="confirm-btn cancel-btn">
              {{ cancelText }}
            </button>
            <button @click="handleConfirm" class="confirm-btn confirm-btn">
              {{ confirmText }}
            </button>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
interface Props {
  show: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  icon?: string;
}

const props = withDefaults(defineProps<Props>(), {
  title: "Confirmar acción",
  confirmText: "Confirmar",
  cancelText: "Cancelar",
  icon: "⚠️",
});

const emit = defineEmits<{
  confirm: [];
  cancel: [];
  "update:show": [value: boolean];
}>();

const handleConfirm = () => {
  emit("confirm");
  emit("update:show", false);
};

const handleCancel = () => {
  emit("cancel");
  emit("update:show", false);
};
</script>

<style scoped>
.confirm-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 1rem;
}

.confirm-modal {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  max-width: 450px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  text-align: center;
}

.confirm-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.confirm-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.75rem;
}

.confirm-message {
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 2rem;
  white-space: pre-line;
}

.confirm-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.confirm-btn {
  flex: 1;
  padding: 0.875rem 1.5rem;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.cancel-btn {
  background: #f1f5f9;
  color: #475569;
  border: 2px solid #e2e8f0;
}

.cancel-btn:hover {
  background: #e2e8f0;
  transform: translateY(-2px);
}

.confirm-btn.confirm-btn:nth-child(2) {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
  border: 2px solid #dc2626;
}

.confirm-btn.confirm-btn:nth-child(2):hover {
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.4);
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-active .confirm-modal,
.modal-fade-leave-active .confirm-modal {
  transition: transform 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-from .confirm-modal {
  transform: scale(0.9) translateY(-20px);
}

.modal-fade-leave-to .confirm-modal {
  transform: scale(0.95);
}

@media (max-width: 640px) {
  .confirm-actions {
    flex-direction: column-reverse;
  }
}
</style>
