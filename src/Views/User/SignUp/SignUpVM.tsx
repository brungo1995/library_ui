import React from "react";
import { IUser } from "../../../Domain/Entities/User";
import { AlertContext } from "../../../context_providers/alert_context";
import UserRepository from "../../../Data/Repositories/UserRepository";
import _ from "lodash";

function UserDetailVM({ history }) {
    const initialValue = {
        "email": "",
        "name": "",
        "username": "",
        "password": ""
    };
    const [item, setItem] = React.useState<IUser>(initialValue);
    const [masterItem, setMasterItem] = React.useState<IUser>(initialValue);
    const [isLoading, setLoading] = React.useState<boolean>(false);
    const Alert = React.useContext(AlertContext);
    const loginRepository = new UserRepository();

    // React.useEffect(() => {

    // }, []);

    async function signUp() {
        const { user, error } = await loginRepository.signUp(item);
        // setSubmitting(false);
        if (error) {
            console.log(error)
            // Alert.error(error.message);
            return;
        }
        console.log("SIGN UP USER : => ", user)

        // Alert.info("User Created");
        history.replace(`/signin`);
    }

    function onCancel() {

    }

    function onSignUp() {
        console.log(isValidUser())
        if (isValidUser()) {
            signUp();
        }
    }

    const isValidEmail = (email) => {
        const regEx = /\S+@\S+\.\S+/;
        return regEx.test(email);
    };


    function isValidUser() {
        let isValid = (!_.isEmpty(item.name) && !_.isEmpty(item.username) && isValidEmail(item.email) && !_.isEmpty(item.password) && item.password.length >= 5)
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
        onCancel,
        handleInputChange,
        onSignUp,
        isValidUser
    };
}

export default UserDetailVM;
