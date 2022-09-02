import { child, get } from "firebase/database";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Login } from "tabler-icons-react";
import { appConfig } from "../config/appConfig";

import { firebaseDbRef } from "../services/firebase";
import { Role } from "../utils/constants";

import { useAuthData } from "./AuthContext";

const ReservationsContext = createContext();

export function useReservationsData() {
    const context = useContext(ReservationsContext);
    if (context === undefined) {
        throw new Error("useReservationsData must be used within a ReservationsProvider");
    }
    return context;
}

export function ReservationsProvider({ children }) {
    const { user, userRole } = useAuthData();

    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    const isRolePatient = userRole === Role.Patient;
    const isRoleDoctor = userRole === Role.Doctor;

    const loadReservations = async () => {
        setLoading(true);

        if (isRolePatient) {
            return fetch(`${appConfig.apiUrl}/api/reservations/patient-reservation`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.accessToken}`
                }
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data) {
                        const transformedData = [];
                        console.log(data);
                        for (const [, value] of Object.entries(data)) {
                            transformedData.push(value);
                        }
                        setData(transformedData);
                    } else {
                        setData([]);
                    }
                })
                .catch((error) => {
                    console.error(error);
                    setError(error.message);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else if (isRoleDoctor) {
            return fetch(`${appConfig.apiUrl}/api/reservations`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.accessToken}`
                }
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data) {
                        setData(data);
                        console.log(data);
                    } else {
                        setData([]);
                    }
                })
                .catch((error) => {
                    console.error(error);
                    setError(error.message);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
            return setData([]);
        }
    };

    // For patient fetch all reservations which belong to the patient
    useEffect(() => {
        if (!user?.uid || !isRolePatient) {
            return;
        }

        loadReservations();
    }, [user?.uid]);

    // For doctor fetch all reservations which belong to the doctor
    useEffect(() => {
        if (isRolePatient) {
            return;
        }

        loadReservations();
    }, [user?.uid]);

    const value = {
        data,
        loading,
        error,
        loadReservations
    };

    return <ReservationsContext.Provider value={value}>{children}</ReservationsContext.Provider>;
}
