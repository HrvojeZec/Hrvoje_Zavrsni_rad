import { Avatar, Divider, Group, Menu, Text, UnstyledButton } from "@mantine/core";
import clsx from "clsx";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Logout, Settings } from "tabler-icons-react";

import { useAuthData } from "../../stores/AuthContext";

import classes from "./UserMenu.module.scss";

export function UserMenu() {
    const { signOut, user } = useAuthData();
    const [userMenuOpened, setUserMenuOpened] = useState(false);

    return (
        <Menu width={260} placement="end" transition="pop-top-right" onClose={() => setUserMenuOpened(false)} onOpen={() => setUserMenuOpened(true)}>
            <Menu.Target>
                <UnstyledButton className={clsx(classes.user, { [classes.userActive]: userMenuOpened })}>
                    <Group spacing={7}>
                        <Avatar src={user?.photoURL} alt={user?.displayName} color="primary" radius="xl" size="sm" />
                        <Text weight={600} size="md" mr={3}>
                            {user?.displayName ?? "Korisnik"}
                        </Text>
                        <ChevronDown size={12} />
                    </Group>
                </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item icon={<Settings size={18} />} component={Link} to="/profile">
                    Moj profil
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item icon={<Logout size={18} />} onClick={signOut}>
                    Odjavi se
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}
