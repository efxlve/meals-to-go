import React, { useState, createContext, useRef } from "react";

import {
    signOut,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    getAuth,
} from "firebase/auth";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const auth = useRef(getAuth()).current;

    const getFriendlyErrorMessage = (errorCode) => {
        switch (errorCode) {
            case "auth/invalid-email":
                return "Invalid email address";
            case "auth/user-not-found":
                return "No user found with this email address";
            case "auth/wrong-password":
                return "Incorrect password entered";
            case "auth/email-already-in-use":
                return "This email address is already in use";
            case "auth/weak-password":
                return "Password is too weak, please choose a stronger password";
            case "auth/too-many-requests":
                return "Too many failed login attempts. Please try again later.";
            default:
                return "An error occurred. Please try again.";
        }
    };

    onAuthStateChanged(auth, (usr) => {
        if (usr) {
            setUser(usr);
            setIsLoading(false);
        } else {
            setIsLoading(false);
        }
    });

    const onLogin = (email, password) => {
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((u) => {
                setUser(u);
                setIsLoading(false);
            })
            .catch((e) => {
                setIsLoading(false);
                setError(getFriendlyErrorMessage(e.code));
            });
    };

    const onRegister = (email, password, repeatedPassword) => {
        setIsLoading(true);
        if (password !== repeatedPassword) {
            setError("Passwords do not match");
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then((u) => {
                setUser(u);
                setIsLoading(false);
            })
            .catch((e) => {
                setIsLoading(false);
                setError(getFriendlyErrorMessage(e.code));
            });
    };

    const onLogout = () => {
        signOut(auth).then(() => {
            setUser(null);
            setError(null);
        });
    };

    return (
        <AuthenticationContext.Provider
            value={{
                isAuthenticated: !!user,
                user,
                isLoading,
                error,
                onLogin,
                onRegister,
                onLogout,
            }}
        >
            {children}
        </AuthenticationContext.Provider>
    );
};