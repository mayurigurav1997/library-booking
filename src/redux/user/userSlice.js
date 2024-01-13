import { createSlice } from "@reduxjs/toolkit";

const authState = {
    allUsers: [],
    setCopyUserData: [],
    user: "",
    selectedDate: "",
    selectedSlot: "4:00AM - 6:00AM",
    paymentData: []
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
        setSlot: (state, { payload }) => ({
            ...state,
            selectedSlot: payload,
        }),
        setPaymentData: (state, { payload }) => ({
            ...state,
            paymentData: payload,
        }),
        setCopyAllUserData: (state, { payload }) => ({
            ...state,
            copyUserData: payload,
        })
    },
});


export const { setSubmit, setUser, setSelectedDate, setSlot, setPaymentData, setCopyAllUserData } = userSlice.actions;
export const userReducer = userSlice.reducer;
