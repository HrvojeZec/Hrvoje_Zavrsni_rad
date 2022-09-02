import { child, get } from "firebase/database";
import React, { createContext, useContext, useEffect, useState } from "react";
import { appConfig } from "../config/appConfig";

import { firebaseDbRef } from "../services/firebase";
import { useAuthData } from "./AuthContext";

const DoctorsContext = createContext();

export function useDoctorsData() {
    const context = useContext(DoctorsContext);
    if (context === undefined) {
        throw new Error("useDoctorsData must be used within a DoctorsProvider");
    }
    return context;
}

export function DoctorsProvider({ children }) {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const { user } = useAuthData();

    useEffect(() => {
        if (!user?.accessToken) {
            return;
        }

        setLoading(true);

        fetch(`${appConfig.apiUrl}/api/doctors`, {
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

    return <DoctorsContext.Provider value={value}>{children}</DoctorsContext.Provider>;
}
