import * as axios from "axios";

const instance = axios.create({  // смотреть документацию axios
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {"API-KEY": "f45e24aa-313d-43a7-9a41-723231b39786"}
})

export const usersAPI = {

    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    },

    unfollowAPI(userId) {
        return (
            instance.delete(`follow/${userId}`).then(response => response.data)
        )
    },

    followAPI(userId) {
        return (
            instance.post(`follow/${userId}`, null).then(response => response.data)
        )
    }

}

export const profileAPI = {

    getMyProfile() {

        return (
            instance.get(`auth/me`)
                .then(response => {
                    if (response.data.resultCode === 0) {
                        return response.data.data.id
                    }
                })
                // .then(userId => instance.get(`profile/${userId}`))
                // .then(response => response.data)
        )
    },

    getProfile(userId) {
        return (
            instance.get(`profile/${userId}`).then(response => response.data)
        )
    },

    getStatus(userId) {

        return (
            instance.get(`profile/status/${userId}`)
                .then(status => status.data)
        )
    },

    updateStatus(status) {
        return (
            instance.put(`profile/status`, {status: status})
        )
    },

    saveAvatar(avatarFile) {
        const formData = new FormData();
        formData.append("image", avatarFile);
        return (
            instance.put(`profile/photo`, formData, {headers: {'Content-Type': 'multipart/form-data'}})
        )
    },

    saveProfileChanges(profileData) {
        return (
            instance.put(`profile`, {...profileData})
        )
    }



}

export const loginAPI = {

    loginUser(email, password, rememberMe, captcha) {
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
