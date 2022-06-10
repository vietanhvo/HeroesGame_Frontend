import Image from "next/image";
import Link from "next/link";
import React, { useState, useContext, useEffect } from "react";
import { Col, ProgressBar } from "react-bootstrap";
import Swal from "sweetalert2";
import Modal from "../../components/Modal/Modal";
import {
    RARE_MAX,
    UPGRADE_PERCENTAGE,
    EXP_THRESHOLD,
    RARE_RATIO,
} from "../../utils/HeroData";
import setLoading from "../../utils/loading";

import { Context as ItemContext } from "../../context/ItemContext";
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as HeroContext } from "../../context/HeroContext";

export default function Hero({ data }) {
    const gemNeeded = data.stars * RARE_RATIO;

    const [showUpgrade, setShowUpgrade] = useState(false);
    const [amountGem, setAmountGem] = useState(0);

    const { state, loadItems } = useContext(ItemContext);
    const { upgradeHero, loadHeroes } = useContext(HeroContext);
    const user_id = useContext(AuthContext).state.user_id;

    const handleSelectRare = (types, rare) => {
        return `/assets/img/dapp/heros/${types}/R${rare}.gif`;
    };
    const createStarImage = (onOff, index) => (
        <Image
            key={`star-${index}`}
            id={`star-${index}`}
            src={`/assets/images/stones/star${onOff}.png`}
            width={32}
            height={32}
            alt="Star"
        />
    );
    const showStars = (rare) => {
        let stars = [];
        for (var i = 0; i < rare; i++) {
            stars.push(1);
        }
        for (var i = rare; i < 6; i++) {
            stars.push(2);
        }
        return stars.map(createStarImage);
    };

    const checkUpgradeCriteria = () => {
        if (data.stars >= RARE_MAX) {
            Swal.fire("Your hero reached the maximum level", "", "warning");
        } else if (amountGem < gemNeeded) {
            Swal.fire("You don't have enough gems", "", "warning");
        } else {
            handleUpgradeHero();
        }
    };

    const handleUpgradeHero = async () => {
        await upgradeHero({
            user_id,
            hero_id: data.hero_id,
            hero_stars: data.stars,
        });
        await loadItems();
        await loadHeroes();
    };

    const handleUpgrade = async () => {
        setShowUpgrade(true);
    };

    useEffect(() => {
        if (state[0]) {
            setAmountGem(state[0].quantity);
        }
    }, [state[0]]);

    return (
        <>
            <Col key={data.hero_id} md={6} lg={3}>
                <div className="card-shop">
                    <div className="card-shop-ava">
                        <div className="card-shop-bg">
                            <Image
                                key={`frame-${data.hero_id}`}
                                id={`frame-${data.hero_id}`}
                                src="/assets/images/pages/store/base.png"
                                width={372}
                                height={142}
                                alt="base"
                            />
                        </div>
                        <div className="card-shop-anim">
                            <div className="card-shop-img">
                                <Image
                                    key={`hero-${data.hero_id}`}
                                    id={`hero-${data.herotypes_id}`}
                                    src={handleSelectRare(
                                        data.class_id - 1,
                                        data.stars
                                    )}
                                    width={400}
                                    height={400}
                                    alt="Hero"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="card-shop-meta">
                        <div className="header-card">
                            <div className="card-shop-name">{data.name}</div>
                            <div className="index-number">#{data.hero_id}</div>
                        </div>
                        <div className="card-shop-infor">
                            <div className="card-shop-prices">
                                <div className="card-shop-row">
                                    {showStars(data.stars)}
                                </div>
                                <div className="card-shop-row">
                                    <div className="card-shop-label">Level</div>
                                    <div className="card-shop-value">
                                        {data.level}
                                    </div>
                                </div>
                                <div className="card-shop-row">
                                    <div className="card-shop-label">
                                        Experience
                                    </div>
                                    <div className="card-shop-value">
                                        {data.experience}
                                        {data.level && data.level < RARE_MAX
                                            ? ` / ${
                                                  EXP_THRESHOLD[data.level - 1]
                                              }`
                                            : null}
                                    </div>
                                </div>
                                <ProgressBar
                                    className="exp-bar"
                                    animated
                                    now={
                                        data.level
                                            ? [
                                                  data.level < RARE_MAX
                                                      ? (data.experience /
                                                            EXP_THRESHOLD[
                                                                data.level - 1
                                                            ]) *
                                                        100
                                                      : 100,
                                              ]
                                            : 0
                                    }
                                />
                                <div className="card-shop-row">
                                    <div className="card-shop-label">Class</div>
                                    <div className="card-shop-value">
                                        {data.class_id == 1
                                            ? "Shooter"
                                            : "Tanker"}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-shop-action">
                            <button
                                className="card-shop-button d-block button-buy"
                                onClick={() => handleUpgrade()}
                            >
                                Upgrade
                            </button>
                        </div>
                    </div>
                </div>
            </Col>
            <Modal show={showUpgrade}>
                <div className="modal-upgrade">
                    <div className="modal-items">
                        <Link
                            href={{
                                pathname: "/",
                                query: { defaultKey: "item" },
                            }}
                            passHref
                        >
                            <button className="modal__items--gem">
                                <Image
                                    src={`/assets/images/pages/my-bag/gem.png`}
                                    width={100}
                                    height={100}
                                    alt="Gem"
                                />
                                <span
                                    className="modal__items--gem-text"
                                    style={
                                        amountGem < gemNeeded
                                            ? {
                                                  color: "red",
                                                  fontWeight: "bold",
                                              }
                                            : null
                                    }
                                >
                                    {gemNeeded}/{amountGem}
                                </span>
                            </button>
                        </Link>
                    </div>
                    <div className="modal__upgrade--progress">
                        <div className="modal__hero">
                            <div className="card-shop">
                                <div className="card-shop-ava">
                                    <div className="card-shop-bg card-shop-base-from">
                                        <Image
                                            key={`upgrade-frame1-${data.hero_id}`}
                                            id={`upgrade-frame1-${data.hero_id}`}
                                            src="/assets/images/pages/store/base.png"
                                            width={372}
                                            height={142}
                                            alt="Base"
                                        />
                                    </div>
                                    <div className="card-shop-anim-from">
                                        <div className="card-shop-img-vertical">
                                            <Image
                                                className="card-shop-hero"
                                                key={`upgrade-from-hero-${data.hero_id}`}
                                                id={`upgrade-from-hero-${data.hero_id}`}
                                                src={handleSelectRare(
                                                    data.class_id - 1,
                                                    data.stars
                                                )}
                                                width={200}
                                                height={200}
                                                alt="Upgrade from hero"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="card-shop-infor">
                                    <div className="card-shop-prices">
                                        <div className="card-shop-row">
                                            {showStars(data.stars)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="image__arrow">
                            <Image
                                key={`upgrade-arrow-${data.hero_id}`}
                                id={`upgrade-arrow-${data.hero_id}`}
                                src={`/assets/images/pages/my-bag/arrow.png`}
                                width={100}
                                height={100}
                                alt="Star"
                            />
                        </div>
                        <div className="image__arrow--down">
                            <Image
                                key={`upgrade-arrow-down-${data.hero_id}`}
                                id={`upgrade-arrow-down-${data.hero_id}`}
                                src={`/assets/images/pages/my-bag/arrow_down.png`}
                                width={100}
                                height={100}
                                alt="Star"
                            />
                        </div>
                        {data.stars < RARE_MAX && (
                            <h5 className="percentage">
                                UP TO {UPGRADE_PERCENTAGE[data.stars - 1]}%
                                probability for a SUCCESSFUL UPGRADE
                            </h5>
                        )}
                        <div className="modal__hero--upgrade">
                            <div className="card-shop">
                                <div className="card-shop-ava">
                                    <div className="card-shop-bg card-shop-base-to">
                                        <Image
                                            key={`upgrade-frame2-${data.hero_id}`}
                                            id={`upgrade-frame2-${data.hero_id}`}
                                            src="/assets/images/pages/store/base.png"
                                            width={372}
                                            height={142}
                                            alt="Base"
                                        />
                                    </div>
                                    <div className="card-shop-anim-to">
                                        <div className="card-shop-img-vertical">
                                            {data.stars < RARE_MAX ? (
                                                <Image
                                                    className="card-shop-hero"
                                                    key={`upgrade-to-hero-${data.hero_id}`}
                                                    id={`upgrade-to-hero-${data.hero_id}`}
                                                    src={handleSelectRare(
                                                        data.class_id - 1,
                                                        data.stars + 1
                                                    )}
                                                    width={200}
                                                    height={200}
                                                    alt="Upgrade to hero"
                                                />
                                            ) : (
                                                <span className="maximum-text">
                                                    Cannot Upgrade 6-STAR Hero
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="card-shop-infor">
                                    <div className="card-shop-prices">
                                        <div className="card-shop-row">
                                            {data.stars < RARE_MAX
                                                ? showStars(data.stars + 1)
                                                : showStars(data.stars)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal__button--group">
                    <button
                        className="card-shop-button d-block button-connect"
                        onClick={() => setShowUpgrade(false)}
                    >
                        Close
                    </button>
                    <button
                        className="card-shop-button d-block button-buy"
                        onClick={() => checkUpgradeCriteria()}
                        // disabled={!checkUpgradeCriteria()}
                    >
                        Upgrade
                    </button>
                </div>
            </Modal>
        </>
    );
}
