<template>
  <div v-if="confirmed" class="confirmation-message">
    <div class="message-icon">{{ isGoing ? "🎉" : "😔" }}</div>
    <h2 class="message-title">
      {{ isGoing ? "¡Nos vemos en la graduación!" : "Gracias por responder" }}
    </h2>

    <div v-if="confirmedBy && isGoing" class="confirmed-by-badge">
      <span class="badge-icon">✅</span>
      <p>
        <strong>{{ confirmedBy }}</strong> confirmó tu asistencia como
        acompañante
      </p>
    </div>

    <p class="message-text">
      {{
        isGoing
          ? `Me alegra que puedas venir, ${guestName}. Nos vemos en la graduación.`
          : `Qué mal que no puedas asistir, ${guestName}. Aun así agradezco tu tiempo.`
      }}
    </p>

    <div v-if="isGoing && initialCompanions.length > 0" class="companions-info">
      <h3 class="companions-info-title">👥 Acompañantes confirmados:</h3>
      <ul class="companions-list">
        <li v-for="(companion, index) in initialCompanions" :key="index">
          {{ companion }}
        </li>
      </ul>
    </div>

    <div v-if="isGoing && hasNewRequests" class="info-box">
      <span class="info-icon">📩</span>
      <p>
        Se enviaron {{ newRequestsCount }} solicitud(es) de nuevos invitados. El
        administrador las revisará pronto.
      </p>
    </div>
  </div>

  <form v-else @submit.prevent="submitConfirmation" class="confirm-form">
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
        <CompanionList
          ref="companionList"
          :all-names="allNames"
          :guest-id="guestId"
          :guest-name="guestName"
        />
      </div>
    </transition>

    <button
      type="submit"
      class="submit-button"
      :disabled="isGoing === null || isSubmitting"
    >
      <span class="button-icon">{{ isSubmitting ? "⏳" : "📨" }}</span>
      <span>{{
        isSubmitting ? "Confirmando..." : "Confirmar Asistencia"
      }}</span>
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CompanionList from "./CompanionList.vue";
import type { Companion } from "@/types/companion.type";
import { updateGuest, getGuestByName } from "@/services/guests.service";
import { createInvitationRequest } from "@/services/invitationRequests.service";
import { useToast } from "@/composables/useToast";

interface Props {
  guestId: string;
  guestName: string;
  allNames: string[];
  initialIsGoing: boolean | null;
  initialCompanions: string[];
  confirmedBy?: string;
}

const props = defineProps<Props>();
const toast = useToast();

// Separar el estado inicial del estado actual
const alreadyConfirmed = props.initialIsGoing !== null;
const isGoing = ref<boolean | null>(props.initialIsGoing);
const companionList = ref<{ companions: Companion[]; newRequests: string[] }>();
const isSubmitting = ref(false);
const hasNewRequests = ref(false);
const newRequestsCount = ref(0);

// Mostrar mensaje de confirmación si ya confirmó antes O acaba de confirmar
const confirmed = ref(alreadyConfirmed);

const submitConfirmation = async () => {
  if (isGoing.value === null) {
    toast.warning("Por favor selecciona si asistirás o no");
    return;
  }

  isSubmitting.value = true;

  try {
    const companions = companionList.value?.companions || [];
    const newRequests = companionList.value?.newRequests || [];
    const companionNames = companions.map((c) => c.name);

    // Confirmar la asistencia de acompañantes que son invitados existentes
    if (isGoing.value && companionNames.length > 0) {
      for (const companionName of companionNames) {
        if (!newRequests.includes(companionName)) {
          // Es un invitado existente, actualizar su confirmación
          const companionGuest = await getGuestByName(companionName);
          if (companionGuest && companionGuest.isGoing === null) {
            await updateGuest(companionGuest.id, {
              isGoing: true,
              confirmedBy: props.guestName,
            });
          }
        }
      }
    }

    // Crear solicitudes para acompañantes no registrados
    if (newRequests.length > 0) {
      for (const newName of newRequests) {
        await createInvitationRequest(props.guestId, props.guestName, newName);
      }
    }

    await updateGuest(props.guestId, {
      isGoing: isGoing.value,
      companions: companionNames,
    });

    // Marcar como confirmado y mostrar mensaje
    confirmed.value = true;
    hasNewRequests.value = newRequests.length > 0;
    newRequestsCount.value = newRequests.length;
  } catch (error) {
    console.error("Error al confirmar asistencia:", error);
    toast.error(
      "Hubo un error al confirmar tu asistencia. Por favor intenta de nuevo."
    );
  } finally {
    isSubmitting.value = false;
  }
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

/* Mensaje de confirmación */
.confirmation-message {
  background: linear-gradient(135deg, var(--white-pure) 0%, var(--ivory) 100%);
  border-radius: 20px;
  padding: 3rem 2.5rem;
  margin-top: 2rem;
  box-shadow: var(--shadow-gold);
  border: 2px solid var(--gold-light);
  text-align: center;
  animation: fadeInScale 0.5s ease-out;
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.message-icon {
  font-size: 4rem;
  margin-bottom: 1.5rem;
  animation: bounce 1s ease-in-out infinite;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.message-title {
  font-family: var(--font-elegant);
  font-size: 2rem;
  color: var(--gold-dark);
  margin-bottom: 1rem;
  font-weight: 700;
}

.message-text {
  font-size: 1.25rem;
  color: var(--text-primary);
  line-height: 1.8;
  margin-bottom: 2rem;
}

.confirmed-by-badge {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
  border: 2px solid #6ee7b7;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  animation: slideIn 0.3s ease;
}

.confirmed-by-badge .badge-icon {
  font-size: 1.75rem;
  flex-shrink: 0;
}

.confirmed-by-badge p {
  text-align: left;
  color: #065f46;
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
}

.confirmed-by-badge strong {
  font-weight: 700;
  color: #047857;
}

.companions-info {
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border: 2px solid #bae6fd;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: left;
}

.companions-info-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #0c4a6e;
  margin-bottom: 1rem;
}

.companions-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.companions-list li {
  padding: 0.75rem 1rem;
  background: white;
  border: 1px solid #bae6fd;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  color: #0c4a6e;
  font-weight: 500;
}

.companions-list li:last-child {
  margin-bottom: 0;
}

.info-box {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  border: 2px solid #fcd34d;
  border-radius: 12px;
  margin-top: 2rem;
}

.info-icon {
  font-size: 1.75rem;
  flex-shrink: 0;
}

.info-box p {
  text-align: left;
  color: #92400e;
  font-size: 0.9375rem;
  line-height: 1.6;
  margin: 0;
}

@media (max-width: 640px) {
  .confirmation-message {
    padding: 2rem 1.5rem;
  }

  .message-icon {
    font-size: 3rem;
  }

  .message-title {
    font-size: 1.5rem;
  }

  .message-text {
    font-size: 1.125rem;
  }

  .info-box {
    flex-direction: column;
    text-align: center;
  }

  .info-box p {
    text-align: center;
  }
}
</style>
