import React, { useState } from "react";
import { useRouter } from "next/router";
import { Button, Col, Row } from "react-bootstrap";
import * as Yup from "yup";
import { Formik, Form, FastField } from "formik";
import InputField from "../components/custom-fields/InputField";
import RadioField from "../components/custom-fields/RadioField";
import axios from "../api/axios";

const registerSchema = Yup.object().shape({
    first_name: Yup.string().required("First name is required"),
    surname: Yup.string().required("Surname is required"),
    email: Yup.string()
        .email("You must input a valid email")
        .required("Email is required"),
    date_of_birth: Yup.date().required("Date of birth is required"),
    gender: Yup.string().required("Gender is required"),
    password: Yup.string()
        .min(8, "password must be longer than 8 characters")
        .required("password is required"),
    confirm_password: Yup.string()
        .oneOf(
            [Yup.ref("password"), null],
            "Confirm password must match password"
        )
        .required("Confirm password is required"),
    agree_terms: Yup.bool().oneOf(
        [true],
        "You must agree to all terms and conditions"
    ),
});

export default function Register() {
    const router = useRouter();

    const initialValues = {
        first_name: "",
        surname: "",
        email: "",
        date_of_birth: "",
        gender: "",
        password: "",
        confirm_password: "",
        agree_terms: false,
    };

    return (
        <div className="page-content page-home">
            <Row>
                <Col lg={8} className="mx-auto">
                    <div className="form-container">
                        <div className="form-title">Register Form</div>
                        <div className="form-subtitle">It's quick and easy</div>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={registerSchema}
                            onSubmit={async (values) => {
                                let res = await axios.post("/api/register", values);
                                console.log(res);
                            }}
                        >
                            {(formikProps) => {
                                // const { values, errors, touched } = formikProps;
                                // console.log({ values, errors, touched });

                                return (
                                    <Form className="form-body">
                                        <FastField
                                            name="first_name"
                                            component={InputField}
                                            label="First Name:"
                                            placeholder="Anh Viet"
                                            containerClassName="first-name-container"
                                            inputClassName="input-field name-field"
                                        />
                                        <FastField
                                            name="surname"
                                            component={InputField}
                                            label="Surname:"
                                            placeholder="Vo"
                                            containerClassName="surname-container"
                                            inputClassName="input-field name-field"
                                        />
                                        <FastField
                                            name="email"
                                            component={InputField}
                                            label="Email:"
                                            placeholder="example@domain.com"
                                            inputClassName="input-field"
                                        />
                                        <FastField
                                            name="date_of_birth"
                                            component={InputField}
                                            label="Date of birth:"
                                            type="date"
                                            containerClassName="date-of-birth-container"
                                            inputClassName="input-field"
                                        />

                                        <FastField
                                            name="gender"
                                            component={RadioField}
                                            label="Gender:"
                                        />
                                        <FastField
                                            name="password"
                                            component={InputField}
                                            label="Password:"
                                            type="password"
                                            labelClassName="full-width"
                                            inputClassName="input-field"
                                        />
                                        <FastField
                                            name="confirm_password"
                                            component={InputField}
                                            label="Confirm Password:"
                                            type="password"
                                            inputClassName="input-field"
                                        />
                                        <FastField
                                            name="agree_terms"
                                            component={InputField}
                                            label="I agree to all Terms, Data Policy and Cookie Policy"
                                            labelBehind={true}
                                            type="checkbox"
                                            inputClassName="agree-terms-input"
                                            labelClassName="agree-terms-label"
                                        />

                                        <div className="btn-container">
                                            <Button
                                                variant="success"
                                                type="submit"
                                                id="main-btn"
                                            >
                                                Sign Up
                                            </Button>
                                        </div>
                                    </Form>
                                );
                            }}
                        </Formik>
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
                    </div>
                </Col>
            </Row>
        </div>
    );
}
