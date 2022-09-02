import React from "react";
import { Navigate } from "react-router-dom";

import { useAuthData } from "../stores/AuthContext";

export function ProtectedRoute({ role, children }) {
    const { user, userRole, userLoading } = useAuthData();

    if (!user && !userLoading) {
        return <Navigate to="/signin" replace />;
    }

    if (role && role !== userRole) {
        return <Navigate to="/home" replace />;
    }

    return children;
}
