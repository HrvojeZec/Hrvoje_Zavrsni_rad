import { Badge, Space } from "@mantine/core";
import React from "react";
import { AlertOctagon, AlertTriangle, ExclamationMark } from "tabler-icons-react";
import { ReservationStatus } from "../../utils/constants";

export function AppointmentStatus({ status }) {
    switch (status) {
        case ReservationStatus.Waiting:
            return (
                <Badge color="yellow" variant="dot">
                    Čeka odobrenje
                </Badge>
            );
        case ReservationStatus.Approved:
            return (
                <Badge color="blue" variant="dot">
                    Odobren
                </Badge>
            );
        case ReservationStatus.Completed:
            return (
                <Badge color="green" variant="dot">
                    Završen
                </Badge>
            );
        case ReservationStatus.Canceled:
            return (
                <Badge color="red" variant="dot">
                    Otkazan
                </Badge>
            );
        case ReservationStatus.Denied:
            return (
                <>
                    <Badge color="red" variant="dot">
                        Odbijeno
                    </Badge>
                </>
            );
        case ReservationStatus.Expired:
            return (
                <>
                    <Badge color="dark" variant="dot">
                        Isteklo
                    </Badge>
                </>
            );
    }

    return null;
}
