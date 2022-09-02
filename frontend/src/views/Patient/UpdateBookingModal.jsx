import { Avatar, Button, Center, Chip, Group, Indicator, LoadingOverlay, Modal, Text } from "@mantine/core";
import { Calendar } from "@mantine/dates";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

import { appConfig } from "../../config/appConfig";
import { useAuthData } from "../../stores/AuthContext";
import { useDoctorsData } from "../../stores/DoctorsContext";
import { capitalize } from "../../utils/string.utils";

const WORKING_HOURS_MIN_TIME_MINUTES = 7 * 60; // From 07
const WORKING_HOURS_MAX_TIME_MINUTES = 15 * 60; // Till 15

function excludeWeekends(date) {
    return date.getDay() === 0 || date.getDay() === 6;
}

function getReservedTimesInDay(date, reservedDates = []) {
    return reservedDates.filter((d) => d.isSame(date, "days"));
}

function getAvailableTimesInDay(date, reservedDates = []) {
    const reservedTimes = getReservedTimesInDay(date, reservedDates);

    const availableTimes = [];
    for (let i = WORKING_HOURS_MIN_TIME_MINUTES; i < WORKING_HOURS_MAX_TIME_MINUTES; i += 30) {
        const currentTime = dayjs(date)
            .hour(i / 60)
            .minute(i % 60);
        const isCurrentTimeReserved = reservedTimes.some((t) => t.isSame(currentTime, "minute"));
        availableTimes.push({ time: currentTime.format("HH:mm"), reserved: isCurrentTimeReserved });
    }

    return availableTimes;
}

export function UpdateBookingModal({ opened, doctor, onConfirm, onClose }) {
    const { user } = useAuthData();
    const { data: doctors } = useDoctorsData();

    const [confirmLoading, setConfirmLoading] = useState(false);
    const [reservationsLoading, setReservationsLoading] = useState(false);
    const [reservationDates, setReservationDates] = useState();

    const [selectedDate, setSelectedDate] = useState();
    const [selectedTime, setSelectedTime] = useState();

    useEffect(() => {
        if (!opened) {
            return;
        }

        setReservationsLoading(true);
        const fetchData = async () => {
            try {
                const response = await fetch(`${appConfig.apiUrl}/api/reservations/doctors/${doctor}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.accessToken}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();

                    setReservationDates(data.map(dayjs));
                } else {
                    setReservationDates([]);
                }
            } finally {
                setReservationsLoading(false);
            }
        };

        fetchData().catch(console.error);
    }, [opened, doctor]);

    const handleDateSelection = (date) => {
        setSelectedTime();
        setSelectedDate(date);
    };

    const handleOnClose = () => {
        onClose();
    };

    if (opened) {
        const resolveDoctor = doctors.find((it) => {
            if (it.id === doctor) {
                return it;
            }
        });

        return (
            <Modal centered title="Rezerviraj termin" opened={opened} onClose={onClose}>
                <LoadingOverlay visible={confirmLoading || reservationsLoading} />
                <Group position="center">
                    <Avatar src={resolveDoctor.avatar} size={48} radius={48} />
                    <div>
                        <Text size="xs" sx={{ textTransform: "uppercase" }} weight={700} color="dimmed">
                            {capitalize(resolveDoctor.speciality)}
                        </Text>

                        <Text size="lg" weight={500}>
                            {resolveDoctor.name}
                        </Text>
                    </div>
                </Group>

                <Center mt="lg">
                    <Calendar
                        value={selectedDate}
                        locale="hr"
                        onChange={handleDateSelection}
                        excludeDate={excludeWeekends}
                        allowLevelChange={false}
                        minDate={dayjs(new Date()).add(1, "days").toDate()}
                        maxDate={dayjs(new Date()).startOf("month").add(6, "months").toDate()}
                        renderDay={(date) => {
                            const day = date.getDate();
                            const hasReservations = reservationDates?.some((d) => d.isSame(date, "days"));
                            return (
                                <Indicator size={6} color="red" offset={8} disabled={!hasReservations}>
                                    <div>{day}</div>
                                </Indicator>
                            );
                        }}
                    />
                </Center>

                {selectedDate && (
                    <Center mt="lg">
                        <Chip.Group variant="filled" value={selectedTime} onChange={setSelectedTime}>
                            {getAvailableTimesInDay(selectedDate, reservationDates).map((t) => (
                                <Chip key={t.time} value={t.time} disabled={t.reserved}>
                                    {t.time}
                                </Chip>
                            ))}
                        </Chip.Group>
                    </Center>
                )}

                <Group position="right" mt="xl">
                    <Button variant="subtle" onClick={handleOnClose}>
                        Odustani
                    </Button>
                    <Button
                        disabled={!selectedDate && !selectedTime}
                        onClick={() => {
                            setConfirmLoading(true);
                            onConfirm({
                                date: dayjs(selectedDate).format("YYYY-MM-DD"),
                                time: selectedTime
                            }).finally(() => {
                                setConfirmLoading(false);
                            });
                        }}
                    >
                        Potvrdi
                    </Button>
                </Group>
            </Modal>
        );
    }
}
