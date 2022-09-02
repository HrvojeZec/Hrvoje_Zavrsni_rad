import React from "react";

import { Footer } from "./Footer";
import { Header } from "./Header";

export function Layout(props) {
    return (
        <div className="layout">
            <Header />
            <main>{props.children}</main>
            <Footer />
        </div>
    );
}
