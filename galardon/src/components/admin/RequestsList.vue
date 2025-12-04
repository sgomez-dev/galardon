<template>
  <div class="requests-container">
    <ConfirmModal
      v-model:show="showConfirmApprove"
      :message="approveMessage"
      title="Aprobar solicitud"
      confirm-text="Aprobar"
      icon="✓"
      @confirm="confirmApprove"
    />

    <ConfirmModal
      v-model:show="showConfirmReject"
      :message="rejectMessage"
      title="Rechazar solicitud"
      confirm-text="Rechazar"
      icon="✗"
      @confirm="confirmReject"
    />

    <h3 class="requests-title">
      📨 Solicitudes de Nuevos Invitados
      <span v-if="pendingCount > 0" class="requests-badge">
        {{ pendingCount }}
      </span>
    </h3>

    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Cargando solicitudes...</p>
    </div>

    <div v-else-if="requests.length === 0" class="empty-state">
      <p>✨ No hay solicitudes pendientes</p>
    </div>

    <div v-else class="requests-list">
      <div v-for="request in requests" :key="request.id" class="request-card">
        <div class="request-info">
          <div class="request-header">
            <span class="requester-name">{{ request.requestedByName }}</span>
            <span class="request-date">
              {{ formatDate(request.createdAt) }}
            </span>
          </div>
          <div class="request-body">
            <p class="request-text">Quiere agregar como acompañante a:</p>
            <p class="companion-name">{{ request.companionName }}</p>
          </div>
        </div>

        <div class="request-actions">
          <button
            @click="handleApprove(request)"
            class="action-btn approve-btn"
            :disabled="processing"
          >
            ✓ Aprobar
          </button>
          <button
            @click="handleReject(request)"
            class="action-btn reject-btn"
            :disabled="processing"
          >
            ✗ Rechazar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import type { InvitationRequest } from "@/types/invitationRequest.type";
import {
  getPendingRequests,
  approveRequest,
  rejectRequest,
} from "@/services/invitationRequests.service";
import { addGuest } from "@/services/guests.service";
import { auth } from "@/services/firebase";
import { useToast } from "@/composables/useToast";
import ConfirmModal from "@/components/ui/ConfirmModal.vue";

const showConfirmApprove = ref(false);
const showConfirmReject = ref(false);
const selectedRequest = ref<InvitationRequest | null>(null);
const toast = useToast();

const requests = ref<InvitationRequest[]>([]);
const loading = ref(true);
const processing = ref(false);

const pendingCount = computed(() => requests.value.length);

const approveMessage = computed(() => {
  if (!selectedRequest.value) return "";
  return `¿Aprobar la solicitud de agregar a "${selectedRequest.value.companionName}"?\n\nSe creará una nueva invitación.`;
});

const rejectMessage = computed(() => {
  if (!selectedRequest.value) return "";
  return `¿Rechazar la solicitud de agregar a "${selectedRequest.value.companionName}"?`;
});

const loadRequests = async () => {
  loading.value = true;
  try {
    requests.value = await getPendingRequests();
  } catch (error) {
    console.error("Error al cargar solicitudes:", error);
    toast.error("Error al cargar las solicitudes");
  } finally {
    loading.value = false;
  }
};

const handleApprove = (request: InvitationRequest) => {
  selectedRequest.value = request;
  showConfirmApprove.value = true;
};

const confirmApprove = async () => {
  if (!selectedRequest.value) return;

  processing.value = true;
  try {
    const adminId = auth.currentUser?.uid || "unknown";

    // Crear slug a partir del nombre
    const slug = selectedRequest.value.companionName
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    // Crear el nuevo invitado
    await addGuest({
      name: selectedRequest.value.companionName,
      slug: slug,
      isGoing: null,
      companions: [],
      maxCompinions: 5,
      isCompanion: true,
      linkedTo: selectedRequest.value.requestedBy,
    });

    // Marcar la solicitud como aprobada
    await approveRequest(selectedRequest.value.id, adminId);

    toast.success("Solicitud aprobada e invitación creada");
    await loadRequests();
  } catch (error: any) {
    console.error("Error al aprobar:", error);
    toast.error(`Error al aprobar la solicitud: ${error.message}`);
  } finally {
    processing.value = false;
    selectedRequest.value = null;
  }
};

const handleReject = (request: InvitationRequest) => {
  selectedRequest.value = request;
  showConfirmReject.value = true;
};

const confirmReject = async () => {
  if (!selectedRequest.value) return;

  processing.value = true;
  try {
    const adminId = auth.currentUser?.uid || "unknown";
    await rejectRequest(selectedRequest.value.id, adminId);

    toast.success("Solicitud rechazada");
    await loadRequests();
  } catch (error: any) {
    console.error("Error al rechazar:", error);
    toast.error(`Error al rechazar la solicitud: ${error.message}`);
  } finally {
    processing.value = false;
    selectedRequest.value = null;
  }
};

const formatDate = (date: Date): string => {
  if (!date) return "";
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

onMounted(async () => {
  await loadRequests();
});
</script>

<style scoped>
.requests-container {
  background: var(--white-pure);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;
  margin-bottom: 2rem;
}

.requests-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.requests-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.75rem;
  height: 1.75rem;
  padding: 0 0.5rem;
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  color: #92400e;
  border-radius: 50%;
  font-size: 0.875rem;
  font-weight: 700;
  border: 2px solid #fcd34d;
}

.loading-state {
  text-align: center;
  padding: 3rem 1rem;
  color: var(--text-secondary);
}

.spinner {
  width: 40px;
  height: 40px;
  margin: 0 auto 1rem;
  border: 4px solid #e2e8f0;
  border-top: 4px solid var(--gold-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.empty-state {
  text-align: center;
  padding: 2rem 1rem;
  color: var(--text-secondary);
  font-size: 0.9375rem;
}

.requests-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.request-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem;
  background: linear-gradient(135deg, #fefce8 0%, #fef9c3 100%);
  border: 2px solid #fde68a;
  border-radius: 10px;
  transition: all 0.2s ease;
}

.request-card:hover {
  border-color: #fcd34d;
  box-shadow: 0 4px 12px rgba(253, 224, 71, 0.3);
}

.request-info {
  flex: 1;
}

.request-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.requester-name {
  font-weight: 600;
  color: #78350f;
  font-size: 1rem;
}

.request-date {
  font-size: 0.8125rem;
  color: #92400e;
  opacity: 0.8;
}

.request-body {
  margin-top: 0.5rem;
}

.request-text {
  font-size: 0.875rem;
  color: #92400e;
  margin-bottom: 0.25rem;
}

.companion-name {
  font-size: 1.125rem;
  font-weight: 700;
  color: #78350f;
}

.request-actions {
  display: flex;
  gap: 0.75rem;
  margin-left: 1rem;
}

.action-btn {
  padding: 0.625rem 1.25rem;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.approve-btn {
  background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
  color: #065f46;
  border: 1px solid #6ee7b7;
}

.approve-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #a7f3d0 0%, #6ee7b7 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(16, 185, 129, 0.3);
}

.reject-btn {
  background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
  color: #991b1b;
  border: 1px solid #fca5a5;
}

.reject-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #fecaca 0%, #fca5a5 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(220, 38, 38, 0.3);
}

@media (max-width: 768px) {
  .request-card {
    flex-direction: column;
    align-items: stretch;
  }

  .request-actions {
    margin-left: 0;
    margin-top: 1rem;
    justify-content: stretch;
  }

  .action-btn {
    flex: 1;
  }
}
</style>
