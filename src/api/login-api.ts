import {instance, MyResponseType, ResultCode, ResultCodeForCaptcha} from "./api";

type LoginType = {
    userId : number
}

export const loginAPI = {

    loginUser(email: string, password: string, rememberMe: boolean, captcha: string) {
        return instance.post<MyResponseType<LoginType, ResultCode | ResultCodeForCaptcha>>(`auth/login`, {email, password, rememberMe, captcha});
    },

    logoutUser() {
        return instance.delete<MyResponseType>(`auth/login`);
    }

}