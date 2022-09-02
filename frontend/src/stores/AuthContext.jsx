import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { appConfig } from "../config/appConfig";
import { firebaseAuth } from "../services/firebase";
import { Role } from "../utils/constants";

const AuthContext = createContext();

export function useAuthData() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuthData must be used within a AuthProvider");
    }
    return context;
}

let signUpInProcess = false;

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [userLoading, setUserLoading] = useState(true);

    const navigate = useNavigate();

    // Subsribe to authentication method on Firebase
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
            if (currentUser) {
                setUser({
                    uid: currentUser.uid,
                    email: currentUser.email,
                    displayName: currentUser.displayName,
                    photoURL: currentUser.photoURL,
                    accessToken: currentUser.accessToken
                });
            } else {
                setUser(null);
            }

            setUserLoading(false);

            if (!signUpInProcess) {
                navigate("/");
            }
        });
        return () => unsubscribe();
    }, []);

    // Fetch user role once user is signed in
    useEffect(() => {
        if (!user) {
            return;
        }

        fetch(`${appConfig.apiUrl}/api/roles`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.accessToken}`
            }
        })
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    console.log(data);
                    setUserRole(data);
                } else {
                    setUserRole(Role.Patient);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, [user]);

    const signUpUser = async (name, email, password, mbo) => {
        signUpInProcess = true;
        const newUser = await createUserWithEmailAndPassword(firebaseAuth, email, password);
        await updateUserProfile(newUser.user, name);
        await assignPatientRole(newUser.user);
        return createPerson(newUser.user, name, mbo);
    };

    const updateUserProfile = (newUser, name) => {
        return updateProfile(newUser, {
            displayName: name
        });
    };

    const createPerson = async (newUser, name, mbo) => {
        const { uid, email } = newUser;

        const personData = {
            uid,
            name,
            email,
            mbo
        };

        await fetch(`${appConfig.apiUrl}/api/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${newUser.accessToken}`
            },
            body: JSON.stringify(personData)
        });
    };

    const assignPatientRole = async (newUser) => {
        await fetch(`${appConfig.apiUrl}/api/roles/assign-patient-role`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${newUser.accessToken}`
            }
        });
    };

    const signInUser = (email, password) => {
        return signInWithEmailAndPassword(firebaseAuth, email, password);
    };

    const signOut = () => {
        setUser(null);
        setUserRole(null);
        return firebaseAuth.signOut();
    };

    const resetPassword = (email) => {
        return sendPasswordResetEmail(firebaseAuth, email);
    };

    const finishUserSignUp = () => {
        signUpInProcess = false;
    };

    const value = useMemo(
        () => ({
            user,
            userRole,
            userLoading,
            signUpUser,
            signInUser,
            signOut,
            resetPassword,
            finishUserSignUp
        }),
        [user, userRole, userLoading]
    );

    console.log("AuthContext - user", user, userRole, userLoading);
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
