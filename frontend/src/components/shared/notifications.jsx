import { cleanNotifications, showNotification } from "@mantine/notifications";
import React from "react";
import { Check, ExclamationMark } from "tabler-icons-react";

export function showSuccessNotification({ message }) {
    showNotification({
        icon: <Check size={20} />,
        color: "green",
        message: message
    });
}

export function showErrorNotification({ message }) {
    cleanNotifications();
    showNotification({
        icon: <ExclamationMark size={20} />,
        color: "red",
        title: "Greška",
        message: message,
        autoClose: false
    });
}
