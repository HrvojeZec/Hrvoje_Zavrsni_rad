import { child, get, set, update } from "firebase/database";
import React, { createContext, useContext, useEffect, useState } from "react";
import { appConfig } from "../config/appConfig";

import { firebaseDbRef } from "../services/firebase";

import { useAuthData } from "./AuthContext";

const PersonContext = createContext();

export function usePersonData() {
    const context = useContext(PersonContext);
    if (context === undefined) {
        throw new Error("usePersonData must be used within a PersonProvider");
    }
    return context;
}

export function PersonProvider({ children }) {
    const { user } = useAuthData();

    const [data, setData] = useState();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        if (!user?.uid || !user?.accessToken) {
            return;
        }

        setLoading(true);

        fetch(`${appConfig.apiUrl}/api/users/${user.uid}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.accessToken}`
            }
        })
            .then((res) => res.json())
            .then((data) => {
                setData(data);
            })
            .catch((error) => {
                console.error(error);
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [user?.uid, user?.accessToken]);

    const updateProfile = async (profileData) => {
        return update(child(firebaseDbRef, `users/${user.uid}`), profileData);
    };

    const value = {
        data,
        loading,
        error,
        updateProfile
    };

    return <PersonContext.Provider value={value}>{children}</PersonContext.Provider>;
}
