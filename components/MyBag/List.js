import React from "react";
import { Row } from "react-bootstrap";
import Hero from "./Hero";
import Item from "./Item";

export default function List({ data, itemsData, changeHeroData, types }) {
    if (types == 1) {
        return (
            <Row className="justify-content-center">
                {data.map((item, index) => (
                    <Hero
                        key={index}
                        data={item}
                        items={itemsData}
                        changeHeroData={changeHeroData}
                    ></Hero>
                ))}
            </Row>
        );
    } else {
        return (
            <Row className="justify-content-center">
                {data.map((item, index) => (
                    <Item
                        key={index}
                        data={item}
                        changeHeroData={changeHeroData}
                    ></Item>
                ))}
            </Row>
        );
    }
}
