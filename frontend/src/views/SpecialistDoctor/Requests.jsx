import React, { useState } from "react";
import { Button, Container, Paper, Table, Title, Grid, Group, Space } from "@mantine/core";
import { useAuthData } from "../../stores/AuthContext";
import { useReservationsData } from "../../stores/ReservationsContext";
import { AppointmentStatus } from "../Patient/AppointmentStatus";
import { ReservationStatus } from "../../utils/constants";
import { ConfirmDeleteModal } from "../../components/shared/Modal/ConfirmDeleteModal";
import { ConfirmAcceptModal } from "../../components/shared/Modal/ConfirmAcceptModal";
import { appConfig } from "../../config/appConfig";
import { showErrorNotification, showSuccessNotification } from "../../components/shared/notifications";

import { sortByDate } from "../../utils/date.utils";
import dayjs from "dayjs";
import { Check } from "tabler-icons-react";

function Requests() {
    const { data: reservations, loadReservations } = useReservationsData();
    const { user } = useAuthData();

    const [modalOpened, setModalOpened] = useState(false);
    const [updateModalOpened, setUpdateModalOpened] = useState(false);
    const [completeModalOpened, setCompleteModalOpened] = useState(false);
    const [reservationToCancel, setResevationToCancel] = useState();
    const [reservationToUpdate, setResevationToUpdate] = useState();
    const [reservationToComplete, setResevationToComplete] = useState();

    const confirmReservation = async (reservationId, userId) => {
        return fetch(`${appConfig.apiUrl}/api/reservations/doctor-confirm/${reservationId}`, {
            method: "PATCH",
            body: JSON.stringify({
                patientId: userId
            }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.accessToken}`
            }
        })
            .then((res) => {
                if (res.ok) {
                    loadReservations();
                    showSuccessNotification({ message: "Uspješno ste potvrdili termin" });
                } else {
                    showErrorNotification({ message: "Dogodila se neočekivana pogreška" });
                }
            })
            .catch((error) => {
                showErrorNotification({ message: error.message });
            })
            .finally(() => {
                setUpdateModalOpened(false);
                setResevationToUpdate(undefined);
            });
    };
    const completeReservation = async (reservationId, userId) => {
        return fetch(`${appConfig.apiUrl}/api/reservations/doctor-complete/${reservationId}`, {
            method: "PATCH",
            body: JSON.stringify({
                patientId: userId
            }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.accessToken}`
            }
        })
            .then((res) => {
                if (res.ok) {
                    loadReservations();
                    showSuccessNotification({ message: "Uspješno ste potvrdili termin" });
                } else {
                    showErrorNotification({ message: "Dogodila se neočekivana pogreška" });
                }
            })
            .catch((error) => {
                showErrorNotification({ message: error.message });
            })
            .finally(() => {
                setCompleteModalOpened(false);
                setResevationToComplete(undefined);
            });
    };

    const cancelReservation = async (reservationId, userId) => {
        return fetch(`${appConfig.apiUrl}/api/reservations/doctors-cancle/${reservationId}`, {
            method: "DELETE",
            body: JSON.stringify({
                patientId: userId
            }),
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

    const sortedReservations = reservations.sort((r1, r2) => {
        const day1 = dayjs(`${r1.date} ${r1.time}`);
        const day2 = dayjs(`${r2.date} ${r2.time}`);
        return sortByDate(day1, day2);
    });

    const rows = sortedReservations.map((reservation) => {
        const canApproved = reservation.status === ReservationStatus.Waiting;
        const finished = reservation.status === ReservationStatus.Approved;
        const Completed = reservation.status === ReservationStatus.Completed;
        console.log(reservation);
        return (
            <tr key={reservation.id}>
                {canApproved && (
                    <>
                        <td>{reservation.userMbo}</td>
                        <td>{reservation.userEmail}</td>
                        <td>
                            {reservation.date} {reservation.time}
                        </td>
                        <td>
                            <AppointmentStatus status={reservation.status} />
                        </td>
                        <td>
                            <Grid gutter="xl">
                                <Grid.Col span={4}>
                                    <Button variant="outline" size="xs" color="green" onClick={() => handleUpdateModalOpened(reservation)}>
                                        Potvrdi
                                    </Button>
                                </Grid.Col>
                                <Space w="xs" />
                                <Grid.Col span={4}>
                                    <Button variant="outline" size="xs" color="red" onClick={() => handleModalOpen(reservation)}>
                                        Otkaži
                                    </Button>
                                </Grid.Col>
                            </Grid>
                        </td>
                    </>
                )}
                {finished && (
                    <>
                        <td>{reservation.userMbo}</td>
                        <td>{reservation.userEmail}</td>
                        <td>
                            {reservation.date} {reservation.time}
                        </td>

                        <td>
                            <AppointmentStatus status={reservation.status} />
                        </td>
                        <td>
                            <Grid gutter="sm">
                                <Grid.Col span={4}>
                                    <Button variant="outline" size="xs" color="blue" onClick={() => handleCompleteModalOpened(reservation)}>
                                        Završi
                                    </Button>
                                </Grid.Col>
                            </Grid>
                        </td>
                    </>
                )}
                {Completed && (
                    <>
                        <td>{reservation.userMbo}</td>
                        <td>{reservation.userEmail}</td>
                        <td>
                            {reservation.date} {reservation.time}
                        </td>
                        <td>
                            <AppointmentStatus status={reservation.status} />
                        </td>
                        <td>
                            <div>
                                <Group spacing={0}>
                                    <Check size={20} strokeWidth={3} color={"#2d8643"} />
                                </Group>
                            </div>
                        </td>
                    </>
                )}
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
    const handleCompleteModalOpened = (reservation) => {
        setResevationToComplete(reservation);
        setCompleteModalOpened(true);
    };
    const handleCompleteModalClose = () => {
        setResevationToComplete(undefined);
        setCompleteModalOpened(false);
    };
    console.log("reservationToCancel", reservationToCancel?.id);
    console.log("reservationToCancel", reservationToCancel?.uid);
    console.log("reservationToUpdate", reservationToUpdate?.id);
    console.log("reservationToComplete", reservationToComplete?.id);
    console.log("doctorId", reservationToUpdate?.doctorId);
    return (
        <Container>
            <Title order={2} mt="lg">
                Zahtjevi za pregled
            </Title>
            <Paper shadow="xs" p="md" mt="lg">
                <Table sx={{ minWidth: 800 }} verticalSpacing="xs">
                    <thead>
                        <tr>
                            <th>MBO</th>
                            <th>Email</th>
                            <th>Datum</th>
                            <th>Status</th>
                            <th>Akcije</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>
                <ConfirmDeleteModal
                    opened={modalOpened}
                    title="Potvrdi pregled"
                    description="Jeste li sigurni da želite odkazati pregled?"
                    confirmLabel="Potvrdi"
                    onConfirm={() => cancelReservation(reservationToCancel.id, reservationToCancel.uid)}
                    onClose={() => handleModalClose()}
                />
                <ConfirmAcceptModal
                    opened={updateModalOpened}
                    title="Potvrdi pregled"
                    description="Jeste li sigurni da želite potvrditi pregled?"
                    confirmLabel="Potvrdi"
                    onConfirm={() => confirmReservation(reservationToUpdate.id, reservationToUpdate.uid)}
                    onClose={() => handleUpdateModalClose()}
                />
                <ConfirmAcceptModal
                    opened={completeModalOpened}
                    title="Dovrši pregled"
                    description="Jeste li sigurni da je pregled odrađen?"
                    confirmLabel="Potvrdi"
                    onConfirm={() => completeReservation(reservationToComplete.id, reservationToComplete.uid)}
                    onClose={() => handleCompleteModalClose()}
                />
            </Paper>
        </Container>
    );
}

export default Requests;
