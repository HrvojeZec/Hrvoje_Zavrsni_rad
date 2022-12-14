import React, { useRef, useState } from "react";
import { useForm } from "@mantine/form";
import { appConfig } from "../../config/appConfig";
import classes from "./DoctorsReferral.module.scss";
import { useAuthData } from "../../stores/AuthContext";
import { ArrowDown } from "tabler-icons-react";
import { Container, TextInput, ActionIcon, NumberInput, Paper, Button, Textarea, Space } from "@mantine/core";
import { Search, ArrowRight } from "tabler-icons-react";
import { Layout } from "../../components/layout/Layout";
import { DataProviders } from "../../stores/DataProviders";
import { showErrorNotification, showSuccessNotification } from "../../components/shared/notifications";

function NewDoctorsReferral(props) {
    const { user } = useAuthData();
    const [name, setName] = useState("");
    const [oib, setOib] = useState("");
    const [datum, setDatum] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [telephone, setTelephone] = useState("");
    const [id, setId] = useState("");
    const [speciality, setSpeciality] = useState("");
    const [description, setDescription] = useState("");
    const [searchValue, setSearchValue] = useState();
    const [foundUser, setFoundUser] = useState();
    const [edit, setEditing] = useState(false);
    const token = user.accessToken;

    const handleSearch = async (e) => {
        e.stopPropagation();
        console.log(searchValue);
        try {
            const mboUser = await fetch(`${appConfig.apiUrl}/api/referrals/mbo?mbo=${searchValue}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token
                }
            })
                .then((res) => res.json())
                .then((data) => {
                    setName(data.name);
                    setOib(data.oib);
                    setDatum(data.dateOfBirth);
                    setAddress(data.address);
                    setEmail(data.email);
                    setTelephone(data.phoneNumber);
                    setId(data.uid);
                });

            if (!mboUser) {
                setSearchValue(`Pacijent s unesenim MBO brojem: "${searchValue}" nije prona??en`);
            }
            setEditing(true);
            setFoundUser(mboUser);
        } catch (error) {
            console.log(error);
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const current = new Date();

        const date = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`;
        console.log(id, date, speciality, description);
        const referralData = {
            uid: id,
            speciality: speciality,
            description: description,
            dateCreated: date
        };
        console.log(referralData);
        console.log(token);

        const response = await fetch(`${appConfig.apiUrl}/api/referrals/data`, {
            method: "POST",
            body: JSON.stringify(referralData),
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }
        });
        if (response.ok) {
            showSuccessNotification({ message: "Uspje??no ste rezervirali termin" });
        } else {
            showErrorNotification({ message: "Neo??ekivana gre??ka prilikom rezervacije termina" });
        }
        setEditing(false);
    };

    return (
        <DataProviders>
            <Layout>
                <Container>
                    <Paper withBorder shadow="md" p={30} radius="md" my="lg">
                        <NumberInput
                            p={15}
                            label="MBO"
                            icon={<Search size={18} />}
                            value={searchValue}
                            size="md"
                            rightSection={
                                <ActionIcon color="primary" size={32} radius="xl" variant="filled" onClick={handleSearch}>
                                    <ArrowRight size={18} />
                                </ActionIcon>
                            }
                            placeholder="Prona??i pacijenta putem mbo broja"
                            rightSectionWidth={42}
                            onChange={setSearchValue}
                        />
                        {edit && (
                            <div>
                                <form className={classes.form}>
                                    <TextInput
                                        disabled
                                        label="Ime"
                                        placeholder="Va??e ime"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.currentTarget.value)}
                                    />
                                    <Space h="md" />
                                    <TextInput disabled label="OIB" placeholder="Va?? OIB" value={oib} onChange={(e) => setOib(e.currentTarget.value)} />
                                    <Space h="md" />
                                    <TextInput disabled label="Datum ro??enja" value={datum} onChange={(e) => setDatum(e.currentTarget.value)} />
                                    <Space h="md" />
                                    <TextInput
                                        disabled
                                        label="Adresa"
                                        placeholder="Va??a adresa"
                                        value={address}
                                        onChange={(e) => setAddress(e.currentTarget.value)}
                                    />
                                    <Space h="md" />
                                    <TextInput
                                        disabled
                                        label="Email"
                                        placeholder="Va??a email adresa"
                                        value={email}
                                        onChange={(e) => setEmail(e.currentTarget.value)}
                                    />
                                    <Space h="md" />
                                    <TextInput
                                        disabled
                                        label="Broj telefona"
                                        placeholder="Va?? broj telefona"
                                        value={telephone}
                                        onChange={(e) => setTelephone(e.currentTarget.value)}
                                    />
                                    <Space h="xl" />

                                    <TextInput
                                        label="Upu??uje se"
                                        required
                                        component="select"
                                        rightSection={<ArrowDown size={20} strokeWidth={2} color={"#4076bf"} />}
                                        value={speciality}
                                        onChange={(e) => setSpeciality(e.currentTarget.value)}
                                    >
                                        <option value="dermatovenerolog">Dermatovenerolog</option>
                                        <option value="op??i kirurg">Op??i kirurg</option>
                                        <option value="anesteziolog">Anesteziolog</option>
                                        <option value="stomatolog">Stomatolog</option>
                                        <option value="ginekolog">Ginekolog</option>
                                        <option value="otorinolaringolog">Otorinolaringolog</option>
                                        <option value="oftalmolog">Oftalmolog</option>
                                    </TextInput>

                                    <Space h="xl" />
                                    <Textarea
                                        placeholder="Opis dijagnoze"
                                        label="Uputna dijagnoza"
                                        required
                                        value={description}
                                        onChange={(e) => setDescription(e.currentTarget.value)}
                                    />
                                    <Space h="md" />
                                    <Button onClick={submitHandler}>Izradi</Button>
                                </form>
                            </div>
                        )}
                    </Paper>
                </Container>
            </Layout>
        </DataProviders>
    );
}

export default NewDoctorsReferral;
