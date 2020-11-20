import UserAPI from "../Datasources/UserAPI";
import { IUser, IUserSignIn } from '../../Domain/Entities/User';
import IUserUseCases from '../../Domain/Usecases/UserUseCases';

export default class UserRepository implements IUserUseCases {
    async signUp(user: IUser): Promise<{ user: IUser; error: any; }> {
        return await UserAPI.signUp(user);
    }

    async signIn(user: IUserSignIn): Promise<{ user: IUserSignIn; error: any; }> {
        return await UserAPI.signIn(user);
    }

    async getUser(): Promise<{ user: IUser; error: any }> {
        return await UserAPI.getUser();
    }
}