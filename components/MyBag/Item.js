import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Col } from "react-bootstrap";

export default function Item({ data }) {
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
