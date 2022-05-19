import React from "react";
import PropTypes from "prop-types";
import GenderRadio from "../GenderRadio";
import { ErrorMessage } from "formik";

RadioField.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    label: PropTypes.string,
};

RadioField.defaultProps = {
    label: "",
};

export default function RadioField(props) {
    const { field, form, label } = props;
    const { name, value } = field;

    const handleGenderChange = (genderID) => {
        form.setFieldValue(name, genderID);
    };

    return (
        <div className="gender-container">
            <div className="gender-input-container">
                <label>{label}</label>

                <GenderRadio
                    name={name}
                    gender={value}
                    id="male"
                    label="Male"
                    onGenderChange={handleGenderChange}
                />
                <GenderRadio
                    name={name}
                    gender={value}
                    id="female"
                    label="Female"
                    onGenderChange={handleGenderChange}
                />
                <GenderRadio
                    name={name}
                    gender={value}
                    id="other"
                    label="Other"
                    onGenderChange={handleGenderChange}
                />
            </div>
            <ErrorMessage
                name={name}
                render={(msg) => <div className="gender-error-msg">{msg}</div>}
            />
        </div>
    );
}
