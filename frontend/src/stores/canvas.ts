import { defineStore } from "pinia";
import { ref, shallowRef } from "vue";

import { DataStore } from "@/models";

export type KeyLayoutSize = "small" | "medium" | "large";

export const useCanvasStore = defineStore("canvas", () => {
  // this object is not deeply reactive as it may be very large
  const dataStore = shallowRef<DataStore | null>(null);
  const displayedKeys = ref<string[]>([]);
  const layoutSizes = ref<{ [key: string]: KeyLayoutSize }>({});

  function displayKey(key: string) {
    if (displayedKeys.value.indexOf(key) === -1) {
      displayedKeys.value.push(key);
    }
  }

  function hideKey(key: string) {
    displayedKeys.value = displayedKeys.value.filter((k) => k != key);
  }

  function setKeyLayoutSize(key: string, size: KeyLayoutSize) {
    layoutSizes.value[key] = size;
  }

  function setDataStore(ds: DataStore | null) {
    dataStore.value = ds;
    displayedKeys.value = [];
    layoutSizes.value = {};
  }

  return {
    dataStore,
    displayedKeys,
    layoutSizes,
    displayKey,
    hideKey,
    setKeyLayoutSize,
    setDataStore,
  };
});
