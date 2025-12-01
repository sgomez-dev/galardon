<template>
  <div class="invitation-page">
    <div class="invitation-container">
      <div class="loading-state" v-if="loading">
        <div class="spinner"></div>
        <p>Cargando invitación...</p>
      </div>

      <template v-else-if="guest">
        <InvitationMessage />
        <ConfirmForm
          :guest-id="guest.id"
          :guest-name="guest.name"
          :all-names="allNames"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import InvitationMessage from "@/components/invitations/InvitationMessage.vue";
import ConfirmForm from "@/components/invitations/ConfirmForm.vue";
import type { Guest } from "@/types/guest.type";
import { getGuestBySlug } from "@/services/guests.service";

const route = useRoute();
const router = useRouter();
const guest = ref<Guest | null>(null);
const allNames = ref<string[]>([]);
const loading = ref(true);

onMounted(async () => {
  const slug = route.params.slug as string;
  try {
    const g = await getGuestBySlug(slug);
    if (!g) {
      alert("❌ Invitado no encontrado.");
      router.push("/");
      return;
    }
    guest.value = g;
    allNames.value = [];
  } catch (error) {
    console.error(error);
    alert("❌ Error al cargar la invitación.");
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.invitation-container {
  max-width: 700px;
  margin: 0 auto;
  padding: 3rem 1.5rem;
  position: relative;
  z-index: 1;
}

.loading-state {
  text-align: center;
  padding: 4rem 2rem;
  color: var(--text-secondary);
}

.spinner {
  width: 50px;
  height: 50px;
  margin: 0 auto 1rem;
  border: 4px solid var(--gold-light);
  border-top: 4px solid var(--gold-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .invitation-container {
    padding: 2rem 1rem;
  }
}
</style>
