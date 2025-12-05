<template>
  <div class="admin-page">
    <div class="page-header">
      <div>
        <h1 class="page-title">Invitados</h1>
        <p class="page-subtitle">Gestión de invitados y confirmaciones</p>
      </div>
      <Button variant="primary" @click="showAddGuest = true">
        + Crear Invitación
      </Button>
    </div>

    <div class="page-content">
      <RequestsList />
      <GuestTable ref="guestTableRef" />
    </div>

    <Modal :show="showAddGuest" @close="closeModal">
      <div class="modal-content">
        <h2 class="modal-title">Crear Nueva Invitación</h2>
        <form @submit.prevent="createInvitation" class="invitation-form">
          <div class="form-group">
            <label class="form-label">Nombre del invitado</label>
            <Input v-model="form.name" placeholder="Ej: Juan Pérez" required />
          </div>

          <div class="form-group">
            <label class="form-label">Slug (identificador único)</label>
            <Input v-model="form.slug" placeholder="Ej: juan-perez" required />
            <span class="form-hint">
              🔗 {{ origin }}/i/{{ form.slug || "..." }}
            </span>
          </div>

          <div class="form-actions">
            <Button type="button" variant="secondary" @click="closeModal">
              Cancelar
            </Button>
            <Button type="submit" variant="primary"> Crear Invitación </Button>
          </div>
        </form>

        <div v-if="generatedUrl" class="success-message">
          <div class="success-header">
            <span class="success-icon">✅</span>
            <h3>¡Invitación creada!</h3>
          </div>
          <div class="url-container">
            <input
              :value="generatedUrl"
              readonly
              class="url-input"
              ref="urlInputRef"
            />
            <Button @click="copyUrl" variant="primary" size="sm">
              Copiar URL
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import GuestTable from "@/components/admin/GuestTable.vue";
import RequestsList from "@/components/admin/RequestsList.vue";
import Button from "@/components/ui/Button.vue";
import Input from "@/components/ui/Input.vue";
import Modal from "@/components/ui/Modal.vue";
import { addGuest } from "@/services/guests.service";
import type { Guest } from "@/types/guest.type";
import { useToast } from "@/composables/useToast";

const toast = useToast();

const showAddGuest = ref(false);
const generatedUrl = ref("");
const urlInputRef = ref<HTMLInputElement | null>(null);
const guestTableRef = ref<InstanceType<typeof GuestTable>>();

const origin = computed(() => {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return "";
});

const form = reactive<{
  name: string;
  slug: string;
  maxCompinions: number;
}>({
  name: "",
  slug: "",
  maxCompinions: 5,
});

const createInvitation = async () => {
  if (!form.name || !form.slug) {
    toast.warning("Por favor completa todos los campos obligatorios");
    return;
  }

  try {
    const guestData: Omit<Guest, "id"> = {
      name: form.name,
      slug: form.slug,
      isGoing: null,
      companions: [],
      maxCompinions: form.maxCompinions,
      isCompanion: false,
    };

    await addGuest(guestData);

    // Recargar la tabla de invitados
    await guestTableRef.value?.loadGuests();

    // Generar la URL
    generatedUrl.value = `${window.location.origin}/i/${form.slug}`;

    // Limpiar el formulario
    form.name = "";
    form.slug = "";
    form.maxCompinions = 0;

    toast.success("¡Invitación creada exitosamente!");
  } catch (error) {
    toast.error("Error al crear la invitación");
    console.error(error);
  }
};

const copyUrl = () => {
  if (urlInputRef.value) {
    urlInputRef.value.select();
    document.execCommand("copy");
    toast.success("URL copiada al portapapeles");
  }
};

const closeModal = () => {
  showAddGuest.value = false;
  // Resetear el estado del formulario y la URL generada
  form.name = "";
  form.slug = "";
  form.maxCompinions = 5;
  generatedUrl.value = "";
};
</script>

<style scoped>
.admin-page {
  padding: 2rem;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.page-subtitle {
  font-size: 1rem;
  color: var(--text-secondary);
}

.page-content {
  background: var(--white-pure);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid var(--admin-border);
}

.modal-content {
  padding: 1.5rem;
  max-width: 500px;
}

.modal-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.modal-title::before {
  content: "✉️";
  font-size: 2rem;
}

.invitation-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.form-hint {
  font-size: 0.8125rem;
  color: var(--text-secondary);
  background: #f8fafc;
  padding: 0.75rem;
  border-radius: 6px;
  border-left: 3px solid var(--primary);
  font-family: monospace;
  word-break: break-all;
}

.form-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
}

.success-message {
  margin-top: 2rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
  border: 2px solid #86efac;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(134, 239, 172, 0.2);
}

.success-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}

.success-icon {
  font-size: 2rem;
  animation: bounce 0.6s ease-in-out;
}

@keyframes bounce {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}

.success-header h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #166534;
  margin: 0;
}

.url-container {
  display: flex;
  gap: 0.75rem;
  align-items: stretch;
}

.url-input {
  flex: 1;
  padding: 0.875rem;
  border: 2px solid #86efac;
  border-radius: 8px;
  font-size: 0.875rem;
  font-family: monospace;
  background: white;
  color: #166534;
  font-weight: 600;
  transition: all 0.2s;
}

.url-input:focus {
  outline: none;
  border-color: #22c55e;
  box-shadow: 0 0 0 3px rgba(134, 239, 172, 0.2);
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .url-container {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
