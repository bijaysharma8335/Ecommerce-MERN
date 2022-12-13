import { createSlice } from "@reduxjs/toolkit";
import { appApi } from "./../services/appApi";

const initialState = null;

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(
            appApi.useSignupMutation.matchFulfilled,
            (_, { payload }) => payload
        );
    },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
