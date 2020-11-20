import React, { useState, createContext } from 'react';
import { IUser } from "../Domain/Entities/User"
import { useHistory, useParams, useLocation } from "react-router-dom";

export const UserContext = createContext(null);

export function AccountProvider({ children = null }: React.PropsWithChildren<{}>) {
    const initialValue = {
        "email": "",
        "name": "",
        "username": ""
    };

    const [user, setUser] = useState(initialValue);
    const history = useHistory();

    function logOut(cb) {
        localStorage.removeItem("token");
        setUser(initialValue);
        cb();
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