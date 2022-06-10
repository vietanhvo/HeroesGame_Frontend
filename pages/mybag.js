import React, { useState, useEffect, useContext } from "react";
import List from "../components/MyBag/List";
import { Container, Nav, Tab } from "react-bootstrap";

import { Context as HeroContext } from "../context/HeroContext";
import { Context as ItemContext } from "../context/ItemContext";

export default function MyBag() {
    const { state, loadHeroes } = useContext(HeroContext);
    const itemState = useContext(ItemContext).state;
    const { loadItems } = useContext(ItemContext);
    const [itemsData, setItemsData] = useState([]);
    const [heroesData, setHeroesData] = useState([]);

    useEffect(async () => {
        await loadHeroes();
        await loadItems();
    }, []);

    useEffect(async () => {
        setItemsData(itemState);
    }, [itemState]);

    useEffect(async () => {
        setHeroesData(heroesData);
    }, [heroesData]);

    return (
        <div className="page-content page-starter-pack">
            <Container>
                <Tab.Container id="left-tabs-example" defaultActiveKey="heroes">
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
                                    eventKey="items"
                                    className="menu-child-link"
                                >
                                    Items
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </div>

                    <Tab.Content>
                        <Tab.Pane eventKey="heroes">
                            <List
                                data={state}
                                itemsData={itemsData}
                                types={1}
                            ></List>
                        </Tab.Pane>
                        <Tab.Pane eventKey="items">
                            <List data={itemsData} types={2}></List>
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </Container>
        </div>
    );
}
