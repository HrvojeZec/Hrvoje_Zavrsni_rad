import React from "react";
import { Heartbeat } from "tabler-icons-react";

function resolveNumericSize(size) {
    if (Number.isInteger(size)) {
        return size;
    }

    return size === "lg" ? 48 : 32;
}

export function BrandLogo({ size }) {
    return <Heartbeat size={resolveNumericSize(size)} />;
}
