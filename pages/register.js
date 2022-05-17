import React, { useState } from "react";
import { useRouter } from "next/router";
import { Form, Button, Col, Row } from "react-bootstrap";

export default function Register() {
    const router = useRouter();
    const [gender, setGender] = useState();

    return (
        <div className="page-content page-home">
            <Row>
                <Col lg={8} className="mx-auto">
                    <div className="form-container">
                        <div className="form-title">Register Form</div>
                        <div className="form-subtitle">It's quick and easy</div>
                        <Form className="form-body">
                            <div className="first-name-container">
                                <label htmlFor="first-name">First name:</label>
                                <input
                                    type="text"
                                    id="first-name"
                                    name="first-name"
                                    className="input-field name-field"
                                    placeholder="Anh Viet"
                                />
                            </div>
                            <div className="surname-container">
                                <label htmlFor="surname">Surname:</label>
                                <input
                                    type="text"
                                    id="surname"
                                    name="surname"
                                    className="input-field name-field"
                                    placeholder="Vo"
                                />
                            </div>
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="input-field"
                                placeholder="example@domain.com"
                            />
                            <div id="date-of-birth-container">
                                <label htmlFor="date-of-birth">
                                    Date of birth:
                                </label>
                                <input
                                    type="date"
                                    name="date-of-birth"
                                    id="date-of-birth"
                                    className="input-field"
                                />
                            </div>
                            <div id="gender-container">
                                <label>Gender:</label>
                                <label
                                    htmlFor="male"
                                    className={
                                        gender == "male"
                                            ? "gender-radio gender-radio-checked"
                                            : "gender-radio"
                                    }
                                >
                                    Male
                                    <input
                                        type="radio"
                                        name="gender"
                                        id="male"
                                        onChange={() => setGender("male")}
                                        className="radio-style"
                                    />
                                </label>
                                <label
                                    htmlFor="female"
                                    className={
                                        gender == "female"
                                            ? "gender-radio gender-radio-checked"
                                            : "gender-radio"
                                    }
                                >
                                    Female
                                    <input
                                        type="radio"
                                        name="gender"
                                        id="female"
                                        onChange={() => setGender("female")}
                                        className="radio-style"
                                    />
                                </label>
                                <label
                                    htmlFor="other"
                                    className={
                                        gender == "other"
                                            ? "gender-radio gender-radio-checked"
                                            : "gender-radio"
                                    }
                                >
                                    Other
                                    <input
                                        type="radio"
                                        name="gender"
                                        id="other"
                                        onChange={() => setGender("other")}
                                        className="radio-style"
                                    />
                                </label>
                            </div>
                            <label htmlFor="password" className="full-width">
                                Password:
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="input-field"
                            />
                            <label htmlFor="confirm-password">
                                Confirm Password:
                            </label>
                            <input
                                type="password"
                                name="confirm-password"
                                id="confirm-password"
                                className="input-field"
                            />
                            <label
                                htmlFor="agree-terms"
                                id="agree-terms-container"
                            >
                                <input
                                    type="checkbox"
                                    name="agree-terms"
                                    id="agree-terms"
                                />
                                I agree to all Terms, Data Policy and Cookie
                                Policy
                            </label>
                            <div className="btn-container">
                                <Button
                                    variant="success"
                                    type="submit"
                                    id="main-btn"
                                >
                                    Sign Up
                                </Button>
                            </div>
                            <hr />
                            <div className="btn-container">
                                <Button
                                    variant="primary"
                                    id="navigate-btn"
                                    onClick={() => {
                                        router.push("/login");
                                    }}
                                >
                                    Sign In
                                </Button>
                            </div>
                        </Form>
                    </div>
                </Col>
            </Row>
        </div>
    );
}
