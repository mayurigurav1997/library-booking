import { createSlice } from "@reduxjs/toolkit";

const authState = {
    allUsers: [{ name: "Mayuri" }, { name: "shriya" }]
};

export const userSlice = createSlice({
    name: "user",
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
