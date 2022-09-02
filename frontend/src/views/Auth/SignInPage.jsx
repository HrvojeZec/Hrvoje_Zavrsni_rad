import { Alert, Anchor, Box, Button, Center, Container, Group, Paper, PasswordInput, Text, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AlertCircle, Heartbeat } from "tabler-icons-react";

import { Brand } from "../../components/shared/Brand/Brand";
import { useAuthData } from "../../stores/AuthContext";

export function SignInPage() {
    const { signInUser } = useAuthData();
    const navigate = useNavigate();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const form = useForm({
        initialValues: {
            email: "",
            password: ""
        }
    });

    const handleSubmit = async ({ email, password }) => {
        setError("");
        setLoading(true);

        try {
            await signInUser(email, password);
            navigate("/");
        } catch (error) {
            setError("Uneseni podaci nisu ispravni");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container size={460} my={120}>
            <Center mb="xl">
                <Brand size="lg" color="#555" />
            </Center>
            <Paper withBorder shadow="md" p={30} radius="md">
                <Title order={2} align="center" mb={32}>
                    Prijava korisnika
                </Title>

                {error && (
                    <Alert icon={<AlertCircle size={16} />} color="red" mb="lg">
                        {error}
                    </Alert>
                )}

                <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                    <TextInput
                        {...form.getInputProps("email")}
                        required
                        label="Email"
                        onChange={(event) => {
                            setError("");
                            form.setFieldValue("email", event.currentTarget.value);
                        }}
                    />
                    <PasswordInput
                        {...form.getInputProps("password")}
                        required
                        mt="md"
                        label="Lozinka"
                        onChange={(event) => {
                            setError("");
                            form.setFieldValue("password", event.currentTarget.value);
                        }}
                    />

                    <Group position="left" mt="xs">
                        <Anchor color="gray" component={Link} to="/forgot-password" size="xs">
                            Zaboravili ste lozinku?
                        </Anchor>
                    </Group>

                    <Button type="submit" fullWidth mt="xl" loading={loading}>
                        Prijavi se
                    </Button>

                    <Text size="sm" align="center" mt="lg">
                        Još nemate svoj račun?{" "}
                        <Anchor component={Link} to="/signup" size="sm">
                            Registriraj se
                        </Anchor>
                    </Text>
                </form>
            </Paper>
        </Container>
    );
}
