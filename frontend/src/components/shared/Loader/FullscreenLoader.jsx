import { LoadingOverlay } from "@mantine/core";
import React from "react";

export function FullscreenLoader() {
    return <LoadingOverlay visible={true} loaderProps={{ size: "lg" }} overlayOpacity={0.3} overlayColor="#c5c5c5" />;
}
