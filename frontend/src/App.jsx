import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import "dayjs/locale/hr";
import dayjs from "dayjs";
import React from "react";
import { Route, Routes } from "react-router-dom";
import ReferralPage from "./views/FamilyDoctor/ReferralPage";
import { ProtectedRoute } from "./routing/ProtectedRoute";
import { RedirectHandler } from "./routing/RedirectHandler";
import { AuthProvider } from "./stores/AuthContext";
import { ForgotPasswordPage } from "./views/Auth/ForgotPasswordPage";
import { SignInPage } from "./views/Auth/SignInPage";
import { SignUpPage } from "./views/Auth/SignUpPage";
import { DoctorsListPage } from "./views/Doctor/DoctorsListPage";
import { PatientAppointmentsPage } from "./views/Patient/PatientAppointmentsPage";
import { ProfilePage } from "./views/User/ProfilePage";
import RequestsPages from "./views/SpecialistDoctor/RequestsPages";
import NewDoctorsReferral from "./views/FamilyDoctor/NewDoctorsReferral";

// Set dayjs locale globally
dayjs.locale("hr");

export default function App() {
    return (
        <MantineProvider
            theme={{
                fontFamily: "Inter, sans-serif",
                primaryShade: 9
            }}
            withGlobalStyles
            withNormalizeCSS
        >
            <NotificationsProvider position="top-right">
                <AuthProvider>
                    <Routes>
                        <Route exact path="/" element={<RedirectHandler />} />
                        <Route path="/signin" element={<SignInPage />} />
                        <Route path="/signup" element={<SignUpPage />} />
                        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                        <Route
                            path="/profile"
                            element={
                                <ProtectedRoute>
                                    <ProfilePage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/referrals"
                            element={
                                <ProtectedRoute>
                                    <ReferralPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/newReferrals"
                            element={
                                <ProtectedRoute>
                                    <NewDoctorsReferral />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/doctors"
                            element={
                                <ProtectedRoute role="patient">
                                    <DoctorsListPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/appointments"
                            element={
                                <ProtectedRoute>
                                    <PatientAppointmentsPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/requests"
                            element={
                                <ProtectedRoute>
                                    <RequestsPages />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </AuthProvider>
            </NotificationsProvider>
        </MantineProvider>
    );
}
