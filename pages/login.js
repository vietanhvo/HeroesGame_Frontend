import React from "react";
import { useRouter } from "next/router";
import { Form, Button, Col, Row } from "react-bootstrap";

export default function Login() {
    const router = useRouter();

    return (
        <div className="page-content page-home">
            <Row>
                <Col lg={8} className="mx-auto">
                    <div className="form-container">
                        <div className="form-title">Login Form</div>
                        <Form className="form-body">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="input-field"
                            />
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="input-field"
                            />
                            <div className="remember-me">
                                <input
                                    type="checkbox"
                                    name="remember-checkbox"
                                    id="remember-checkbox"
                                />
                                <label
                                    htmlFor="remember-checkbox"
                                    id="remember-label"
                                >
                                    Remember my account
                                </label>
                            </div>
                            <div class="btn-container">
                                <Button
                                    variant="primary"
                                    type="submit"
                                    id="main-btn"
                                >
                                    Sign In
                                </Button>
                            </div>
                            <hr />
                            <div className="btn-container">
                                <Button
                                    variant="success"
                                    id="navigate-btn"
                                    onClick={() => {
                                        router.push("/register");
                                    }}
                                >
                                    Create New Account
                                </Button>
                            </div>
                        </Form>
                    </div>
                </Col>
            </Row>
        </div>
    );
}
