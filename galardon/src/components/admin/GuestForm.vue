<template>
  <form @submit.prevent="submit" class="p-4 bg-white shadow rounded-lg">
    <Input v-model="form.name" placeholder="Nombre del invitado" />
    <Input
      v-model="form.slug"
      placeholder="Slug / link de invitación"
      class="mt-2"
    />
    <Button type="submit" class="mt-4">Guardar</Button>
  </form>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import Input from "@/components/ui/Input.vue";
import Button from "@/components/ui/Button.vue";
import type { Guest } from "@/types/guest.type";
import { addGuest } from "@/services/guests.service";

interface GuestForm {
  name: string;
  slug: string;
  isGoing: boolean | null;
  companions: string[];
  maxCompinions: number;
  isCompanion: boolean;
}

const form = reactive<GuestForm>({
  name: "",
  slug: "",
  isGoing: null,
  companions: [],
  maxCompinions: 0,
  isCompanion: false,
});

const submit = async () => {
  if (!form.name || !form.slug) {
    alert("Rellena todos los campos");
    return;
  }
  await addGuest(form as Omit<Guest, "id">);
  alert("Invitado guardado");
  form.name = "";
  form.slug = "";
};
</script>
