import { IUser, IUserSignIn } from '../Entities/User';

export default interface IUserUseCases {
    signUp(signUp: IUser): Promise<{ user: IUser; error: Error }>;

    signIn(login: IUserSignIn): Promise<{ user: IUserSignIn; error: Error }>;

}