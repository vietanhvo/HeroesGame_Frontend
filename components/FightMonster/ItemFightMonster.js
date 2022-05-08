import Image from "next/image";
import React from "react";
import { Col } from "react-bootstrap";

export default function ItemFightMonster({ data, heroData, reloadHero }) {
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
                            onClick={() => {}}
                        >
                            Fight
                        </button>
                    </div>
                </div>
            </div>
        </Col>
    );
}
