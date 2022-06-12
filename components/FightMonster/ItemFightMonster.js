import Image from "next/image";
import React, { useState, useContext } from "react";
import { Col, Modal } from "react-bootstrap";
import Swal from "sweetalert2";

import { Context as HeroContext } from "../../context/HeroContext";
import { Context as AuthContext } from "../../context/AuthContext";

export default function ItemFightMonster({ data, heroData, reloadHero }) {
    const { loadHeroes } = useContext(HeroContext);
    const { getGold } = useContext(AuthContext);

    const [show, setShow] = useState(false);

    const handleClose = async () => {
        await loadHeroes();
        await getGold();
        setShow(false);
    };

    const handleBattle = () => {
        handleBattleResult();
        setShow(true);
    };

    const handleBattleResult = () => {
        loadBattle();
    };

    const loadBattle = () => {
        try {
        } catch (err) {
            Swal.fire("Battle error!", "", "error");
        } finally {
        }
    };
    return (
        <Col sm={12} md={6} lg={6} xl={3} className="text-center">
            <div className="card-monster card">
                <div className="card-monster__img">
                    <Image
                        src={data.image}
                        alt="card-monster"
                        className="img-card-monster"
                        width={240}
                        height={210}
                    />
                </div>
                <div className="card-body">
                    <h3 className="card-title">{data.name}</h3>
                    <div className="monster-statis">
                        <div className="moster-statis-row">
                            <span className="monster-statis__title">Level</span>
                            <span className="monster-statis__value">
                                {data.level}
                            </span>
                        </div>
                        <div className="moster-statis-row">
                            <span className="monster-statis__title">
                                Approx Win Rate
                            </span>
                            <span className="monster-statis__value">
                                ~{data.winRate}%
                            </span>
                        </div>
                        <div className="moster-statis-row">
                            <span className="monster-statis__title">
                                Estimated Reward
                            </span>
                            <span className="monster-statis__value">
                                {data.rewardEstimated}
                            </span>
                        </div>
                        <div className="moster-statis-row">
                            <span className="monster-statis__title">
                                Estimated EXP
                            </span>
                            <span className="monster-statis__value">
                                {data.expEstimated}
                            </span>
                        </div>
                    </div>
                    <div className="mt-3">
                        <button
                            className="btn btn-warning btn-block"
                            onClick={handleBattle}
                        >
                            Fight
                        </button>
                    </div>
                </div>
            </div>
            <Modal
                show={show}
                size="lg"
                className="modal-fighting"
                backdrop="static"
                keyboard={false}
                centered
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title>BATTLE</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="embed-responsive embed-responsive-16by9">
                        <iframe
                            width="100%"
                            height="100%"
                            className="embed-responsive-item"
                            src={`/gameplay/index.html?h=${
                                heroData.class_id - 1
                            }&m=${data.level}&heroid=${heroData.hero_id}&s=${
                                heroData.stars
                            }&l=${heroData.level}`}
                        ></iframe>
                    </div>
                </Modal.Body>
            </Modal>
        </Col>
    );
}
