import { Button, Group, LoadingOverlay, Modal, Text } from "@mantine/core";
import React, { useState } from "react";

export function ConfirmDeleteModal({ opened, title, description, confirmLabel, onConfirm, onClose }) {
    // 'onConfirm' is Promise/async so we wait for it to finish
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
                    color="red"
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
