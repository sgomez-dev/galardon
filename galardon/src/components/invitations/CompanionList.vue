<template>
  <div>
    <p class="mb-2 font-medium">Acompañantes:</p>
    <div v-for="(c, index) in companions" :key="c.id" class="companion-item">
      <CompanionField
        :companion="c"
        :all-names="allNames"
        @remove="removeCompanion(index)"
      />
      <div v-if="isNewName(c.name)" class="new-request-badge">
        <span class="badge-icon">📝</span>
        <span class="badge-text">
          <strong
            >Solicitar agregar a "{{ c.name }}" a la lista de invitados</strong
          >
          <small>El administrador revisará esta solicitud</small>
        </span>
      </div>
    </div>
    <button
      type="button"
      v-if="companions.length < 5"
      @click="addCompanion"
      class="add-companion-btn"
    >
      + Añadir acompañante
    </button>
    <p v-else class="max-companions-text">
      Has alcanzado el máximo de 5 acompañantes.
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import CompanionField from "./CompanionField.vue";
import type { Companion } from "@/types/companion.type";

interface Props {
  allNames: string[];
  guestId: string;
  guestName: string;
}

const props = defineProps<Props>();

const companions = ref<Companion[]>([]);

const newRequests = computed(() => {
  return companions.value
    .filter((c: Companion) => c.name && !props.allNames.includes(c.name))
    .map((c: Companion) => c.name);
});

const isNewName = (name: string): boolean => {
  return name !== "" && !props.allNames.includes(name);
};

const addCompanion = () => {
  if (companions.value.length >= 5) return;
  companions.value.push({
    id: crypto.randomUUID(),
    name: "",
    isGoing: true,
    linkedTo: "",
    confirmedBy: "",
  });
};

const removeCompanion = (index: number) => {
  companions.value.splice(index, 1);
};

defineExpose({ companions, newRequests });
</script>

<style scoped>
.add-companion-btn {
  margin-top: 0.5rem;
  padding: 0.75rem 1rem;
  background: linear-gradient(
    135deg,
    var(--gold-primary) 0%,
    var(--gold-dark) 100%
  );
  color: var(--white-pure);
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.add-companion-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(184, 134, 11, 0.3);
}

.max-companions-text {
  color: var(--text-secondary);
  margin-top: 0.5rem;
  font-size: 0.875rem;
}

.companion-item {
  margin-bottom: 1rem;
}

.new-request-badge {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-top: 0.5rem;
  padding: 1rem;
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  border: 2px solid #fbbf24;
  border-radius: 12px;
  animation: slideIn 0.3s ease;
}

.badge-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.badge-text {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  color: #92400e;
}

.badge-text strong {
  font-size: 0.9375rem;
  font-weight: 600;
  line-height: 1.4;
}

.badge-text small {
  font-size: 0.8125rem;
  opacity: 0.8;
  font-weight: 500;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
