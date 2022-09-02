import { Alert, Button, Container, Grid, Group, LoadingOverlay, Paper, Text, TextInput, Title } from "@mantine/core";
import { joiResolver, useForm } from "@mantine/form";
import dayjs from "dayjs";
import Joi from "joi";
import React, { useState } from "react";
import { AlertCircle, Edit } from "tabler-icons-react";

import { DateOfBirthSelect } from "../../components/shared/Form/DateOfBirthSelect";
import { usePersonData } from "../../stores/PersonContext";
import { isOibValid } from "../../utils/validations";

const MIN_AGE_YEARS = 18;
const maxDatePickerDate = dayjs().startOf("day").subtract(MIN_AGE_YEARS, "years").toDate();

const schema = Joi.object({
    name: Joi.string().min(3).message("Ime mora sadržavati minimalno 3 znaka"),
    oib: Joi.string().custom((value, helper) => {
        if (value.length !== 11) {
            return helper.message("OIB mora imati 11 znakova");
        }

        return true;
    }),
    dateOfBirth: Joi.date().max(maxDatePickerDate).message("Datum rođenja nije ispravan"),
    address: Joi.string().min(5).message("Adresa mora sadržavati minimalno 5 znakova"),
    phoneNumber: Joi.string()
        .min(10)
        .message("Broj telefona mora imati minimalno 10 znakova")
        .pattern(/^[+ 0-9]+$/)
        .message("Broj telefona nije ispravnog formata")
}).unknown();

export function Profile() {
    const { data: person, updateProfile } = usePersonData();

    const [editing, setEditing] = useState(false);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

    const form = useForm({
        schema: joiResolver(schema),
        initialValues: {
            ...person,
            dateOfBirth: dayjs(person.dateOfBirth).toDate()
        }
    });

    const handleSubmit = async (values) => {
        setError("");
        setLoading(true);

        const profileUpdateData = {
            ...values,
            dateOfBirth: dayjs(values.dateOfBirth).format("YYYY-MM-DD")
        };

        try {
            await updateProfile(profileUpdateData);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
            setEditing(false);
        }
    };

    return (
        <Container>
            <Title order={2} my="lg">
                Moj profil
            </Title>
            <Paper withBorder shadow="md" p={30} radius="md">
                <LoadingOverlay visible={loading} />

                <Group position="right" md="md">
                    {!editing && (
                        <Button variant="light" leftIcon={<Edit size={14} />} onClick={() => setEditing(true)}>
                            Uredi podatke
                        </Button>
                    )}
                </Group>

                {error && (
                    <Alert icon={<AlertCircle size={16} />} color="red" mb="lg">
                        {error}
                    </Alert>
                )}

                <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                    <Grid>
                        <Grid.Col span={6}>
                            <TextInput {...form.getInputProps("name")} label="Ime" placeholder="Vaše ime" required readOnly={!editing} />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput {...form.getInputProps("oib")} label="OIB" placeholder="Vaš OIB" readOnly={!editing} />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <DateOfBirthSelect {...form.getInputProps("dateOfBirth")} label="Datum rođenja" minYears={MIN_AGE_YEARS} readOnly={!editing} />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput {...form.getInputProps("address")} label="Adresa" placeholder="Vaša adresa" readOnly={!editing} />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput {...form.getInputProps("email")} disabled label="Email" placeholder="Vaša email adresa" readOnly={!editing} />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput {...form.getInputProps("phoneNumber")} label="Broj telefona" placeholder="Vaš broj telefona" readOnly={!editing} />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput {...form.getInputProps("mbo")} label="mbo" disabled placeholder="mbo" readOnly={!editing} />
                        </Grid.Col>
                    </Grid>

                    {editing && (
                        <Group position="right" mt="lg">
                            <Button
                                variant="subtle"
                                onClick={() => {
                                    form.reset();
                                    setEditing(false);
                                }}
                            >
                                Odustani
                            </Button>
                            <Button type="submit">Spremi promjene</Button>
                        </Group>
                    )}
                </form>
            </Paper>
        </Container>
    );
}
