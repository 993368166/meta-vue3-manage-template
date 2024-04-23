import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore(
    'userStore',
    () => {
        const userInfo = ref({
          roleId: "",
          token: "",
          id: "",
          userName: ""
        });

        const deleteUserInfo = () => {
          userInfo.value = {
            roleId: "",
            token: "",
            id: "",
            userName: ""
          }
        }

        return {
          userInfo,
          deleteUserInfo
        };
    },
    {
        persist: true
    }
);
