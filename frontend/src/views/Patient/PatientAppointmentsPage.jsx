import React from "react";

import { Layout } from "../../components/layout/Layout";
import { DataProviders } from "../../stores/DataProviders";

import { PatientAppointments } from "./PatientAppointments";

export function PatientAppointmentsPage() {
    return (
        <DataProviders>
            <Layout>
                <PatientAppointments />
            </Layout>
        </DataProviders>
    );
}
