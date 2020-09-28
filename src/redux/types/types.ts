

export type Types = {
    aboutMe: string | null,
    contacts: {
        facebook: string | null,
        website: string | null,
        vk: string | null,
        twitter: string | null,
        instagram: string | null,
        youtube: string | null,
        github: string | null,
        mainLink: string | null
    },
    lookingForAJob: boolean,
    lookingForAJobDescription: string | null,
    fullName: string,
    userId: number,
    photos: {
        small: any,
        large: any
    }
}

export type UserType = {
    name: string | null,
    id: number,
    uniqueUrlName: string | null,
    photos: {
        "small": string | null,
        "large": string | null
    },
    status: string | null,
    followed: boolean
}

export type FriendsDataType = {
    id: number | null
    name: string | null
    avatar: string | null
    messages: Array<string>
}