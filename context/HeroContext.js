import createDataContext from "./createDataContext";
import axios from "../api/axios";
import setLoading from "../utils/loading";
import Swal from "sweetalert2";

const heroReducer = (state, action) => {
    switch (action.type) {
        case "load_heroes":
            return [...action.payload];
        case "add_hero":
            return [...state, action.payload];
        default:
            return state;
    }
};

const buyHero = (dispatch) => {
    return async ({ user_id, class_id, name, price }) => {
        // make api request to signup
        setLoading(true);
        try {
            const res = await axios.post("/hero/buy", {
                user_id,
                class_id,
                name,
                price,
            });
            console.log(res.data);
            dispatch({
                type: "add_hero",
                payload: res.data,
            });
            // Router.push("/");
            setLoading(false);

            Swal.fire({
                title: "Done!",
                html: '<span style="color: white; font-size: 24px">Bought Hero Successfully!</span>',
                icon: "success",
                confirmButtonText: "Close",
            });
        } catch (err) {
            setLoading(false);
            Swal.fire("Bought Hero NOT Successfully!", "", "error");
            console.log(err);
        }
    };
};

const loadHeroes = (dispatch) => {
    return async () => {
        setLoading(true);
        try {
            const res = await axios.get("hero/load");
            console.log(res.data);
            dispatch({
                type: "load_heroes",
                payload: res.data,
            });
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
    };
};

const upgradeHero = (dispatch) => {
    return async ({ user_id, hero_id, hero_stars }) => {
        setLoading(true);
        try {
            const res = await axios.post("hero/upgrade", {
                user_id,
                hero_id,
            });
            if (res.data > hero_stars) {
                Swal.fire("Upgrade Successful!", "", "success");
            } else {
                Swal.fire("Upgrade NOT Successful!", "", "error");
            }
        } catch (err) {
            console.log(err);
            Swal.fire("Error in upgrade!", "", "error");
        }
        setLoading(false);
    };
};

export const { Provider, Context } = createDataContext(
    heroReducer,
    { buyHero, loadHeroes, upgradeHero },
    []
);
