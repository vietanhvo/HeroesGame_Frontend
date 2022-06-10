import React, { useState, useContext } from "react";
import { Container, Row, Col, Tab, Nav, Form } from "react-bootstrap";
import Image from "next/image";
import { useRouter } from "next/router";

import { Context as AuthContext } from "../context/AuthContext";
import { Context as HeroContext } from "../context/HeroContext";
import { Context as ItemContext } from "../context/ItemContext";

const packData = [
    {
        name: "Anh Viet",
        class_id: 1,
        class: "Shooter",
        price: 7000,
        image: "/assets/img/dapp/heros/0/R1.gif",
        type: "hero",
        hero: 0,
        level: 1,
    },
    {
        name: "Anh Tai",
        class_id: 2,
        class: "Tanker",
        price: 7000,
        type: "hero",
        image: "/assets/img/dapp/heros/1/R1.gif",
        hero: 1,
        level: 1,
    },
];

const packItemData = [
    {
        name: "Gem",
        item_id: 1,
        defaultAmount: 100,
        price: "100",
        image: "/assets/images/pages/store/gem_gif.gif",
        type: "box",
        hero: 2,
    },
];

export default function StarterPack() {
    const router = useRouter();
    const defaultKeyParam = router.query.defaultKey;
    const defaultKey = defaultKeyParam ? defaultKeyParam : "heroes";

    const { state } = useContext(AuthContext);
    const { buyHero } = useContext(HeroContext);
    const { buyItem } = useContext(ItemContext);

    const isBox = (pack) => (pack.type === "box" ? true : false);
    const isHero = (pack) => (pack.type === "hero" ? true : false);

    return (
        <div className="page-content page-starter-pack">
            <Container>
                <Tab.Container
                    id="left-tabs-example"
                    defaultActiveKey={defaultKey}
                >
                    <div className="menu-icon-child">
                        <Nav variant="pills" className="menu-child">
                            <Nav.Item className="menu-child-item">
                                <Nav.Link
                                    eventKey="heroes"
                                    className="menu-child-link"
                                >
                                    Heroes
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="menu-child-item">
                                <Nav.Link
                                    eventKey="item"
                                    className="menu-child-link"
                                >
                                    Items
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </div>

                    <Tab.Content>
                        <Tab.Pane eventKey="heroes">
                            <Row className="justify-content-center">
                                {packData.map((pack, index) => (
                                    <Col key={index} md={6} lg={3}>
                                        <div className="card-shop">
                                            <div className="card-shop-ava">
                                                <div className="card-shop-bg">
                                                    <Image
                                                        src="/assets/images/pages/store/base.png"
                                                        width={372}
                                                        height={142}
                                                        alt="base"
                                                    />
                                                </div>
                                                <div className="card-shop-anim">
                                                    <div className="card-shop-img">
                                                        <Image
                                                            src={pack.image}
                                                            width={200}
                                                            height={200}
                                                            alt="hero"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-shop-meta">
                                                <div className="card-shop-name">
                                                    {pack.name}
                                                </div>
                                                <div className="card-shop-infor">
                                                    <div className="card-shop-prices">
                                                        <div className="card-shop-row">
                                                            <div className="card-shop-label">
                                                                Price
                                                            </div>
                                                            <div className="card-shop-value card-price">
                                                                <div className="image-price">
                                                                    <Image
                                                                        src={`/assets/images/logo/gla-coin.png`}
                                                                        alt="gla-coin.svg"
                                                                        width={
                                                                            16
                                                                        }
                                                                        height={
                                                                            16
                                                                        }
                                                                    />
                                                                </div>
                                                                <p>
                                                                    {pack.price}
                                                                </p>
                                                            </div>
                                                        </div>

                                                        {isHero(pack) ? (
                                                            <>
                                                                <div className="card-shop-row">
                                                                    <div className="card-shop-label">
                                                                        Level
                                                                    </div>
                                                                    <div className="card-shop-value">
                                                                        {
                                                                            pack.level
                                                                        }
                                                                    </div>
                                                                </div>
                                                                <div className="card-shop-row">
                                                                    <div className="card-shop-label">
                                                                        Class
                                                                    </div>
                                                                    <div className="card-shop-value">
                                                                        {
                                                                            pack.class
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            ""
                                                        )}
                                                        {isBox(pack) ? (
                                                            <div className="card-shop-row">
                                                                <div className="card-shop-label">
                                                                    Amount
                                                                </div>
                                                                <div className="card-shop-value w-25">
                                                                    <Form.Control
                                                                        size="sm"
                                                                        type="number"
                                                                        defaultValue="1"
                                                                    />
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            ""
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="card-shop-action">
                                                    <button
                                                        className="card-shop-button d-block button-connect"
                                                        onClick={() =>
                                                            buyHero({
                                                                user_id:
                                                                    state.user_id,
                                                                class_id:
                                                                    pack.class_id,
                                                                price: pack.price,
                                                                name: pack.name,
                                                            })
                                                        }
                                                    >
                                                        Buy
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </Tab.Pane>
                        <Tab.Pane eventKey="item">
                            <Row className="justify-content-center">
                                {packItemData.map((item, index) => {
                                    return (
                                        <ItemDetail
                                            key={index}
                                            item={item}
                                            buyItem={buyItem}
                                            user_id={state.user_id}
                                        />
                                    );
                                })}
                            </Row>
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </Container>
        </div>
    );
}

const ItemDetail = ({ item, buyItem, user_id }) => {
    const [amountItem, setAmountItem] = useState(item.defaultAmount);
    const handleChangeAmountItem = (e, type) => {
        let value = e.target.value;
        setAmountItem(parseInt(value));
    };

    return (
        <Col md={6} lg={3}>
            <div className="card-shop">
                <div className="card-shop-ava">
                    <div className="card-shop-bg">
                        <Image
                            src="/assets/images/pages/store/base.png"
                            width={372}
                            height={142}
                            alt="base"
                        />
                    </div>
                    <div className="card-shop-anim">
                        <div className="card-shop-img">
                            <Image
                                src={item.image}
                                width={200}
                                height={200}
                                alt="hero"
                            />
                        </div>
                    </div>
                </div>
                <div className="card-shop-meta">
                    <div className="card-shop-name">{item.name}</div>
                    <div className="card-shop-infor">
                        <div className="card-shop-prices">
                            <div className="card-shop-row">
                                <div className="card-shop-label">
                                    Unit Price
                                </div>
                                <div className="card-shop-value card-price">
                                    <div className="image-price">
                                        <Image
                                            src={`/assets/images/logo/gla-coin.png`}
                                            alt="gla-coin.svg"
                                            width={16}
                                            height={16}
                                        />
                                    </div>
                                    <p>{item.price}</p>
                                </div>
                            </div>
                            <div className="card-shop-row">
                                <div className="card-shop-label">Amount</div>
                                <div className="card-shop-value w-25">
                                    <Form.Control
                                        size="sm"
                                        type="number"
                                        step={item.name === "Gem" ? 100 : 1}
                                        value={amountItem}
                                        onChange={(value) =>
                                            handleChangeAmountItem(
                                                value,
                                                item.name
                                            )
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-shop-action">
                        <button
                            className="card-shop-button d-block button-connect"
                            onClick={() =>
                                buyItem({
                                    item_id: item.item_id,
                                    user_id: user_id,
                                    quantity: amountItem,
                                })
                            }
                        >
                            Buy
                        </button>
                    </div>
                </div>
            </div>
        </Col>
    );
};
