import React, { useState, useEffect, useContext } from "react";
import List from "../components/MyBag/List";
import { Container, Nav, Tab } from "react-bootstrap";

import { Context as AuthContext } from "../context/AuthContext";
import { Context as HeroContext } from "../context/HeroContext";
import { Context as ItemContext } from "../context/ItemContext";

export default function MyBag() {
    const user_id = useContext(AuthContext).state.user_id;
    const { state, loadHeroes } = useContext(HeroContext);
    const itemState = useContext(ItemContext).state;
    const { loadItems } = useContext(ItemContext);
    const [itemsData, setItemsData] = useState([]);
    const [heroesData, setHeroesData] = useState([]);
    const [heroData, setHeroData] = useState(0);

    const changeHeroData = (arg) => {
        setHeroData(arg);
    };

    useEffect(async () => {
        await loadHeroes(user_id);
        await loadItems(user_id);
        setHeroesData(state);
    }, []);

    useEffect(async () => {
        setItemsData(itemState);
    }, [itemState]);

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
                                changeHeroData={changeHeroData}
                                types={1}
                            ></List>
                        </Tab.Pane>
                        <Tab.Pane eventKey="items">
                            <List
                                data={itemsData}
                                changeHeroData={changeHeroData}
                                types={2}
                            ></List>
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </Container>
        </div>
    );
}
