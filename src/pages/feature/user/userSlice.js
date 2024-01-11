import { createSlice } from "@reduxjs/toolkit";

const authState = {
    allUsers: [{ name: "Mayuri", dates: { "1/12/2024": [], "1/19/2024": [] } }, { name: "shriya", dates: { "2/19/2024": [] } }],
    user: "",
    selectedDate: ""
};

export const userSlice = createSlice({
    name: "user",
    initialState: authState,
    reducers: {
        setSubmit: (state, { payload }) => ({
            ...state,
            allUsers: payload,
        }),
        setUser: (state, { payload }) => ({
            ...state,
            user: payload,
        }),
        setSelectedDate: (state, { payload }) => ({
            ...state,
            selectedDate: payload,
        }),
    },
});


export const { setSubmit, setUser, setSelectedDate } = userSlice.actions;

export const userReducer = userSlice.reducer;
