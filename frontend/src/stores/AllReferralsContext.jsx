import React, { createContext, useContext, useEffect, useState } from "react";
import { appConfig } from "../config/appConfig";

import { useAuthData } from "./AuthContext";

const AllReferralsContext = createContext();
export function useAllReferralsData() {
    const context = useContext(AllReferralsContext);
    if (context === undefined) {
        throw new Error("useAllReferralData must be used within a AllReferralProvider");
    }
    return context;
}
export function AllReferralsProvider({ children }) {
    const [data, setData] = useState();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const { user } = useAuthData();

    useEffect(() => {
        if (!user?.accessToken) {
            return;
        }

        setLoading(true);

        fetch(`${appConfig.apiUrl}/api/referrals`, {
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
    }, [user?.accessToken]);

    const value = {
        data,
        loading,
        error
    };

    return <AllReferralsContext.Provider value={value}>{children}</AllReferralsContext.Provider>;
}

export default AllReferralsContext;
