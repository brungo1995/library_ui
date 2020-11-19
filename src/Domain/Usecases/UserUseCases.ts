import { IUser } from '../Entities/User';

export default interface IUserUseCases {
    signUp(signUp: IUser): Promise<{ user: IUser; error: Error }>;

    // loadSignUp(signUpId: string): Promise<{ signUp: IUser; error: Error }>;

    // loadCategories(searchPayload: ISearchSignUp): Promise<{ categories: IUser[]; count: number, error: Error }>;

    // removeSignUp(signUpId: string): Promise<{ error: Error }>;

    // updateSignUp(signUp: IUser): Promise<{ signUp: IUser; error: Error }>;
}