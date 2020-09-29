import axios, {AxiosResponse} from "axios";
import {ProfileType} from "../redux/types/types";


const instance = axios.create({  // смотреть документацию axios
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {"API-KEY": "f45e24aa-313d-43a7-9a41-723231b39786"}
})


type ResponseType<T> = {
    data : T
    status: number
    statusText: string
    headers: {}
    config: {}
    request: {}
}
type UsersType = {
    name: string
    id: number
    uniqueUrlName: string | null,
    photos: {
        small: string | null
        large: string | null
    },
    status: string | null
    followed: boolean
}

type DataUsersType = {
    items: UsersType[]
    totalCount: number
    error: string | null
}
export enum ResultCode {
    Success = 0,
    Error = 1,
}
export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10
}
type FollowUnfollowType = {
    resultCode: ResultCode
    messages: string[],
    data: {}
}
export const usersAPI = {

    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get<DataUsersType>(`users?page=${currentPage}&count=${pageSize}`)
            .then((response) => {
                return response.data
            })
    },

    unfollowAPI(userId : number) {
        return (
            instance.delete<FollowUnfollowType>(`follow/${userId}`).then((response ) => response.data)
        )
    },

    followAPI(userId : number) {
        return (
            instance.post<FollowUnfollowType>(`follow/${userId}`, null).then((response ) => response.data)
        )
    }

}
type AuthUserType = {
    data: {
        id: number,
        login: string,
        email: string
    },
    messages: string[],
    fieldsErrors: string[],
    resultCode: ResultCode | ResultCodeForCaptcha
}
type StatusType = string
export const profileAPI = {

    getMyProfile() {

        return (
            instance.get<AuthUserType>(`auth/me`)
                .then((response ) => {
                    if (response.data.resultCode === ResultCode.Success) {
                        return response.data.data.id
                    }
                })
                // .then(userId => instance.get(`profile/${userId}`))
                // .then(response => response.data)
        )
    },

    getProfile(userId:number) {
        return (
            instance.get<ProfileType>(`profile/${userId}`).then((response ) => response.data)
        )
    },

    getStatus(userId:number) {

        return (
            instance.get<StatusType>(`profile/status/${userId}`)
                .then((status ) => status.data)
        )
    },

    updateStatus(status:string) {
        return (
            instance.put(`profile/status`, {status: status})
        )
    },

    saveAvatar(avatarFile:any) {
        const formData = new FormData();
        formData.append("image", avatarFile);
        return (
            instance.put(`profile/photo`, formData, {headers: {'Content-Type': 'multipart/form-data'}})
        )
    },

    saveProfileChanges(profileData: ProfileType) {
        return (
            instance.put(`profile`, {...profileData})
        )
    }



}

export const loginAPI = {

    loginUser(email:string, password:string, rememberMe:boolean, captcha:string) {
        return instance.post(`auth/login`, {email, password, rememberMe, captcha});
    },

    logoutUser() {
        return instance.delete(`auth/login`);
    }

}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`)
    }
}
