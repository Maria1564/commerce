
export type UserModel = {
    login: string
}

export type UserApi = {
    email: string
}

export const normalizeUserApi = (from: UserApi): UserModel => ({login: from.email})