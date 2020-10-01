import axios from "axios";


export const instance = axios.create({  // смотреть документацию axios
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {"API-KEY": "f45e24aa-313d-43a7-9a41-723231b39786"}
})


export enum ResultCode {
    Success = 0,
    Error = 1,
}

export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10
}

export type DataItems<T> = {
    items: T[]
    totalCount: number
    error: string | null
}

export type MyResponseType<T = {}, RC = ResultCode > = {
    data: T
    resultCode: RC
    messages: string[]
    fieldsErrors? : string[]
}

