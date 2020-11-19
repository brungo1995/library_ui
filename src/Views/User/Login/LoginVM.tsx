import React from "react";
import { IUserSignIn } from "../../../Domain/Entities/User";
import { AlertContext } from "../../../context_providers/alert_context";
import UserRepository from "../../../Data/Repositories/UserRepository";
import _ from "lodash";

function LoginVM({ history }) {
    const initialValue = {
        "username": "",
        "password": ""
    };
    const [item, setItem] = React.useState<IUserSignIn>(initialValue);
    const [masterItem, setMasterItem] = React.useState<IUserSignIn>(initialValue);
    const [isLoading, setLoading] = React.useState<boolean>(false);
    const Alert = React.useContext(AlertContext);
    const loginRepository = new UserRepository();

    // React.useEffect(() => {

    // }, []);

    async function login() {
        const { user, error } = await loginRepository.signIn(item);
        // setSubmitting(false);
        if (error) {
            console.log(error)
            // Alert.error(error.message);
            return;
        }
        console.log("LOGIN USER : => ", user)

        // Alert.info("User Created");
        // add token to local storage 
        //add user details to auth context
        history.replace(`/login`);
    }

    function onClear() {
        setItem(initialValue)
    }

    function onLogin() {
        console.log(isValidUser())
        if (isValidUser()) {
            login();
        }
    }


    function isValidUser() {
        let isValid = (!_.isEmpty(item.username) && !_.isEmpty(item.password) && item.password.length >= 5)
        // console.log("IS UsER VALID: => ", isValid)
        // console.log("IS UsER VALID: => ", item)
        return isValid;
    }

    function handleInputChange(e) {
        setItem({ ...item, [e.target.name]: e.target.value });
    }

    return {
        isLoading,
        item,
        onClear,
        handleInputChange,
        onLogin,
        isValidUser
    };
}

export default LoginVM;
