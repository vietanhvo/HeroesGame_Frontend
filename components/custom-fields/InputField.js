import React from "react";
import PropTypes from "prop-types";
import { ErrorMessage } from "formik";

InputField.propTypes = {
    // Formik
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    // Input props
    containerClassName: PropTypes.string,
    inputClassName: PropTypes.string,
    labelClassName: PropTypes.string,
    type: PropTypes.string,
    label: PropTypes.string,
    labelBehind: PropTypes.bool,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
};

InputField.defaultProps = {
    containerClassName: "",
    inputClassName: "",
    labelClassName: "",
    type: "text",
    label: "",
    labelBehind: false,
    placeholder: "",
    disabled: false,
};

export default function InputField(props) {
    const {
        field,
        form,

        type,
        label,
        labelBehind,
        placeholder,
        disabled,
        containerClassName,
        labelClassName,
        inputClassName,
    } = props;
    const { name } = field;
    const { errors, touched } = form;
    const showErrors = errors[name] && touched[name];

    return (
        <div className={containerClassName}>
            {label && !labelBehind && (
                <label htmlFor={name} className={labelClassName}>
                    {label}
                </label>
            )}
            <input
                {...field}
                id={name}
                type={type}
                placeholder={placeholder}
                disabled={disabled}
                className={inputClassName}
            />
            {label && labelBehind && (
                <label htmlFor={name} className={labelClassName}>
                    {label}
                </label>
            )}
            <ErrorMessage
                name={name}
                render={(msg) => <div className="error-msg">{msg}</div>}
            />
        </div>
    );
}
