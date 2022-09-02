import { Group, Title } from "@mantine/core";
import clsx from "clsx";
import React from "react";

import classes from "./Brand.module.scss";
import { BrandLogo } from "./BrandLogo";

export function Brand({ size = "md", color }) {
    return (
        <Group spacing={8} style={{ color: color }}>
            <BrandLogo size={size} />
            <Title order={1} className={clsx(classes.name, classes[size])}>
                e-Naručivanje
            </Title>
        </Group>
    );
}
