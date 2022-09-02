import { Alert, Anchor, Button, Center, Checkbox, Container, Group, NumberInput, Paper, PasswordInput, Text, TextInput, Title } from "@mantine/core";
import { joiResolver, useForm } from "@mantine/form";
import Joi from "joi";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AlertCircle } from "tabler-icons-react";

import { Brand } from "../../components/shared/Brand/Brand";
import { useAuthData } from "../../stores/AuthContext";

const schema = Joi.object({
    name: Joi.string().min(3).message("Ime mora sadržavati minimalno 3 slova"),
    email: Joi.string()
        .required()
        .email({ minDomainSegments: 2, tlds: { allow: false } })
        .message("Email nije ispravan"),
    password: Joi.string().required().min(8).message("Lozinka ne sadrži potreban broj znakova: 8"),
    repeatPassword: Joi.any().valid(Joi.ref("password")).required().messages({
        "any.only": "Lozinke nisu jednake"
    }),
    mbo: Joi.string().custom((value, helper) => {
        if (value.length !== 9) {
            return helper.message("MBO mora imati 9 znakova");
        }
        return true;
    })
}).with("password", "repeatPassword");

export function SignUpPage() {
    const { signUpUser, finishUserSignUp } = useAuthData();
    const navigate = useNavigate();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const form = useForm({
        schema: joiResolver(schema),
        initialValues: {
            name: "",
            email: "",
            password: "",
            repeatPassword: "",
            mbo: ""
        }
    });

    const handleSubmit = async ({ name, email, password, mbo }) => {
        setError("");
        setLoading(true);

        try {
            await signUpUser(name, email, password, mbo);
            console.log("gotov");
            navigate("/");
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
            finishUserSignUp();
        }
    };

    return (
        <Container size={460} my={120}>
            <Center mb="xl">
                <Brand size="lg" color="#555" />
            </Center>
            <Paper withBorder shadow="md" p={30} radius="md">
                <Title order={2} align="center" mb={32}>
                    Registracija korisnika
                </Title>

                {error && (
                    <Alert icon={<AlertCircle size={16} />} color="red" mb="lg">
                        {error}
                    </Alert>
                )}

                <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                    {/*  <Group direction="column" grow> */}
                    <TextInput {...form.getInputProps("name")} label="Ime" placeholder="Vaše ime" />
                    <TextInput {...form.getInputProps("mbo")} label="mbo" mt="md" placeholder=" Vaš MBO" />
                    <TextInput {...form.getInputProps("email")} required label="Email" mt="md" placeholder="primjer@email.hr" />
                    <PasswordInput {...form.getInputProps("password")} required label="Lozinka (minimalno 8 znakova)" mt="md" placeholder="Vaša lozinka" />
                    <PasswordInput {...form.getInputProps("repeatPassword")} required label="Ponovljena lozinka" mt="md" placeholder="Ponovite vašu lozinku" />
                    {/*  </Group> */}

                    <Button type="submit" fullWidth mt="xl" loading={loading}>
                        Pošalji podatke
                    </Button>

                    <Text size="sm" align="center" mt="lg">
                        Već imate korisnički račun?{" "}
                        <Anchor component={Link} to="/signin" size="sm">
                            Prijavi se
                        </Anchor>
                    </Text>
                </form>
            </Paper>
        </Container>
    );
}
