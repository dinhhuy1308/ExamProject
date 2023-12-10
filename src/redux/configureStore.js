import { configureStore } from "@reduxjs/toolkit";
import shopReducer from "./reducer/shopReducer";
import userReducer from "./reducer/userReducer";

export const store = configureStore({
    reducer: {
        shopReducer,
        userReducer
    },
});



