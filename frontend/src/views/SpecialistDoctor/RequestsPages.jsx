import React from "react";
import { Layout } from "../../components/layout/Layout";
import Requests from "./Requests";
import { DataProviders } from "../../stores/DataProviders";
function RequestsPages() {
    return (
        <DataProviders>
            <Layout>
                <Requests />
            </Layout>
        </DataProviders>
    );
}

export default RequestsPages;
