import React from "react";
import PropTypes from "prop-types";

GenderRadio.propTypes = {
    name: PropTypes.string,
    id: PropTypes.string,
    label: PropTypes.string,
    gender: PropTypes.string,
    onGenderChange: PropTypes.func,
};

GenderRadio.defaultProps = {
    name: "",
    id: "",
    label: "",
    gender: "",
    onGenderChange: null,
};

export default function GenderRadio(props) {
    const { name, id, label, gender, onGenderChange } = props;

    const handleGenderChange = () => {
        onGenderChange(id);
    };

    return (
        <label
            htmlFor={id}
            className={
                gender == id
                    ? "gender-radio gender-radio-checked"
                    : "gender-radio"
            }
        >
            {label}
            <input
                type="radio"
                name={name}
                id={id}
                onChange={handleGenderChange}
                className="radio-style"
            />
        </label>
    );
}
