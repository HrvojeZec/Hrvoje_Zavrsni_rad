import { Button, Group, Indicator, Text } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";
import { useAllReferralsData } from "../../stores/AllReferralsContext";

import { useAuthData } from "../../stores/AuthContext";

import { useReservationsData } from "../../stores/ReservationsContext";
import { ReservationStatus, Role } from "../../utils/constants";
import { Brand } from "../shared/Brand/Brand";

import classes from "./Header.module.scss";
import { UserMenu } from "./UserMenu";

export function Header() {
    const { userRole } = useAuthData();
    const { data: reservations } = useReservationsData();
    const { data: referrals } = useAllReferralsData();
    const isRolePatient = userRole === Role.Patient;
    const isRoleDoctor = userRole === Role.Doctor;
    const isRoleFamilyDoctor = userRole === Role.FamilyDoctor;

    const activeReservations = reservations.filter((r) => r.status === ReservationStatus.Approved || r.status === ReservationStatus.Waiting);
    const waitingReservations = reservations.filter((r) => r.status === ReservationStatus.Waiting);

    return (
        <header className={classes.header}>
            <Brand />
            <Group spacing={64}>
                <nav>
                    <ul>
                        {isRoleFamilyDoctor && (
                            <li>
                                <Indicator
                                    label={
                                        <Text size="xs" weight="bold">
                                            {referrals.length}
                                        </Text>
                                    }
                                    color="orange"
                                    size={20}
                                    offset={8}
                                >
                                    <Button size="md" component={Link} to="/referrals" className={classes.navLink}>
                                        Uputnice
                                    </Button>
                                </Indicator>
                            </li>
                        )}
                        {isRoleDoctor && (
                            <li>
                                <Indicator
                                    label={
                                        <Text size="xs" weight="bold">
                                            {waitingReservations.length}
                                        </Text>
                                    }
                                    color="orange"
                                    size={20}
                                    offset={8}
                                >
                                    <Button size="md" component={Link} to="/requests" className={classes.navLink}>
                                        Zahtjevi za pregled
                                    </Button>
                                </Indicator>
                            </li>
                        )}
                        {isRolePatient && (
                            <li>
                                <Button size="md" component={Link} to="/doctors" className={classes.navLink}>
                                    Doktori
                                </Button>
                            </li>
                        )}
                        {isRolePatient && (
                            <li>
                                <Indicator
                                    label={
                                        <Text size="xs" weight="bold">
                                            {activeReservations.length}
                                        </Text>
                                    }
                                    color="orange"
                                    size={20}
                                    offset={8}
                                >
                                    <Button size="md" component={Link} to="/appointments" className={classes.navLink}>
                                        Pregledi
                                    </Button>
                                </Indicator>
                            </li>
                        )}
                    </ul>
                </nav>
                <UserMenu />
            </Group>
        </header>
    );
}
