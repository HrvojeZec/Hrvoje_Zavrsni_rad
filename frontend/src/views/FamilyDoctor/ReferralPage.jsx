import React from "react";
import { Layout } from "../../components/layout/Layout";
import { DataProviders } from "../../stores/DataProviders";
import Referral from "./Referral";
function ReferralPage() {
    return (
        <DataProviders>
            <Layout>
                <Referral />
            </Layout>
        </DataProviders>
    );
}

export default ReferralPage;
