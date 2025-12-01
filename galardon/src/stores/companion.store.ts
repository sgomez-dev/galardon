import { defineStore } from "pinia";
import type { Companion } from "@/types/companion.type";

export const useCompanionStore = defineStore("companion", {
  state: () => ({
    companions: [] as Companion[],
  }),
  actions: {
    setCompanions(list: Companion[]) {
      this.companions = list;
    },
  },
});
