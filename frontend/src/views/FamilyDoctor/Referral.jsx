import React from "react";
import { Button, Container, Paper, Table, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import classes from "./DoctorsReferral.module.scss";
import { useAllReferralsData } from "../../stores/AllReferralsContext";

function Referral() {
    const { data: referrals } = useAllReferralsData();

    const rows = referrals.map((patientReferral) => {
        return (
            <tr key={`${patientReferral.id}`}>
                <td>{patientReferral.userMbo}</td>
                <td>{patientReferral.userEmail}</td>
                <td>{patientReferral.dateCreated}</td>
                <td>{patientReferral.speciality}</td>
                <td>{patientReferral.description}</td>
            </tr>
        );
    });
    return (
        <Container>
            <Title order={2} mt="lg">
                Uputnice od pacijenata
                <Button className={classes.button} position="right">
                    <Link to={"/newReferrals"}>kreiraj novu uputnicu</Link>
                </Button>
            </Title>
            <Paper shadow="xs" p="md" mt="lg">
                <Table sx={{ minWidth: 800 }} verticalSpacing="xs">
                    <thead>
                        <tr>
                            <th>MBO</th>
                            <th>Email</th>
                            <th>Vrijeme kreiranja</th>
                            <th>Vrsta pregleda</th>
                            <th>Opis uputnice</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>
            </Paper>
        </Container>
    );
}

export default Referral;
