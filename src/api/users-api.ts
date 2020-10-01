import {DataItems, instance, MyResponseType, ResultCode} from "./api";

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


export const usersAPI = {

    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get<DataItems<UsersType>>(`users?page=${currentPage}&count=${pageSize}`)
            .then((response) => {
                return response.data
            })
    },

    unfollowAPI(userId: number) {
        return (
            instance.delete<MyResponseType>(`follow/${userId}`).then((response) => response.data)
        )
    },

    followAPI(userId: number) {
        return (
            instance.post<MyResponseType>(`follow/${userId}`, null).then((response) => response.data)
        )
    }

}