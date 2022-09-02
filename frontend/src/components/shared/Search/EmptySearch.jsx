import { Container, Text } from "@mantine/core";
import React from "react";
import { Telescope } from "tabler-icons-react";

import classes from "./EmptySearch.module.scss";

export function EmptySearch({ message }) {
    return (
        <Container className={classes.container}>
            <div className={classes.icon}>
                <Telescope size={64} strokeWidth={1} color="#797b8d" />
            </div>
            <Text size="xl">{message}</Text>
        </Container>
    );
}
