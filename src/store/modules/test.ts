import { UserInfo } from "#/store";
import { store } from "@/store"
import { defineStore } from 'pinia';
import axios from "axios"

interface UserState {
    userInfo: Nullable<UserInfo>;
    token?: string;
}

export const useUserStore = defineStore("app-user", {
    state: () => {
        return {
            userInfo: {} as null | UserState,
        }
    },
    actions: {
        async getUserInfo() {
            const res = await axios({
                method: "post",
                url: "/api/login",
                data: {
                    username: "wq",
                    password: "123456"
                }
            })
            this.userInfo = res.data.data
        },
    },
})

export function useUserStoreWithOut() {
    return useUserStore(store);
}
