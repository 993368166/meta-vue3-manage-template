import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useStaticDataStore = defineStore(
  'staticDataStore',
  () => {
    const qiniuToken = ref('');

    const setQiniuToken = (_token) => {
      qiniuToken.value = _token
    }

    const getQiniuToken = () => qiniuToken.value;

    return {
      qiniuToken,
      setQiniuToken,
      getQiniuToken
    }
  },
  {
    persist: true
  }
)
