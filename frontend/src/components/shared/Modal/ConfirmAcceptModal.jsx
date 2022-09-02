import { Button, Group, LoadingOverlay, Modal, Text } from "@mantine/core";
import React, { useState } from "react";

export function ConfirmAcceptModal({ opened, title, description, confirmLabel, onConfirm, onClose }) {
    const [loading, setLoading] = useState(false);

    return (
        <Modal title={title} centered opened={opened} onClose={onClose}>
            <LoadingOverlay visible={loading} />
            <Text size="sm" my="xl">
                {description}
            </Text>
            <Group position="right">
                <Button variant="subtle" onClick={onClose}>
                    Odustani
                </Button>
                <Button
                    color="green"
                    onClick={() => {
                        setLoading(true);
                        onConfirm().finally(() => setLoading(false));
                    }}
                >
                    {confirmLabel ?? "Potvrdi"}
                </Button>
            </Group>
        </Modal>
    );
}
