import { Avatar, Button, Group, Paper, Text } from "@mantine/core";
import React, { useState } from "react";
import { Home } from "tabler-icons-react";

import { showErrorNotification, showSuccessNotification } from "../../components/shared/notifications";
import { appConfig } from "../../config/appConfig";
import { useAuthData } from "../../stores/AuthContext";
import { capitalize } from "../../utils/string.utils";

import { DoctorBookingModal } from "./DoctorBookingModal";

export function DoctorCard({ doctor, disabled }) {
    const { user } = useAuthData();

    const [modalOpened, setModalOpened] = useState(false);

    const handleBookingConfirm = async ({ date, time }) => {
        const reservationData = {
            time: time,
            date: date,
            doctorId: doctor.id,
            uid: user.uid
        };
        try {
            const response = await fetch(`${appConfig.apiUrl}/api/reservations`, {
                method: "POST",
                body: JSON.stringify(reservationData),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.accessToken}`
                }
            });

            if (response.ok) {
                showSuccessNotification({ message: "Uspješno ste rezervirali termin" });
            } else {
                showErrorNotification({ message: "Neočekivana greška prilikom rezervacije termina" });
            }
        } finally {
            setModalOpened(false);
        }
    };

    return (
        <Paper shadow="xs" p="md" mb="md">
            <Group position="apart">
                <Group noWrap>
                    <Avatar src={doctor.avatar} size={94} radius={94} />
                    <div>
                        <Text size="xs" sx={{ textTransform: "uppercase" }} weight={700} color="dimmed">
                            {capitalize(doctor.speciality)}
                        </Text>

                        <Text size="lg" weight={500}>
                            {doctor.name}
                        </Text>

                        <Group noWrap spacing={6} mt={3}>
                            <Home size={16} color="#adb5bd" />
                            <Text size="xs" color="dimmed">
                                {doctor.address}, {doctor.city}
                            </Text>
                        </Group>
                    </div>
                </Group>
                <Button variant="outline" mr="md" disabled={disabled} onClick={() => setModalOpened(true)}>
                    Rezerviraj termin
                </Button>
                <DoctorBookingModal opened={modalOpened} doctor={doctor} onConfirm={handleBookingConfirm} onClose={() => setModalOpened(false)} />
            </Group>
        </Paper>
    );
}
