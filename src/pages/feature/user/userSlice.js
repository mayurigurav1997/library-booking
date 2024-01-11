import { createSlice } from "@reduxjs/toolkit";

const authState = {
    allUsers: {}
};

export const userSlice = createSlice({
    name: "users",
    initialState: authState,
    reducers: {
        setSubmit: (state, { payload }) => ({
            ...state,
            allUsers: payload,
        }),
    },
});


export const { setSubmit } = userSlice.actions;

export const userReducer = userSlice.reducer;
