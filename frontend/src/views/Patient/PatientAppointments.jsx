import { Avatar, Box, Button, Container, Group, Paper, Table, Text, Title, ActionIcon, Divider, Tooltip } from "@mantine/core";
import dayjs from "dayjs";
import React, { useState } from "react";
import { UpdateBookingModal } from "./UpdateBookingModal";
import { ConfirmDeleteModal } from "../../components/shared/Modal/ConfirmDeleteModal";
import { showErrorNotification, showSuccessNotification } from "../../components/shared/notifications";
import { EmptySearch } from "../../components/shared/Search/EmptySearch";
import { appConfig } from "../../config/appConfig";
import { useAuthData } from "../../stores/AuthContext";
import { useDoctorsData } from "../../stores/DoctorsContext";
import { useReservationsData } from "../../stores/ReservationsContext";
import { ReservationStatus } from "../../utils/constants";
import { sortByDate } from "../../utils/date.utils";
import { capitalize } from "../../utils/string.utils";
import { Pencil, Trash } from "tabler-icons-react";
import { AppointmentStatus } from "./AppointmentStatus";

export function PatientAppointments() {
    const { user } = useAuthData();
    const { data: doctors } = useDoctorsData();
    const { data: reservations, loadReservations } = useReservationsData();

    const [modalOpened, setModalOpened] = useState(false);
    const [updateModalOpened, setUpdateModalOpened] = useState(false);
    const [reservationToCancel, setResevationToCancel] = useState();
    const [reservationToUpdate, setResevationToUpdate] = useState();

    const cancelReservation = async (reservationId) => {
        return fetch(`${appConfig.apiUrl}/api/reservations/${reservationId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.accessToken}`
            }
        })
            .then((res) => {
                if (res.ok) {
                    loadReservations();
                    showSuccessNotification({ message: "Uspješno ste otkazali pregled" });
                } else {
                    showErrorNotification({ message: "Dogodila se neočekivana pogreška" });
                }
            })
            .catch((error) => {
                showErrorNotification({ message: error.message });
            })
            .finally(() => {
                setModalOpened(false);
                setResevationToCancel(undefined);
            });
    };

    const handleBookingUpdate = async ({ date, time }, doctorId) => {
        console.log(reservationToUpdate.doctorId);
        const reservationData = {
            time: time,
            date: date,
            doctorId: reservationToUpdate.doctorId,
            uid: user.uid,
            reservationId: reservationToUpdate.id
        };

        try {
            const response = await fetch(`${appConfig.apiUrl}/api/reservations/updateAppointment`, {
                method: "PATCH",
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
            setUpdateModalOpened(false);
            setResevationToUpdate(undefined);
        }
    };
    if (!reservations || reservations.length === 0) {
        return <EmptySearch message="Nemate ugovorenih pregleda" />;
    }

    const resolveDoctor = (doctorId) => {
        return doctors.find((it) => it.id === doctorId);
    };

    const sortedReservations = reservations.sort((r1, r2) => {
        const day1 = dayjs(`${r1.date} ${r1.time}`);
        const day2 = dayjs(`${r2.date} ${r2.time}`);
        return sortByDate(day1, day2);
    });

    const rows = sortedReservations.map((reservation) => {
        const doctor = resolveDoctor(reservation.doctorId);
        console.log(reservation.doctorId);
        const canCancel = reservation.status === ReservationStatus.Waiting;

        return (
            <tr key={reservation.id}>
                <td>
                    <>
                        <Group noWrap={true}>
                            <Avatar size={40} radius="xl" src={doctor.avatar} />
                            <Box>
                                <Text size="sm" weight={600}>
                                    {doctor.name}
                                </Text>
                                <Text size="xs" color="dimmed">
                                    {doctor.address}, {doctor.city}
                                </Text>
                            </Box>
                        </Group>
                    </>
                </td>
                <td>
                    {reservation.date} {reservation.time}
                </td>
                <td>{capitalize(doctor.speciality)}</td>
                <td>
                    <AppointmentStatus status={reservation.status} />
                </td>
                <td>
                    {canCancel && (
                        <Group noWrap={true} spacing={0} position="right">
                            <Tooltip label="promjeni termin" color="blue" withArrow>
                                <ActionIcon onClick={() => handleUpdateModalOpened(reservation)}>
                                    <Pencil size={16} />
                                </ActionIcon>
                            </Tooltip>
                            <Tooltip label="otkaži termin" color="blue" withArrow>
                                <ActionIcon color="red" onClick={() => handleModalOpen(reservation)}>
                                    <Trash size={16} />
                                </ActionIcon>
                            </Tooltip>
                        </Group>
                    )}
                </td>
            </tr>
        );
    });

    const handleModalOpen = (reservation) => {
        setResevationToCancel(reservation);
        setModalOpened(true);
    };

    const handleModalClose = () => {
        setResevationToCancel(undefined);
        setModalOpened(false);
    };
    const handleUpdateModalOpened = (reservation) => {
        setResevationToUpdate(reservation);
        setUpdateModalOpened(true);
    };
    const handleUpdateModalClose = () => {
        setResevationToUpdate(undefined);
        setUpdateModalOpened(false);
    };
    console.log("reservationToCancel", reservationToCancel?.id);
    console.log("reservationToUpdate", reservationToUpdate?.id);
    console.log("doctorId", reservationToUpdate?.doctorId);
    return (
        <Container>
            <Title order={2} mt="lg">
                Moji pregledi
            </Title>
            <Paper shadow="xs" p="md" mt="lg">
                <Table sx={{ minWidth: 800 }} verticalSpacing="xs">
                    <thead>
                        <tr>
                            <th>Doktor</th>
                            <th>Datum</th>
                            <th>Vrsta pregleda</th>
                            <th>Status</th>
                            <th>Akcije</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>
                <ConfirmDeleteModal
                    opened={modalOpened}
                    title="Otkaži pregled"
                    description="Jeste li sigurni da želite otkazati pregled?"
                    confirmLabel="Otkaži"
                    onConfirm={() => cancelReservation(reservationToCancel.id, reservationToCancel.uid)}
                    onClose={() => handleModalClose()}
                />
                <UpdateBookingModal
                    opened={updateModalOpened}
                    doctor={reservationToUpdate?.doctorId}
                    onConfirm={handleBookingUpdate}
                    onClose={() => handleUpdateModalClose()}
                />
            </Paper>
        </Container>
    );
}
