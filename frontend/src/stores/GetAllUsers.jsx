import { child, get, set, update } from "firebase/database";
import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "tabler-icons-react";
import { appConfig } from "../config/appConfig";

import { firebaseDbRef } from "../services/firebase";

import { useAuthData } from "./AuthContext";

const UsersContext = createContext();

export function useUsersData() {
    const context = useContext(UsersContext);
    if (context === undefined) {
        throw new Error("usePersonData must be used within a PersonProvider");
    }
    return context;
}

export function UsersProvider({ children }) {
    const [data, setData] = useState();
    const { user } = useAuthData();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        if (!user?.accessToken) {
            return;
        }

        setLoading(true);

        fetch(`${appConfig.apiUrl}/api/users/get`, {
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
    }, [user?.accessToken]);

    const value = {
        data,
        loading,
        error
    };

    return <UsersContext.Provider value={value}>{children}</UsersContext.Provider>;
}
