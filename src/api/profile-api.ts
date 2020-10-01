import {ProfileType} from "../redux/types/types";
import {instance, MyResponseType, ResultCode, ResultCodeForCaptcha} from "./api";

type AuthUserType = {
    id: number,
    login: string,
    email: string
}
type SaveAvatar = {
    photos: {
        small: string
        large: string
    }
}

export type StatusType = string

export const profileAPI = {

    getMyProfile() {

        return (
            instance.get<MyResponseType<AuthUserType>>(`auth/me`)
                .then((response) => {
                    if (response.data.resultCode === ResultCode.Success) {
                        return response.data.data.id
                    }
                })
            // .then(userId => instance.get(`profile/${userId}`))
            // .then(response => response.data)
        )
    },

    getProfile(userId: number) {
        return (
            instance.get<ProfileType>(`profile/${userId}`).then((response) => response.data)
        )
    },

    getStatus(userId: number) {

        return (
            instance.get<StatusType>(`profile/status/${userId}`)
                .then((status) => status.data)
        )
    },

    updateStatus(status: string) {
        return (
            instance.put<MyResponseType>(`profile/status`, {status: status})
        )
    },

    saveAvatar(avatarFile: any) {
        const formData = new FormData();
        formData.append("image", avatarFile);
        return (
            instance.put<MyResponseType<SaveAvatar>>(`profile/photo`, formData, {headers: {'Content-Type': 'multipart/form-data'}})
        )
    },

    saveProfileChanges(profileData: ProfileType) {
        return (
            instance.put<MyResponseType>(`profile`, {...profileData})
        )
    }


}