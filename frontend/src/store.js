import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productSlice from "./features/productSlice";
import userSlice from "./features/userSlice";
import appApi from "./services/appApi";
import { persistReducer } from "redux-persist";
//persist store
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
//reducers
const reducer = combineReducers({
    user: userSlice,
    products: productSlice,
    [appApi.reducerPath]: appApi.reducer,
});

const persistConfig = {
    key: "root",
    storage,
    blackList: [appApi.reducerPath, "products"],
};

//persist the store

const persistedReducer = persistReducer(persistConfig, reducer);

//create store
const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk, appApi.middleware],
});

export default store;
