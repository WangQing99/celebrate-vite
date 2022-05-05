import { UserInfo } from "#/store";
import type { ErrorMessageMode } from "#/axios";
import { defineStore } from "pinia";
import { RouteRecordRaw } from 'vue-router';

import { GetUserInfoModel, LoginParams } from "@/api/sys/model/userModel";
import { loginApi, getUserInfo } from "@/api/sys/user";

import { router } from '@/router';
import { PageEnum } from '@/enums/pageEnum';
import { usePermissionStore } from '@/store/modules/permission';
import { PAGE_NOT_FOUND_ROUTE } from '@/router/routes/basic';

interface UserState {
    userInfo: Nullable<UserInfo>;
    token?: string;
    sessionTimeout?: boolean;
    lastUpdateTime: number;
}

export const useUserStore = defineStore({
    id: "app-user",
    state: (): UserState => ({
        // user info
        userInfo: null,
        // token
        token: undefined,
        // Whether the login expired
        sessionTimeout: false,
        // Last fetch time
        lastUpdateTime: 0,
    }),
    getters: {
        getToken(): string {
            return this.token || "";
        },
        getSessionTimeout(): boolean {
            return !!this.sessionTimeout;
        },
    },
    actions: {
        setToken(info: string | undefined) {
            this.token = info ? info : "";
        },
        setSessionTimeout(flag: boolean) {
            this.sessionTimeout = flag;
        },
        setUserInfo(info: UserInfo | null) {
            this.userInfo = info;
            this.lastUpdateTime = new Date().getTime();
        },
        async login(
            params: LoginParams & {
                goHome?: boolean;
                mode?: ErrorMessageMode;
            }
        ): Promise<GetUserInfoModel | null> {
            try {
                const { goHome = true, mode, ...loginParams } = params;
                
                const data = await loginApi(loginParams, mode);
                console.log(data);
                
                const { token } = data;
                
                // save token
                this.setToken(token);
                return this.afterLoginAction(goHome);
            } catch (error) {
                return Promise.reject(error);
            }
        },
        async afterLoginAction(goHome?: boolean): Promise<GetUserInfoModel | null> {
            if (!this.getToken) return null;
            // get user info
            const userInfo = await this.getUserInfoAction();

            const sessionTimeout = this.sessionTimeout;
            console.log(sessionTimeout);
            
            if (sessionTimeout) {
                this.setSessionTimeout(false);
            } else {
                const permissionStore = usePermissionStore();
                if (!permissionStore.isDynamicAddedRoute) {
                    const routes = await permissionStore.buildRoutesAction();
                    routes.forEach((route) => {
                        router.addRoute(route as unknown as RouteRecordRaw);
                    });
                    router.addRoute(PAGE_NOT_FOUND_ROUTE as unknown as RouteRecordRaw);
                    permissionStore.setDynamicAddedRoute(true);
                }
                goHome && (await router.replace(userInfo?.homePath || PageEnum.BASE_HOME));
            }
            return userInfo;
        },
        async getUserInfoAction(): Promise<UserInfo | null> {
            if (!this.getToken) return null;
            const userInfo = await getUserInfo();
            this.setUserInfo(userInfo);
            return userInfo;
        },
    },
});
