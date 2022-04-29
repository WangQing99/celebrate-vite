import { UserInfo } from "#/store";
import { store } from "@/store"
import { defineStore } from 'pinia';
import axios from "axios"

interface UserState {
    userInfo: Nullable<UserInfo>;
    token?: string;
}

export const useUserStore = defineStore({
    id: 'app-user',
    state: (): UserState => ({
        // user info
        userInfo: null,
        // token
        token: undefined,
    }),
    getters:{
        
    }
})
