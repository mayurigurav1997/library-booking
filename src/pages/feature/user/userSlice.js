import { createSlice } from "@reduxjs/toolkit";

const authState = {
    allUsers: [],
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
        })
    },
});


export const { setSubmit, setUser, setSelectedDate, setSlot, setPaymentData } = userSlice.actions;

export const userReducer = userSlice.reducer;
// const user = [
//     {
//       name: "XYZ",
//   bookingStatus: [
//     {
//       seatId: 1,
//       slot: "8-10",
//       date: "11-1-2024",
//     },
//     {
//       seatId: 2,
//       slot: "8-10",
//       date: "11-1-2024",
//     },
//   ],
//     },
//   ];