import React from "react";
import { IUserSignIn } from "../../../Domain/Entities/User";
import { AlertContext } from "../../../context_providers/alert_context";
import { UserContext } from "../../../context_providers/user_provider";
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
    const [wrongEmailOrPassword, setWrongEmailOrPassword] = React.useState<boolean>(false);
    const Alert = React.useContext(AlertContext);
    const { setUser } = React.useContext(UserContext);
    const loginRepository = new UserRepository();



    async function login() {
        const { user, error } = await loginRepository.signIn(item);
        // setSubmitting(false);
        if (error) {
            setWrongEmailOrPassword(true)
            console.log(error)
            // Alert.error(error.message);
            return;
        }

        // setUser(user)
        // setWrongEmailOrPassword(false)

        if (user && user.token) {
            setUser(user)
            setWrongEmailOrPassword(false)
            //add user details to auth context
            // history.replace(`/`);
            history.replace(`/category`);
        } else {
            history.replace(`/signin`);
        }

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
        wrongEmailOrPassword,
        onClear,
        handleInputChange,
        onLogin,
        isValidUser
    };
}

export default LoginVM;
