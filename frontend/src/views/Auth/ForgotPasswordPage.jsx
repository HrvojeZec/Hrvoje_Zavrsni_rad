import { Alert, Anchor, Box, Button, Center, Container, Group, Paper, Text, TextInput, Title } from "@mantine/core";
import { joiResolver, useForm } from "@mantine/form";
import Joi from "joi";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AlertCircle, ArrowLeft } from "tabler-icons-react";

import { Brand } from "../../components/shared/Brand/Brand";
import { useAuthData } from "../../stores/AuthContext";

const schema = Joi.object({
    email: Joi.string()
        .required()
        .email({ minDomainSegments: 2, tlds: { allow: false } })
        .message("Email nije ispravan")
});

export function ForgotPasswordPage() {
    const { resetPassword } = useAuthData();

    const [errorMessage, setErrorMessage] = useState("");
    const [infoMessage, setInfoMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const form = useForm({
        schema: joiResolver(schema),
        initialValues: {
            email: ""
        }
    });

    const handleSubmit = async ({ email }) => {
        setErrorMessage("");
        setLoading(true);

        try {
            await resetPassword(email);
            setInfoMessage("Provjerite vaš email za daljnje upute");
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container size={480} my={120}>
            <Center mb="xl">
                <Brand size="lg" color="#555" />
            </Center>
            <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
                <Title align="center">Zaboravili ste lozinku?</Title>
                <Container size={320}>
                    <Text color="dimmed" size="sm" align="center" mt="sm" mb="lg">
                        Unesite vaš email kako biste dobili link za resetiranje vaše lozinke.
                    </Text>
                </Container>

                {errorMessage && (
                    <Alert icon={<AlertCircle size={16} />} color="red" mb="lg">
                        {errorMessage}
                    </Alert>
                )}

                {infoMessage && (
                    <Alert icon={<AlertCircle size={16} />} mb="lg">
                        {infoMessage}
                    </Alert>
                )}

                <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                    <TextInput {...form.getInputProps("email")} label="Vaš email" placeholder="primjer@email.hr" required />

                    <Group position="apart" mt="lg">
                        <Anchor component={Link} to="/signin" color="dimmed" size="sm">
                            <Center inline>
                                <ArrowLeft size={12} />
                                <Box ml={5}>Vrati se na prijavu</Box>
                            </Center>
                        </Anchor>
                        <Button type="submit" loading={loading}>
                            Resetiraj lozinku
                        </Button>
                    </Group>
                </form>
            </Paper>
        </Container>
    );
}
