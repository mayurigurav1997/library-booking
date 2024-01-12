import React, { useEffect, useState } from 'react'
import classes from "../../styles/Login/Login.module.scss";
import { Box, Button, OutlinedInput, TextField, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedDate, setSlot, setSubmit } from '../feature/user/userSlice';
import { useRouter } from 'next/router';
import Link from 'next/link';
// import { KeyboardBackspaceOutlinedIcon } from '@mui/icons-material';

const Tables = () => {
    const router = useRouter();
    const [date, setDate] = useState("")
    const [bookedSeats, setBookedSeats] = useState([])
    const [selectedButtonId, setSelectedButtonId] = useState(null)
    const dispatch = useDispatch()
    const userName = useSelector((state) => state.user.user)
    const selectedDate = useSelector((state) => state.user.selectedDate)
    const selectedSlot = useSelector((state) => state.user.selectedSlot)
    // var bookedSeats = []
    let userData = useSelector((state) => state.user.allUsers)
    // console.log(name, "name the user")
    const handleDate = (date) => {
        setSelectedButtonId(null)
        setIndex(0)
        setDate(date)
        let month = date["$M"] + 1
        let day = date["$D"]
        let year = date["$y"]
        let formattedDate = `${month}/${day}/${year}`
        console.log(formattedDate, "formattedDate")
        dispatch(setSelectedDate(formattedDate))

        let userObject = userData.find(obj => obj.name == userName)
        // const userDates = Object.keys(foundObject.dates)
        console.log(userObject, "userObject")
        if (!userObject.bookingStatus.some(obj => obj?.date == formattedDate)) {
            // console.log("Need to add the date")
            // const updatedData = userData.map(user =>
            //     user.name === userName
            //         ? { ...user, bookingStatus: [...user.bookingStatus, { date: formattedDate, slot: "" }] }
            //         : user)
            // console.log(updatedData, "updatedData")
            // dispatch(setSubmit(updatedData))

            // console.log(`Added date ${formattedDate}`);
        } else {
            console.log(`Date  already exists.`);
            var filterBookedSeats = userData?.flatMap(user =>
                user?.bookingStatus
                    .filter(booking => booking.slot == "4:00AM - 6:00AM" && booking.date == formattedDate && booking.seatId)
                    .map(booking => booking?.seatId)
            );
            setBookedSeats(filterBookedSeats)
            console.log(slotsTimings[index + 1], "selectedSlot")
            console.log(formattedDate, "selectedDate")
            console.log(filterBookedSeats, "Booked seats are:")
        }

    }
    const slotsTimings = ["4:00AM - 6:00AM", "6:00AM - 8:00AM", "8:00AM - 10:00AM", "10:00AM - 12:00AM", "12:00AM - 2:00PM", "2:00PM - 4:00PM", "4:00PM - 6:00PM", "6:00PM - 8:00PM", "8:00PM - 10:00PM"];
    const [index, setIndex] = useState(0)
    const handleSlotBack = () => {
        setSelectedButtonId(null)
        setIndex(index => index - 1)
        dispatch(setSlot(slotsTimings[index - 1]))
        var filterBookedSeats = userData?.flatMap(user =>
            user?.bookingStatus
                .filter(booking => booking.slot == slotsTimings[index - 1] && booking.date == selectedDate && booking.seatId)
                .map(booking => booking?.seatId)
        );
        setBookedSeats(filterBookedSeats)
        console.log(slotsTimings[index - 1], "selectedSlot")
        console.log(selectedDate, "selectedDate")
        console.log(filterBookedSeats, "Booked seats are:")

    }
    const handleSlotNext = () => {
        setSelectedButtonId(null)
        setIndex(index + 1)
        dispatch(setSlot(slotsTimings[index + 1]))
        var filterBookedSeats = userData?.flatMap(user =>
            user?.bookingStatus
                .filter(booking => booking.slot == slotsTimings[index + 1] && booking.date == selectedDate && booking.seatId)
                .map(booking => booking?.seatId)
        );
        setBookedSeats(filterBookedSeats)
        console.log(slotsTimings[index + 1], "selectedSlot")
        console.log(selectedDate, "selectedDate")
        console.log(filterBookedSeats, "Booked seats are:")
    }

    function handleSeatSelecting(i) {
        console.log(i, "iyt")
        let totalBooking = userData?.filter(user => user.name === userName).flatMap(user =>
            user?.bookingStatus
                .filter(booking => booking.slot && booking.date == selectedDate && booking.seatId)
                .map(booking => booking?.seatId)
        );
        let slotBooking = userData?.filter(user => user.name === userName).flatMap(user =>
            user?.bookingStatus
                .filter(booking => booking.slot == selectedSlot && booking.date == selectedDate && booking.seatId)
                .map(booking => booking?.seatId)
        );
        console.log(slotBooking, "slotBooking")
        if (totalBooking.length >= 3) {
            alert("You have already selected 3 slots for this day, Can't select slot for this day now")
            setSelectedButtonId(null)
        } else if (slotBooking.length > 0) {
            alert("You have already selected seat for this slot.")
            setSelectedButtonId(null)
        } else {
            setSelectedButtonId(i)
        }
    }
    const handleBook = () => {
        console.log(selectedButtonId, "setSelectedButtonId(i)")
        const updatedData = userData.map(user =>
            user.name === userName
                ? { ...user, bookingStatus: [...user.bookingStatus, { seatId: selectedButtonId, slot: selectedSlot, date: selectedDate }] }
                : user)
        console.log(updatedData, "updatedData")
        dispatch(setSubmit(updatedData))
        alert("Your seat is booked")
        setSelectedButtonId(null)
        var filterBookedSeats = userData?.flatMap(user =>
            user?.bookingStatus
                .filter(booking => booking.slot == selectedSlot && booking.date == selectedDate && booking.seatId)
                .map(booking => booking?.seatId)
        );
        setBookedSeats(filterBookedSeats)
        setIndex(0)
        setSelectedButtonId(null)


    }
    const handleNext = () => {
        router.push("/Pay")
    }
    useEffect(() => {
        console.log(bookedSeats, "indise useeeffect")
    }, [bookedSeats])

    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", height: "98vh" }} border="1px solid red">
            <Box sx={{ display: "flex", flexDirection: "column", width: "30%" }} border="1px solid blue">
                <Typography variant="h5" sx={{ textAlign: "center", mb: 3 }}>Select your tables</Typography>
                <Typography variant="h6" sx={{ textAlign: "left", ml: 16 }}>Select date</Typography>
                <Box sx={{ mb: 5, ml: 16 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            value={date}
                            onChange={(date) => handleDate(date)} />
                    </LocalizationProvider>
                </Box>

                <Typography variant="h6" sx={{ ml: 16 }}>Select time slot</Typography>
                <Box sx={{ mb: 5, display: "flex", justifyContent: "space-between" }} border="1px solid red">
                    <Button variant="outlined" onClick={handleSlotBack} disabled={(selectedDate ? false : true) || slotsTimings[index] == "4:00AM - 6:00AM"}>
                        Previous
                    </Button>
                    <Typography variant="h6" >{slotsTimings[index]}</Typography>
                    <Button variant="outlined" onClick={handleSlotNext} disabled={(selectedDate ? false : true) || slotsTimings[index] == "8:00PM - 10:00PM"}>Next</Button>
                </Box>



            </Box>
            {selectedDate && selectedSlot ?
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }} border="1px solid red">
                    <Typography variant="h6" >Row1</Typography>
                    {["1(Row1)", "2(Row1)", "3(Row1)", "4(Row1)", "5(Row1)", "6(Row1)"].map((i) => <Button
                        variant={selectedButtonId == i ? "contained" : "outlined"}
                        key={i} sx={{ cursor: "pointer", width: "2%", mx: 1 }} onClick={() => {
                            console.log(i, 'clicked');
                            handleSeatSelecting(i)
                        }} disabled={bookedSeats.some(a => a == i)}
                        border="1px solid blue">{i.charAt()}</Button>)}
                </Box> :
                <></>}
            {selectedDate && selectedSlot ?
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }} border="1px solid red">
                    <Typography variant="h6" >Row2</Typography>
                    {["1(Row2)", "2(Row2)", "3(Row2)", "4(Row2)", "5(Row2)", "6(Row2)"].map((i) => <Button
                        variant={selectedButtonId == i ? "contained" : "outlined"}
                        key={i} sx={{ cursor: "pointer", width: "2%", mx: 1 }} onClick={() => {
                            console.log(i, 'clicked');
                            handleSeatSelecting(i)
                        }} disabled={bookedSeats.some(a => a == i)}
                        border="1px solid blue">{i.charAt()}</Button>)}
                </Box> :
                <></>}
            {selectedDate && selectedSlot ?
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }} border="1px solid red">
                    <Typography variant="h6" >Row3</Typography>
                    {["1(Row3)", "2(Row3)", "3(Row3)", "4(Row3)", "5(Row3)", "6(Row3)"].map((i) => <Button
                        variant={selectedButtonId == i ? "contained" : "outlined"}
                        key={i} sx={{ cursor: "pointer", width: "2%", mx: 1 }} onClick={() => {
                            console.log(i, 'clicked');
                            handleSeatSelecting(i)
                        }} disabled={bookedSeats.some(a => a == i)}
                        border="1px solid blue">{i.charAt()}</Button>)}
                </Box> :
                <></>}

            <Box sx={{ display: "flex", justifyContent: "space-between", width: "40%" }}>
                <Button variant="outlined" onClick={handleBook} disabled={!selectedButtonId}>Book</Button>
                <Link href="/Pay">
                    <Button variant="outlined" >Next</Button>
                </Link>
            </Box>
        </Box>
    )
}

export default Tables