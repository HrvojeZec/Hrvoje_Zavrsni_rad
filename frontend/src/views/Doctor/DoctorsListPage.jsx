import React from "react";

import { Layout } from "../../components/layout/Layout";
import { DataProviders } from "../../stores/DataProviders";

import { DoctorsList } from "./DoctorsList";

export function DoctorsListPage() {
    return (
        <DataProviders>
            <Layout>
                <DoctorsList />
            </Layout>
        </DataProviders>
    );
}
