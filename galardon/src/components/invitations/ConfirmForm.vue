<template>
  <form @submit.prevent="submitConfirmation" class="confirm-form">
    <div class="form-header">
      <h3 class="form-title">Hola, {{ guestName }} 🎉</h3>
      <p class="form-subtitle">Por favor confirma tu asistencia</p>
    </div>

    <div class="radio-group">
      <label class="radio-option" :class="{ active: isGoing === true }">
        <input type="radio" v-model="isGoing" :value="true" />
        <span class="radio-content">
          <span class="radio-icon">✔️</span>
          <span class="radio-text">Sí, asistiré</span>
        </span>
      </label>

      <label class="radio-option" :class="{ active: isGoing === false }">
        <input type="radio" v-model="isGoing" :value="false" />
        <span class="radio-content">
          <span class="radio-icon">❌</span>
          <span class="radio-text">No podré asistir</span>
        </span>
      </label>
    </div>

    <transition name="slide-fade">
      <div v-if="isGoing" class="companions-section">
        <CompanionList ref="companionList" :all-names="allNames" />
      </div>
    </transition>

    <button type="submit" class="submit-button" :disabled="isGoing === null">
      <span class="button-icon">📨</span>
      <span>Confirmar Asistencia</span>
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CompanionList from "./CompanionList.vue";
import type { Companion } from "@/types/companion.type";

interface Props {
  guestId: string;
  guestName: string;
  allNames: string[];
}

const props = defineProps<Props>();

const isGoing = ref<boolean | null>(null);
const companionList = ref<{ companions: Companion[] }>();

const submitConfirmation = () => {
  if (isGoing.value === null) {
    alert("✨ Por favor selecciona si asistirás o no.");
    return;
  }

  const companions = companionList.value?.companions || [];

  // Aquí conectas con Firestore
  console.log("Asistencia de:", props.guestName);
  console.log("Asiste?", isGoing.value);
  console.log("Acompañantes:", companions);

  alert("🎉 ¡Confirmación recibida! Nos vemos en la graduación.");
};
</script>

<style scoped>
.confirm-form {
  background: linear-gradient(135deg, var(--white-pure) 0%, var(--ivory) 100%);
  border-radius: 20px;
  padding: 2.5rem;
  margin-top: 2rem;
  box-shadow: var(--shadow-gold);
  border: 2px solid var(--gold-light);
}

.form-header {
  text-align: center;
  margin-bottom: 2rem;
}

.form-title {
  font-family: var(--font-elegant);
  font-size: 1.75rem;
  color: var(--gold-dark);
  margin-bottom: 0.5rem;
}

.form-subtitle {
  color: var(--text-secondary);
  font-size: 1rem;
}

.radio-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.radio-option {
  position: relative;
  cursor: pointer;
}

.radio-option input[type="radio"] {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.radio-content {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  background: var(--white-pure);
  border: 2px solid var(--gold-light);
  border-radius: 12px;
  transition: all var(--transition-fast);
}

.radio-option:hover .radio-content {
  border-color: var(--gold-primary);
  transform: translateX(4px);
  box-shadow: var(--shadow-md);
}

.radio-option.active .radio-content {
  background: linear-gradient(
    135deg,
    var(--gold-light) 0%,
    var(--white-pure) 100%
  );
  border-color: var(--gold-primary);
  box-shadow: var(--shadow-gold);
  transform: scale(1.02);
}

.radio-icon {
  font-size: 1.5rem;
}

.radio-text {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
}

.companions-section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: rgba(244, 229, 194, 0.2);
  border-radius: 12px;
  border: 1px solid var(--gold-light);
}

.submit-button {
  width: 100%;
  padding: 1.25rem 2rem;
  background: linear-gradient(
    135deg,
    var(--gold-primary) 0%,
    var(--gold-dark) 100%
  );
  color: var(--white-pure);
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-normal);
  box-shadow: var(--shadow-md);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: var(--shadow-lg);
}

.submit-button:active:not(:disabled) {
  transform: translateY(-1px);
}

.submit-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.button-icon {
  font-size: 1.25rem;
}

.slide-fade-enter-active {
  transition: all 0.4s ease;
}

.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from {
  transform: translateY(-20px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

@media (max-width: 640px) {
  .confirm-form {
    padding: 1.5rem;
  }

  .form-title {
    font-size: 1.5rem;
  }
}
</style>
