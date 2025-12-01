import { ref } from "vue";
import type { Guest } from "@/types/guest.type";
import { getGuestBySlug, getAllGuests } from "@/services/guests.service";

export function useGuest() {
  const guest = ref<Guest | null>(null);
  const guests = ref<Guest[]>([]);

  const fetchGuestBySlug = async (slug: string) => {
    const g = await getGuestBySlug(slug);
    guest.value = g;
    return g;
  };

  const fetchAllGuests = async () => {
    guests.value = await getAllGuests();
    return guests.value;
  };

  return {
    guest,
    guests,
    fetchGuestBySlug,
    fetchAllGuests,
  };
}
