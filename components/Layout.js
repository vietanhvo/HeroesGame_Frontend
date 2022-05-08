import React, { useState } from "react";
import Head from "next/head";
import Header from "./Header";

export default function Layout({ children }) {
    return (
        <div className="main-app">
            <Head>
                <title>Heroes Game</title>
            </Head>
            <Header />
            {children}
            {/* <Footer /> */}

            <div className="loading">
                <img src="/assets/images/loading.gif" alt="loading" />
            </div>
        </div>
    );
}
