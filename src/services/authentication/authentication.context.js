import React, { useState, createContext } from "react";

import { loginRequest } from "./authentication.service";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const onLogin = (email, password) => {
        loginRequest(email, password).then((u) => {
            setUser(u);
            setIsLoading(false);
        }
        ).catch((e) => {
            setIsLoading(false);
            setError(e);
        });
    };

    return (
        <AuthenticationContext.Provider value={{
            user,
            isLoading,
            error,
            onLogin,
        }}>
            {children}
        </AuthenticationContext.Provider>
    );
};