import { createSlice } from "@reduxjs/toolkit";

const authState = {
    allUsers: [{
        name: "Mayuri",
        bookingStatus: [
            {
                seatId: "1(Row1)",
                slot: "6:00AM - 8:00AM",
                date: "1/15/2024",
            },
            {
                seatId: "2(Row1)",
                slot: "12:00AM - 2:00AM",
                date: "1/15/2024",
            },
            {
                seatId: "6(Row1)",
                slot: "8:00AM - 10:00AM",
                date: "1/15/2024",
            },
        ],
    }, {
        name: "Shreya",
        bookingStatus: [
            {
                seatId: "2(Row1)",
                slot: "4:00AM - 6:00AM",
                date: "1/15/2024",
            },
            {
                seatId: "3(Row1)",
                slot: "6:00AM - 8:00AM",
                date: "1/16/2024",
            },
            {
                seatId: "",
                slot: "",
                date: "1/15/2024",
            },
        ],
    },],
    user: "",
    selectedDate: "",
    selectedSlot: "4:00AM - 6:00AM",
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
    },
});


export const { setSubmit, setUser, setSelectedDate, setSlot } = userSlice.actions;

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