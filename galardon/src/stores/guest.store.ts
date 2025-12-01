import { defineStore } from "pinia";
import type { Guest } from "@/types/guest.type";
import { getAllGuests } from "@/services/guests.service";

export const useGuestStore = defineStore("guest", {
  state: () => ({
    guests: [] as Guest[],
  }),
  actions: {
    async fetchGuests() {
      this.guests = await getAllGuests();
    },
  },
});
