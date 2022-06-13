import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState, useContext, useCallback } from "react";
import { Col, Container, Row, ProgressBar } from "react-bootstrap";
import ListFightMonster from "../components/FightMonster/ListFightMonster";
import { RARE_MAX, EXP_THRESHOLD } from "../utils/HeroData";

import { Context as HeroContext } from "../context/HeroContext";

const monsterFight = [
    {
        name: "Demogorgon",
        level: 1,
        winRate: 80,
        rewardEstimated: "100",
        expEstimated: "100",
        image: "/assets/img/dapp/enemy/2/L1.gif",
        available: true,
    },

    {
        name: "Mind Flayer",
        level: 2,
        winRate: 60,
        rewardEstimated: "100",
        expEstimated: "100",
        image: "/assets/img/dapp/enemy/1/L1.gif",
        available: true,
    },
    {
        name: "Vecna",
        level: 3,
        winRate: 40,
        rewardEstimated: "100",
        expEstimated: "100",
        image: "/assets/img/dapp/enemy/0/L1.gif",
        available: true,
    },
];

export default function FightMonster() {
    const { state, loadHeroes } = useContext(HeroContext);

    const router = useRouter();
    const [heroesData, setHeroesData] = useState([]);
    const [heroData, setHeroData] = useState({
        id: 0,
        class_id: 99,
        name: "",
        stars: 0,
        level: 0,
        experience: 0,
        lastBattleTime: 0,
        remainTime: 0,
    });
    const [selectHeroIndex, setSelectHeroIndex] = useState(0);
    const [monsters, setMonsters] = useState(monsterFight.slice(0, 4));
    const [reloadPage, setReloadPage] = useState(0);

    const reloadHero = () => {
        setReloadPage(Math.floor(Math.random() * 101));
    };

    const handleSelectRare = (class_id, stars) => {
        return `/assets/img/dapp/heros/${class_id - 1}/R${stars}.gif`;
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

    const showStars = (starsData) => {
        let stars = [];
        for (var i = 0; i < starsData; i++) {
            stars.push(1);
        }
        for (var i = starsData; i < 6; i++) {
            stars.push(2);
        }
        return stars.map(createStarImage);
    };

    const handlePrev = () => {
        const nextIndex = selectHeroIndex - 1;
        if (nextIndex > -1) {
            setSelectHeroIndex(nextIndex);
        } else {
            setSelectHeroIndex(heroesData.length - 1);
        }
    };

    const handleNext = () => {
        const nextIndex = selectHeroIndex + 1;
        if (nextIndex < heroesData.length) {
            setSelectHeroIndex(nextIndex);
        } else {
            setSelectHeroIndex(0);
        }
    };

    useEffect(() => {
        const data = heroesData[selectHeroIndex];
        if (data) {
            setHeroData(data);
        } else {
            const temp = {
                id: 0,
                types: 99,
                name: "",
                rare: 0,
                level: 0,
                exp: 0,
                lastBattleTime: 0,
                remainTime: 0,
            };
            setHeroData(temp);
        }
    }, [reloadPage, selectHeroIndex]);

    useEffect(async () => {
        try {
            await loadHeroes();
        } catch (err) {
            // console.log(err);
        } finally {
        }
    }, []);

    useEffect(() => {
        setHeroesData(state);
        if (state.length > 0) {
            setHeroData(state[0]);
            setSelectHeroIndex(0);
        }
    }, [state]);

    useEffect(() => {
        if (router.pathname.includes("/fight-monster")) {
            let mainapp = document.querySelector(".main-app");
            if (mainapp) {
                mainapp.style.background =
                    'url("/assets/images/pages/fight-monster/bg1.png") top center no-repeat,url("/assets/images/pages/fight-monster/bg2.png") top center repeat';
                mainapp.style.backgroundSize = "100%";
            }
        }
        return () => {
            let mainapp = document.querySelector(".main-app");
            if (mainapp) {
                mainapp.style.background = "";
                mainapp.style.backgroundSize = "100%";
            }
        };
    }, [router.pathname]);

    return (
        <div className="page-content page-fight-monster">
            <Container>
                <div className="page-header">
                    <Row className="justify-content-center">
                        <Col sm={12} md={6} lg={4}>
                            <div className="hero-skills">
                                <img
                                    className="main-skill"
                                    src={`/assets/images/pages/fight-monster/type${heroData.class_id}.png`}
                                />
                                <img
                                    className="skills"
                                    src="/assets/images/pages/fight-monster/SKill.png"
                                />
                            </div>
                        </Col>
                        <Col sm={12} md={6} lg={4}>
                            <div className="card-shop">
                                <div className="card-shop-ava">
                                    <div className="card-shop-bg">
                                        <Image
                                            src="/assets/images/pages/fight-monster/beHero.png"
                                            width={320}
                                            height={370}
                                            alt="base"
                                        />
                                    </div>
                                    <div className="card-shop-anim">
                                        <div className="card-shop-img hero-img">
                                            <Image
                                                id={`hero-${heroData.hero_id}`}
                                                src={handleSelectRare(
                                                    heroData.class_id,
                                                    heroData.stars
                                                )}
                                                width={200}
                                                height={200}
                                                alt={heroData.name}
                                            />
                                        </div>
                                    </div>
                                    <div className="card-shop-prev back-btn">
                                        <button onClick={() => handlePrev()}>
                                            Prev
                                        </button>
                                    </div>
                                    <div className="card-shop-next next-btn">
                                        <button onClick={() => handleNext()}>
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col
                            sm={12}
                            md={6}
                            lg={3}
                            col-md-offset={3}
                            className="mr-lg-auto"
                        >
                            <div className="card-shop">
                                <div className="card-shop-meta">
                                    <div className="header-card">
                                        <div className="card-shop-name">
                                            {heroData.name}
                                        </div>
                                        {heroData.name && (
                                            <div className="index-number">
                                                #{selectHeroIndex + 1}/
                                                {heroesData.length}
                                            </div>
                                        )}
                                    </div>
                                    <div className="card-shop-infor">
                                        <div className="card-shop-prices">
                                            <div className="card-shop-row">
                                                {showStars(heroData.stars)}
                                            </div>
                                            <div className="card-shop-row">
                                                <div className="card-shop-label">
                                                    Level
                                                </div>
                                                <div className="card-shop-value">
                                                    {heroData.level}
                                                </div>
                                            </div>
                                            <div className="card-shop-row">
                                                <div className="card-shop-label">
                                                    Experience
                                                </div>
                                                <div className="card-shop-value">
                                                    {heroData.experience}
                                                    {heroData.level &&
                                                    heroData.level < RARE_MAX
                                                        ? ` / ${
                                                              EXP_THRESHOLD[
                                                                  heroData.level -
                                                                      1
                                                              ]
                                                          }`
                                                        : null}
                                                </div>
                                            </div>
                                            <ProgressBar
                                                className="exp-bar"
                                                animated
                                                now={
                                                    heroData.level
                                                        ? [
                                                              heroData.level <
                                                              RARE_MAX
                                                                  ? (heroData.experience /
                                                                        EXP_THRESHOLD[
                                                                            heroData.level -
                                                                                1
                                                                        ]) *
                                                                    100
                                                                  : 100,
                                                          ]
                                                        : 0
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="fight-monster-list">
                    <ListFightMonster
                        data={monsters}
                        heroData={heroData}
                        reloadHero={reloadHero}
                    ></ListFightMonster>
                </div>
            </Container>
        </div>
    );
}
