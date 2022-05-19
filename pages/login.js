import React, { useState } from "react";
import { useRouter } from "next/router";
import { Button, Col, Row } from "react-bootstrap";
import * as Yup from "yup";
import { Formik, Form, Field, FastField } from "formik";
import axios from "./api/axios";
import InputField from "../components/custom-fields/InputField";

const loginSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    password: Yup.string()
        .min(6, "password must be longer than 6 characters")
        .required("password is required"),
});

export default function Login() {
    const router = useRouter();
    const initialValues = {
        email: "",
        password: "",
        remember: false,
    };

    return (
        <div className="page-content page-home">
            <Row>
                <Col lg={8} className="mx-auto">
                    <div className="form-container">
                        <div className="form-title">Login Form</div>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={loginSchema}
                            onSubmit={(values) => {
                                console.log(values);
                            }}
                        >
                            {(formikProps) => {
                                const { values, errors, touched } = formikProps;
                                console.log({ values, errors, touched });

                                return (
                                    <Form className="form-body">
                                        <FastField
                                            name="email"
                                            component={InputField}
                                            label="Email:"
                                            inputClassName="input-field"
                                        />
                                        <FastField
                                            name="password"
                                            component={InputField}
                                            label="Password:"
                                            type="password"
                                            inputClassName="input-field"
                                        />
                                        <FastField
                                            name="remember"
                                            component={InputField}
                                            label="Remember my account"
                                            labelBehind={true}
                                            type="checkbox"
                                            containerClassName="remember-me"
                                            inputClassName="remember-checkbox"
                                            labelClassName="remember-label"
                                        />

                                        <div className="btn-container">
                                            <Button
                                                variant="primary"
                                                type="submit"
                                                id="main-btn"
                                            >
                                                Sign In
                                            </Button>
                                        </div>
                                    </Form>
                                );
                            }}
                        </Formik>
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
                    </div>
                </Col>
            </Row>
        </div>
    );
}
