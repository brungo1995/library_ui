import * as Yup from 'yup';

export interface IUser {
    user_id?: string;
    name: string;
    username: string;
    email: string;
    password: string;
    token?: string;
}

export interface IUserSignIn {
    user_id?: string;
    username: string;
    email?: string;
    password: string;
    token?: string;
}
