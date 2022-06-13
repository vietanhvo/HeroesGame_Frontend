import React, { useContext, useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import { Context as AuthContext } from "../context/AuthContext";

export default function Header() {
    const router = useRouter();
    const { state, logout } = useContext(AuthContext);

    const getMenuTitle = (pathname) => {
        let title = "";
        switch (pathname) {
            case "/fight-monster":
                title = "BATTLE";
                break;
            case "/mybag":
                title = "Inventory";
                break;
            case "/":
                title = "Store";
                break;
        }

        return title;
    };

    const [balanceToken, setBalanceToken] = useState(0);
    const [menuTitle, setMenuTitle] = useState(getMenuTitle(router.pathname));

    const setMenuClassName = (pathname, itemPath) => {
        let className = "menu-icon-link";

        if (pathname === itemPath) {
            className += " active";
        }

        return className;
    };

    useEffect(() => {
        setBalanceToken(state.gold);
    }, [state.gold]);

    return (
        <>
            {state.auth ? (
                <Container>
                    <div className="menu-icon-content">
                        <div className="header-btn">
                            <Button onClick={logout}>Logout</Button>
                        </div>
                        <div className="header-user-profile">
                            <span className="header-user-profile-text">
                                <Image
                                    className="header-gla-icon"
                                    src={`/assets/images/logo/gla-coin.png`}
                                    alt="gla-coin.png"
                                    width={24}
                                    height={24}
                                />
                                &nbsp;{balanceToken}&nbsp;
                            </span>
                        </div>

                        <ul className="menu-icon">
                            <li className="menu-icon-item">
                                <Link href="/mybag">
                                    <a
                                        className={setMenuClassName(
                                            router.pathname,
                                            "/mybag"
                                        )}
                                        onMouseEnter={() =>
                                            setMenuTitle("Inventory")
                                        }
                                        onMouseLeave={() =>
                                            setMenuTitle(
                                                getMenuTitle(router.pathname)
                                            )
                                        }
                                    >
                                        <Image
                                            src="/assets/images/header/my-bag.png"
                                            alt="bag"
                                            width={100}
                                            height={100}
                                            layout="intrinsic"
                                        />
                                    </a>
                                </Link>
                            </li>
                            <li className="menu-icon-item">
                                <Link href="/">
                                    <a
                                        className={setMenuClassName(
                                            router.pathname,
                                            "/"
                                        )}
                                        onMouseEnter={() =>
                                            setMenuTitle("Store")
                                        }
                                        onMouseLeave={() =>
                                            setMenuTitle(
                                                getMenuTitle(router.pathname)
                                            )
                                        }
                                    >
                                        <Image
                                            src="/assets/images/header/store.png"
                                            alt="store"
                                            width={100}
                                            height={100}
                                            layout="intrinsic"
                                        />
                                    </a>
                                </Link>
                            </li>
                            <li className="menu-icon-item">
                                <Link href="/fight-monster">
                                    <a
                                        className={setMenuClassName(
                                            router.pathname,
                                            "/fight-monster"
                                        )}
                                        onMouseEnter={() =>
                                            setMenuTitle("Battle")
                                        }
                                        onMouseLeave={() =>
                                            setMenuTitle(
                                                getMenuTitle(router.pathname)
                                            )
                                        }
                                    >
                                        <Image
                                            src="/assets/images/header/fighting.png"
                                            alt="fighting"
                                            width={100}
                                            height={100}
                                            layout="intrinsic"
                                        />
                                    </a>
                                </Link>
                            </li>
                        </ul>
                        <div className="menu-icon-title">
                            <span>{menuTitle}</span>
                        </div>
                    </div>
                </Container>
            ) : (
                <div className="header text-center">
                    <a href="#" className="logo d-block">
                        <Image
                            src="/assets/images/pages/auth/hero-logo.png"
                            width={256}
                            height={111}
                        />
                    </a>
                </div>
            )}
        </>
    );
}
