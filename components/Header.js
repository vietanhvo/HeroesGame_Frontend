import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Header() {
    const router = useRouter();
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

    const [menuTitle, setMenuTitle] = useState(getMenuTitle(router.pathname));

    const setMenuClassName = (pathname, itemPath) => {
        let className = "menu-icon-link";

        if (pathname === itemPath) {
            className += " active";
        }

        return className;
    };

    return (
        <>
            <Container>
                <div className="menu-icon-content">
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
                                    onMouseEnter={() => setMenuTitle("Store")}
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
                                    onMouseEnter={() => setMenuTitle("Battle")}
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
        </>
    );
}
