import React from "react";

import { ServerError } from "../components/shared/Error/ServerError";
import { FullscreenLoader } from "../components/shared/Loader/FullscreenLoader";

import { DoctorsProvider, useDoctorsData } from "./DoctorsContext";
import { PersonProvider, usePersonData } from "./PersonContext";
import { ReservationsProvider, useReservationsData } from "./ReservationsContext";
import { ReferralProvider, useReferralData } from "./ReferralContext";
import { UsersProvider, useUsersData } from "./GetAllUsers";
import { AllReferralsProvider, useAllReferralsData } from "./AllReferralsContext";

function DataProvidersInner({ children }) {
    const { loading: usersLoading, error: usersError } = useUsersData();
    const { loading: personLoading, error: personError } = usePersonData();
    const { loading: doctorsLoading, error: doctorsError } = useDoctorsData();
    const { loading: reservationsLoading, error: reservationsError } = useReservationsData();
    const { loading: referralLoading, error: referralError } = useReferralData();
    const { loading: allReferralsLoading, error: allReferralsError } = useAllReferralsData();

    console.log(usersLoading, personLoading, doctorsLoading, reservationsLoading, referralLoading, allReferralsLoading);
    if (usersLoading || personLoading || doctorsLoading || reservationsLoading || referralLoading || allReferralsLoading) {
        return <FullscreenLoader />;
    }

    if (usersError || personError || doctorsError || reservationsError || referralError) {
        return <ServerError error={personError || doctorsError || reservationsError || referralError || allReferralsError} />;
    }

    return children;
}

export function DataProviders({ children }) {
    return (
        <UsersProvider>
            <PersonProvider>
                <DoctorsProvider>
                    <ReservationsProvider>
                        <ReferralProvider>
                            <AllReferralsProvider>
                                <DataProvidersInner>{children}</DataProvidersInner>
                            </AllReferralsProvider>
                        </ReferralProvider>
                    </ReservationsProvider>
                </DoctorsProvider>
            </PersonProvider>
        </UsersProvider>
    );
}
