import * as utilities from '../../utilities/utilities';
import { IUser, IUserSignIn } from '../../Domain/Entities/User';

function saveUserToken(user: IUserSignIn) {
    if (user && user.token)
        localStorage.setItem("token", user.token);
}

const UserAPI = {
    async signUp(user: IUser): Promise<{ user: IUser; error: any; }> {
        try {
            let response = await utilities.postApiCall(`signup`, user);
            return { user: response.data.data, error: null };
        } catch (error) {
            // console.log("SIGN UP ERROR NAme: => ", error.name)
            // console.log("SIGN UP ERROR Message: => ", error.message)
            // console.log("SIGN UP ERROR ERROR: => ", error.error)
            // console.log("SIGN UP ERROR : => ", error)
            // debugger
            // console.log("SIGN UP ERROR : => ", error.data)

            console.log("SIGN UP ERROR : => ", error.response.data.error)
            return { user: null, error: new Error(error.response.data.error || `Could not sign up User`) }
        }
    },

    async signIn(user: IUserSignIn): Promise<{ user: IUserSignIn; error: any; }> {
        try {
            let response = await utilities.postApiCall(`signin`, user);
            console.log("LOGIN RAW API RESPONSE: =>", response.data)
            console.log("LOGIN DATA API RESPONSE: =>", response.data.data);
            saveUserToken(response.data.data)
            return { user: response.data.data, error: null };
        } catch (error) {
            return { user: null, error: new Error(`Could not Log in up User`) }
        }
    },


    async getUser(): Promise<{ user: IUser; error: any; }> {
        try {
            let response = await utilities.getApiCall(`user`);
            console.log("GET USER RESPONSE: =>", response.data)
            console.log("GET USER DATA API RESPONSE: =>", response.data.data);
            return { user: response.data.data, error: null };
        } catch (error) {
            return { user: null, error: new Error(`Could not Get user up User`) }
        }
    }

}

export default UserAPI;