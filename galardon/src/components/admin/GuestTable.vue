<template>
  <div class="guest-table-container">
    <ConfirmModal
      v-model:show="showConfirmDelete"
      :message="deleteMessage"
      title="Eliminar invitación"
      confirm-text="Eliminar"
      icon="🗑️"
      @confirm="confirmDelete"
    />

    <table class="guest-table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Asistencia</th>
          <th>Acompañantes</th>
          <th>Link</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="guest in guests" :key="guest.id">
          <td class="guest-name">{{ guest.name }}</td>
          <td class="guest-status">
            <span
              v-if="guest.isGoing === true"
              class="status-badge status-confirmed"
            >
              ✓ Confirmado
            </span>
            <span
              v-else-if="guest.isGoing === false"
              class="status-badge status-declined"
            >
              ✗ No asiste
            </span>
            <span v-else class="status-badge status-pending">
              ⏳ Pendiente
            </span>
          </td>
          <td class="guest-companions">
            <span class="companions-count">{{
              guest.companions?.length || 0
            }}</span>
          </td>
          <td class="guest-link">
            <button
              @click="copyInvitationLink(guest)"
              class="copy-button"
              title="Copiar link de invitación"
            >
              🔗 Copiar
            </button>
          </td>
          <td class="guest-actions">
            <button
              @click="handleDelete(guest)"
              class="delete-button"
              title="Eliminar invitación"
            >
              🗑️ Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import type { Guest } from "@/types/guest.type";
import { getAllGuests, deleteGuest } from "@/services/guests.service";
import { useToast } from "@/composables/useToast";
import ConfirmModal from "@/components/ui/ConfirmModal.vue";

const guests = ref<Guest[]>([]);
const showConfirmDelete = ref(false);
const guestToDelete = ref<Guest | null>(null);
const toast = useToast();

const deleteMessage = computed(() => {
  if (!guestToDelete.value) return "";
  return `¿Estás seguro de eliminar la invitación de "${guestToDelete.value.name}"?\n\nEsta acción no se puede deshacer.`;
});

const loadGuests = async () => {
  guests.value = await getAllGuests();
};

const handleDelete = (guest: Guest) => {
  guestToDelete.value = guest;
  showConfirmDelete.value = true;
};

const confirmDelete = async () => {
  if (!guestToDelete.value) return;

  try {
    await deleteGuest(guestToDelete.value.id);
    toast.success("Invitación eliminada exitosamente");
    await loadGuests();
  } catch (error: any) {
    console.error("Error al eliminar:", error);
    toast.error(`Error al eliminar la invitación: ${error.message}`);
  } finally {
    guestToDelete.value = null;
  }
};

const copyInvitationLink = async (guest: Guest) => {
  const url = `${window.location.origin}/i/${guest.slug}`;
  try {
    await navigator.clipboard.writeText(url);
    toast.success(`Link copiado al portapapeles`);
  } catch (error) {
    console.error("Error al copiar:", error);
    toast.error("No se pudo copiar el link");
  }
};

onMounted(async () => {
  await loadGuests();
});

defineExpose({
  loadGuests,
});
</script>

<style scoped>
.guest-table-container {
  overflow-x: auto;
  background: var(--white-pure);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.guest-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

.guest-table thead {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  position: sticky;
  top: 0;
  z-index: 10;
}

.guest-table th {
  padding: 1rem 1.5rem;
  text-align: left;
  font-weight: 600;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #475569;
  border-bottom: 2px solid #cbd5e1;
}

.guest-table tbody tr {
  border-bottom: 1px solid #e2e8f0;
  transition: background-color 0.2s ease;
}

.guest-table tbody tr:hover {
  background-color: #f8fafc;
}

.guest-table tbody tr:last-child {
  border-bottom: none;
}

.guest-table td {
  padding: 1.25rem 1.5rem;
  font-size: 0.9375rem;
  color: var(--text-primary);
}

.guest-name {
  font-weight: 500;
  color: #1e293b;
}

.guest-status {
  text-align: center;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  white-space: nowrap;
}

.status-confirmed {
  background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
  color: #065f46;
  border: 1px solid #6ee7b7;
}

.status-declined {
  background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
  color: #991b1b;
  border: 1px solid #fca5a5;
}

.status-pending {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  color: #92400e;
  border: 1px solid #fcd34d;
}

.guest-companions {
  text-align: center;
}

.guest-link {
  text-align: center;
}

.copy-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
  color: #1e40af;
  border: 1px solid #93c5fd;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.copy-button:hover {
  background: linear-gradient(135deg, #bfdbfe 0%, #93c5fd 100%);
  border-color: #60a5fa;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(37, 99, 235, 0.2);
}

.copy-button:active {
  transform: translateY(0);
}

.companions-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 2rem;
  height: 2rem;
  padding: 0 0.75rem;
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
  color: #1e40af;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9375rem;
  border: 1px solid #93c5fd;
}

.guest-actions {
  text-align: center;
}

.delete-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
  color: #991b1b;
  border: 1px solid #fca5a5;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.delete-button:hover {
  background: linear-gradient(135deg, #fecaca 0%, #fca5a5 100%);
  border-color: #f87171;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(220, 38, 38, 0.2);
}

.delete-button:active {
  transform: translateY(0);
}

/* Responsive */
@media (max-width: 768px) {
  .guest-table th,
  .guest-table td {
    padding: 0.875rem 1rem;
    font-size: 0.875rem;
  }

  .status-badge {
    padding: 0.375rem 0.75rem;
    font-size: 0.8125rem;
  }
}
</style>
