import React, { useContext } from "react";
import Head from "next/head";
import Header from "./Header";
import AuthHeader from "./AuthHeader";

import { Context as AuthContext } from "../context/AuthContext";

export default function Layout({ children }) {
    const { state } = useContext(AuthContext);

    return (
        <>
            {state.auth ? (
                <div className="main-app">
                    <Head>
                        <title>Heroes Game</title>
                    </Head>
                    <Header />
                    {children}
                </div>
            ) : (
                <div className="auth-container">
                    <AuthHeader />
                    {children}
                </div>
            )}
            <div className="loading">
                <img src="/assets/images/loading.gif" alt="loading" />
            </div>
        </>
    );
}
