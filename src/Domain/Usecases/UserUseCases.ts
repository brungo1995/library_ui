import { IUser, IUserSignIn } from '../Entities/User';

export default interface IUserUseCases {
    signUp(signUp: IUser): Promise<{ user: IUser; error: any }>;

    signIn(login: IUserSignIn): Promise<{ user: IUserSignIn; error: any }>;

    getUser(): Promise<{ user: IUser; error: any }>;

}