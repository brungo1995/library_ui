import * as utilities from '../../utilities/utilities';
import { IUser, IUserSignIn } from '../../Domain/Entities/User';

const UserAPI = {
    async signUp(user: IUser): Promise<{ user: IUser; error: Error; }> {
        try {
            let response = await utilities.postApiCall(`signup`, user);
            console.log("SIGN UP RAW API RESPONSE: =>", response.data)
            console.log("SIGN UP DATA API RESPONSE: =>", response.data.data)
            return { user: response.data.data, error: null };
        } catch (error) {
            return { user: null, error: new Error(`Could not sign up User`) }
        }
    },

    async signIn(user: IUserSignIn): Promise<{ user: IUserSignIn; error: Error; }> {
        try {
            let response = await utilities.postApiCall(`signin`, user);
            console.log("LOGIN RAW API RESPONSE: =>", response.data)
            console.log("LOGIN DATA API RESPONSE: =>", response.data.data)
            return { user: response.data.data, error: null };
        } catch (error) {
            return { user: null, error: new Error(`Could not Log in up User`) }
        }
    }

}

export default UserAPI;