import createDataContext from "./createDataContext";
import axios from "../api/axios";
import Router from "next/router";
import setLoading from "../utils/loading";
import Swal from "sweetalert2";

const authReducer = (state, action) => {
    switch (action.type) {
        case "add_err":
            return { ...state, errorMessage: action.payload };
        case "clear_err_msg":
            return { ...state, errorMessage: "" };
        case "login":
            return {
                errorMessage: "",
                auth: true,
                user_id: action.payload.user_id,
                email: action.payload.email,
                first_name: action.payload.first_name,
                surname: action.payload.surname,
                date_of_birth: action.payload.date_of_birth,
                gender: action.payload.gender,
                gold: action.payload.gold,
            };
        case "logout":
            return {
                errorMessage: "",
                auth: false,
                user_id: "",
                email: "",
                first_name: "",
                surname: "",
                date_of_birth: "",
                gender: "",
                gold: "",
            };
        case "get_gold":
            return { ...state, gold: action.payload };
        default:
            return state;
    }
};

const clearErrorMessage = (dispatch) => () => {
    dispatch({ type: "clear_err_msg" });
};

const login = (dispatch) => {
    return async ({ email, password, remember }) => {
        // make api request to signup
        setLoading(true);
        try {
            const res = await axios.post("/auth/login", {
                email,
                password,
                remember,
            });
            console.log(res.data);
            dispatch({
                type: "login",
                payload: {
                    user_id: res.data.user_id,
                    email: res.data.email,
                    first_name: res.data.first_name,
                    surname: res.data.surname,
                    date_of_birth: res.data.date_of_birth,
                    gender: res.data.gender,
                    gold: res.data.gold,
                },
            });
            Router.push("/");
            setLoading(false);
            Swal.fire({
                title: "Welcome!",
                html: '<span style="color: white; font-size: 24px">Login Successfully!</span>',
                icon: "success",
                confirmButtonText: "Close",
            });
        } catch (err) {
            setLoading(false);
            Swal.fire("Login failed!", "", "error");
            dispatch({
                type: "add_err",
                payload: "Something went wrong with log in",
            });
        }
    };
};

const tryTokenLogin = (dispatch) => {
    return async () => {
        try {
            const res = await axios.get("/auth/token");
            console.log(res.data);
            dispatch({
                type: "login",
                payload: res.data,
            });
        } catch (err) {
            console.log(err);
        }
    };
};

const logout = (dispatch) => async () => {
    setLoading(true);
    try {
        const res = await axios.get("/auth/logout");
        console.log(res.data);
        dispatch({ type: "logout" });
    } catch (err) {
        dispatch({
            type: "add_err",
            payload: "Something went wrong with log out",
        });
    }
    setLoading(false);
};

const register =
    (dispatch) =>
    async ({ first_name, surname, email, date_of_birth, gender, password }) => {
        setLoading(true);
        try {
            const res = await axios.post("/auth/register", {
                first_name,
                surname,
                email,
                date_of_birth,
                gender,
                password,
            });
            console.log(res.data);
            Router.push("/login");
            setLoading(false);
            Swal.fire({
                title: "Congratulation!",
                html: '<span style="color: white; font-size: 24px">Register Successfully!</span>',
                icon: "success",
                confirmButtonText: "Close",
            });
        } catch (err) {
            setLoading(false);
            Swal.fire("Register failed!", "", "error");
            dispatch({
                type: "add_err",
                payload: "Something went wrong with register account",
            });
        }
    };

const getGold = (dispatch) => async () => {
    try {
        const res = await axios.get("/auth/gold");
        console.log(res.data);
        dispatch({ type: "get_gold", payload: res.data });
    } catch (err) {
        console.log(err);
    }
};

export const { Provider, Context } = createDataContext(
    authReducer,
    { login, tryTokenLogin, logout, register, clearErrorMessage, getGold },
    {
        errorMessage: "",
        auth: false,
        user_id: "",
        email: "",
        first_name: "",
        surname: "",
        date_of_birth: "",
        gender: "",
        gold: "",
    }
);
