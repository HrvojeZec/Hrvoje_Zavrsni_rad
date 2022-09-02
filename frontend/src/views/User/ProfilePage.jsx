import React from "react";

import { Layout } from "../../components/layout/Layout";
import { DataProviders } from "../../stores/DataProviders";

import { Profile } from "./Profile";

export function ProfilePage() {
    return (
        <DataProviders>
            <Layout>
                <Profile />
            </Layout>
        </DataProviders>
    );
}
