import React, { useEffect, useContext } from "react";
import { Container, Nav, Tab } from "react-bootstrap";

import { Context as AuthContext } from "../context/AuthContext";
import { Context as HeroContext } from "../context/HeroContext";

export default function MyBag() {
    const { state } = useContext(AuthContext);
    const { loadHeroes } = useContext(HeroContext);
    useEffect(() => {
        loadHeroes(state.user_id);
    }, []);

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
                        <Tab.Pane eventKey="heroes"></Tab.Pane>
                        <Tab.Pane eventKey="items"></Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </Container>
        </div>
    );
}
