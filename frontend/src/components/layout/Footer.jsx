import { ActionIcon, Anchor, Group, Text } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";
import { BrandInstagram, BrandTwitter, BrandYoutube } from "tabler-icons-react";

import { BrandLogo } from "../shared/Brand/BrandLogo";

import classes from "./Footer.module.scss";

const links = [
    { label: "O nama", link: "#" },
    { label: "Kontakt", link: "#" }
];

export function Footer() {
    const items = links.map((link) => (
        <Anchor key={link.label} color="dimmed" underline={false} component={Link} to={link.link} sx={{ lineHeight: 1 }} size="sm">
            {link.label}
        </Anchor>
    ));

    return (
        <footer className={classes.footer}>
            <div className={classes.inner}>
                <Group spacing={8}>
                    <BrandLogo size={20} />
                    <Text size="sm">e-Naručivanje &copy; 2022</Text>
                </Group>

                <Group spacing={24} className={classes.links}>
                    {items}
                </Group>

                <Group spacing={0} position="right" noWrap>
                    <ActionIcon size="lg">
                        <BrandTwitter size={18} />
                    </ActionIcon>
                    <ActionIcon size="lg">
                        <BrandYoutube size={18} />
                    </ActionIcon>
                    <ActionIcon size="lg">
                        <BrandInstagram size={18} />
                    </ActionIcon>
                </Group>
            </div>
        </footer>
    );
}
