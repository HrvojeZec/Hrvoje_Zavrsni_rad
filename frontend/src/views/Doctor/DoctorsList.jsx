import { Checkbox, Container, Group, Input, Select, Title } from "@mantine/core";
import React, { useState } from "react";

import { EmptySearch } from "../../components/shared/Search/EmptySearch";
import { useDoctorsData } from "../../stores/DoctorsContext";
import { useReferralData } from "../../stores/ReferralContext";
import { capitalize } from "../../utils/string.utils";

import { DoctorCard } from "./DoctorCard";

function sortDoctors(doctors) {
    return doctors.sort((d1, d2) => {
        if (d1.doctorId < d2.doctorId) {
            return -1;
        }
        if (d1.doctorId > d2.doctorId) {
            return 1;
        }
        return 0;
    });
}

function getUniqueSpecialities(doctors) {
    const specialities = doctors.map((d) => d.speciality);
    const uniqueSpecialities = [...new Set(specialities)];
    return uniqueSpecialities.sort();
}

function filterOnlyWithReferrals(doctors, userReferrals) {
    const userReferralSpecialities = [];

    for (const userReferral of userReferrals) {
        if (!userReferralSpecialities.includes(userReferral.speciality)) {
            userReferralSpecialities.push(userReferral.speciality);
        }
    }

    return doctors.filter((d) => userReferralSpecialities.includes(d.speciality));
}

function filterBySpeciality(doctors, speciality) {
    return doctors.filter((d) => d.speciality === speciality);
}

export function DoctorsList() {
    const { data: doctors } = useDoctorsData();
    const { data: userReferrals } = useReferralData();
    const [selectedSpeciality, setSelectedSpeciality] = useState(null);
    const [onlyWithRefferal, setOnlyWithRefferal] = useState(false);

    if (!doctors || doctors.length === 0) {
        return <EmptySearch message="Ne postoje zapisi o doktorima" />;
    }

    const sortedDoctors = sortDoctors(doctors);
    const specialities = getUniqueSpecialities(sortedDoctors);
    const filteredDoctors = onlyWithRefferal
        ? filterOnlyWithReferrals(sortedDoctors, userReferrals)
        : selectedSpeciality
        ? filterBySpeciality(sortedDoctors, selectedSpeciality)
        : sortedDoctors;

    return (
        <Container>
            <Title order={2} my="lg">
                Doktori
            </Title>
            <Group my="md" spacing="xl">
                <Select
                    label="Filtriraj po specijalizaciji:"
                    value={selectedSpeciality}
                    data={specialities.map((s) => ({ value: s, label: capitalize(s) }))}
                    placeholder="Odaberi..."
                    clearable={true}
                    onChange={(value) => setSelectedSpeciality(value)}
                />
                <Input.Wrapper label="Filtriraj po uputnicama:">
                    <Checkbox
                        checked={onlyWithRefferal}
                        label="Samo specijalizacije za koje imam uputnicu"
                        onChange={(event) => {
                            setOnlyWithRefferal(event.currentTarget.checked);
                            setSelectedSpeciality(null);
                        }}
                    />
                </Input.Wrapper>
            </Group>
            {filteredDoctors.map((doctor) => {
                const hasReferalForDoctorSpeciality = userReferrals.some((ref) => ref.speciality === doctor.speciality);
                return <DoctorCard key={doctor.id} doctor={doctor} disabled={!hasReferalForDoctorSpeciality} />;
            })}
        </Container>
    );
}
