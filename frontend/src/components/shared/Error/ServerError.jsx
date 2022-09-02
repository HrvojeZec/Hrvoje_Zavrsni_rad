import { Alert, Button, Container, createStyles, Group, Text, Title } from "@mantine/core";
import React from "react";
import { AlertCircle } from "tabler-icons-react";

import classes from "./ServerError.module.scss";

export function ServerError({ error }) {
    return (
        <Container size={660} my={120}>
            <div className={classes.label}>500</div>
            <Title align="center" className={classes.title}>
                Dogodila se neočekivana pogreška
            </Title>
            {error && (
                <Alert className={classes.alert} icon={<AlertCircle size={32} />} color="red" variant="outline">
                    {error}
                </Alert>
            )}
            <Group position="center">
                <Button variant="default" size="sm" onClick={() => window.location.reload()}>
                    Osvježite stranicu
                </Button>
            </Group>
        </Container>
    );
}
