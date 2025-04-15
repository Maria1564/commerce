export type UserModel = {
  login: string;
  username: string;
};

export type UserApi = {
  email: string;
  username: string;
};

export const normalizeUserApi = (from: UserApi): UserModel => ({ login: from.email, username: from.username });
