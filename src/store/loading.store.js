import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLoadingStore = defineStore(
  'loadingStore',
  () => {
    const isLoading = ref(false);

    let loadingInstance = {};

    const setIsLoading = (_isLoading) => {
      if (_isLoading) {
        loadingInstance = ElLoading.service();
      } else {
        loadingInstance.close();
      }
      isLoading.value = _isLoading
    }

    return {
      isLoading,
      setIsLoading
    };
  },
  {
    persist: false
  }
);
