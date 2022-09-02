import React from "react";
import { Navigate } from "react-router-dom";

import { FullscreenLoader } from "../components/shared/Loader/FullscreenLoader";
import { useAuthData } from "../stores/AuthContext";
import { Role } from "../utils/constants";

export function RedirectHandler() {
    const { user, userRole, userLoading } = useAuthData();

    if (!user && !userLoading) {
        return <Navigate to="/signin" replace />;
    }

    if (userRole === Role.FamilyDoctor) {
        return <Navigate to="/referrals" replace />;
    }

    if (userRole === Role.Doctor) {
        return <Navigate to="/requests" replace />;
    }

    if (userRole === Role.Patient) {
        return <Navigate to="/appointments" replace />;
    }

    return <FullscreenLoader />;
}
