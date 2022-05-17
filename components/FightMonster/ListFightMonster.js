import React from "react";
import { Row } from "react-bootstrap";
import ItemFightMonster from "./ItemFightMonster";

export default function ListFightMonster({
  data,
  heroData,
  reloadHero,
}) {
  return (
    <div>
      <h3 className="monster-title">MONSTERS</h3>
      <Row className="monster-list justify-content-center">
        {data.map((card, index) => (
          <ItemFightMonster
            key={index}
            data={card}
            heroData={heroData}
            reloadHero={reloadHero}
          ></ItemFightMonster>
        ))}
      </Row>
    </div>
  );
}
