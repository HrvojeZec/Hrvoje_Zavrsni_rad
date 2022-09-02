import React, { createContext, useContext, useEffect, useState } from "react";
import { appConfig } from "../config/appConfig";

import { useAuthData } from "./AuthContext";

const ReferralContext = createContext();
export function useReferralData() {
    const context = useContext(ReferralContext);
    if (context === undefined) {
        throw new Error("useReferralData must be used within a ReferralProvider");
    }
    return context;
}
export function ReferralProvider({ children }) {
    const [data, setData] = useState();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const { user } = useAuthData();

    useEffect(() => {
        if (!user?.uid || !user?.accessToken) {
            return;
        }

        setLoading(true);

        fetch(`${appConfig.apiUrl}/api/referrals/${user.uid}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.accessToken}`
            }
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
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

    const value = {
        data,
        loading,
        error
    };

    return <ReferralContext.Provider value={value}>{children}</ReferralContext.Provider>;
}

export default ReferralContext;
