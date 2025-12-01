import { ref } from "vue";
import type { Companion } from "@/types/companion.type";
import { getCompanionsByGuest } from "@/services/companions.service";

export function useCompanions() {
  const companions = ref<Companion[]>([]);

  const fetchByGuest = async (guestId: string) => {
    companions.value = await getCompanionsByGuest(guestId);
    return companions.value;
  };

  const addCompanion = (companion: Companion) => {
    if (companions.value.length >= 5) return false;
    companions.value.push(companion);
    return true;
  };

  const removeCompanion = (id: string) => {
    companions.value = companions.value.filter((c) => c.id !== id);
  };

  return {
    companions,
    fetchByGuest,
    addCompanion,
    removeCompanion,
  };
}
