import createDataContext from "./createDataContext";
import axios from "../axios";

const authReducer = (state, action) => {
    switch (action.type) {
        case "add_err":
            return { ...state, errorMessage: action.payload };
        case "sign_in":
            return {
                errorMessage: "",
                email: action.payload.email,
                first_name: action.payload.first_name,
                surname: action.payload.surname,
                date_of_birth: action.payload.date_of_birth,
                gender: action.payload.gender,
                gold: action.payload.gold,
            };
        case "clear_err_msg":
            return { ...state, errorMessage: "" };
        case "sign_out":
            return {
                errorMessage: "",
                email: "",
                first_name: "",
                surname: "",
                date_of_birth: "",
                gender: "",
                gold: "",
            };
        case "add_update_msg":
            return { ...state, updateMsg: action.payload };
        case "clear_update_msg":
            return { ...state, updateMsg: "" };
        default:
            return state;
    }
};

export const { Provider, Context } = createDataContext(
    authReducer,
    {},
    {
        errorMessage: "",
        email: "",
        first_name: "",
        surname: "",
        date_of_birth: "",
        gender: "",
        gold: "",
    }
);
