import createDataContext from "./createDataContext";
import axios from "../api/axios";
import setLoading from "../utils/loading";
import Swal from "sweetalert2";

const itemReducer = (state, action) => {
    switch (action.type) {
        case "load_items":
            return [...action.payload];
        case "add_item":
            return [...state, action.payload];
        default:
            return state;
    }
};

const buyItem = (dispatch) => {
    return async ({ user_id, item_id, quantity }) => {
        // make api request to signup
        setLoading(true);
        try {
            const res = await axios.post("/item/buy", {
                user_id,
                item_id,
                quantity,
            });
            console.log(res.data);
            dispatch({
                type: "add_item",
                payload: res.data,
            });
            // Router.push("/");
            setLoading(false);

            Swal.fire({
                title: "Done!",
                html: '<span style="color: white; font-size: 24px">Bought Item Successfully!</span>',
                icon: "success",
                confirmButtonText: "Close",
            });
        } catch (err) {
            setLoading(false);
            Swal.fire("Bought Item NOT Successfully!", "", "error");
            console.log(err);
        }
    };
};

const loadItems = (dispatch) => {
    return async () => {
        setLoading(true);
        try {
            const res = await axios.get("item/load");
            console.log(res.data);
            dispatch({
                type: "load_items",
                payload: res.data,
            });
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
    };
};

export const { Provider, Context } = createDataContext(
    itemReducer,
    { buyItem, loadItems },
    []
);
