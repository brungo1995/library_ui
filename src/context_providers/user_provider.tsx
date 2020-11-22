import React, { useState, useEffect, createContext } from 'react';
import { useHistory, useParams, useLocation } from "react-router-dom";
import UserRepository from "../Data/Repositories/UserRepository";

export const UserContext = createContext(null);

export function AccountProvider({ children = null }: React.PropsWithChildren<{}>) {

    const initialValue = {
        "email": "",
        "name": "",
        "username": ""
    };
    const [user, setUser] = useState(initialValue);
    const history = useHistory();
    const userRepository = new UserRepository();

    useEffect(() => {
        if (getToken()) {
            getUserDetails()
        }
    }, [])



    function logOut(cb) {
        localStorage.removeItem("token");
        setUser(initialValue);
        cb();
    }

    async function getUserDetails() {
        try {
            let { user, error } = await userRepository.getUser();
            setUser(user)
        } catch (error) {

        }

    }

    function getToken() {
        let token = localStorage.getItem("token");
        return token || null;

    }

    return (
        <UserContext.Provider
            value={{
                logOut,
                setUser,
                getToken,
                user,
            }}>
            {children}
        </UserContext.Provider>
    );

};