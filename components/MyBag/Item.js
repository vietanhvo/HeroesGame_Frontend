import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { Col } from "react-bootstrap";
import { useRouter } from "next/router";

export default function Item({ data, changeHeroData }) {
    const router = useRouter();
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

    return (
        <>
            <Col key={data.item_id} md={6} lg={3}>
                <div className="card-shop">
                    <div className="card-shop-ava">
                        <div className="card-shop-bg">
                            <Image
                                key={`base-item-${data.item_id}`}
                                id={`base-item-${data.item_id}`}
                                src="/assets/images/pages/store/base.png"
                                width={372}
                                height={142}
                                alt="Base"
                            />
                        </div>
                        <div className="card-shop-anim">
                            <div className="card-shop-img">
                                <Image
                                    key={`core-item-${data.item_id}`}
                                    id={`core-item-${data.item_id}`}
                                    src={
                                        "/assets/images/pages/store/gem_gif.gif"
                                    }
                                    width={110}
                                    height={160}
                                    alt="Core"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="card-shop-meta">
                        <div className="card-shop-name">Gem</div>
                        <div className="card-shop-infor">
                            <div className="card-shop-prices">
                                <div className="card-shop-row">
                                    <div className="card-shop-label">
                                        Amount
                                    </div>
                                    <div className="card-shop-value">
                                        {data.quantity}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <span className="card-shop-button d-block button-buy">
                                <Link
                                    href={{
                                        pathname: "/",
                                        query: { defaultKey: "item" },
                                    }}
                                >
                                    Go to Store
                                </Link>
                            </span>
                            <p className="card-description">
                                Use GEMS to upgrade your hero and buy weapons
                                for in-game use.
                            </p>
                        </div>
                    </div>
                </div>
            </Col>
        </>
    );
}
