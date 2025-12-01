import { ref, computed, watch } from "vue";

export function useAutocomplete(options: { items: string[] }) {
  const query = ref("");
  const selected = ref("");
  const items = ref<string[]>(options.items);

  const filteredItems = computed(() => {
    if (!query.value) return items.value;
    const q = query.value.toLowerCase();
    return items.value.filter((item) => item.toLowerCase().includes(q));
  });

  const selectItem = (item: string) => {
    selected.value = item;
    query.value = item;
  };

  watch(query, (val) => {
    if (!val) selected.value = "";
  });

  return {
    query,
    selected,
    filteredItems,
    selectItem,
  };
}
