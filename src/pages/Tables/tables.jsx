import React, { useEffect, useState } from 'react'
import { Box, Button, OutlinedInput, TextField, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useDispatch, useSelector } from 'react-redux';
import { setCopyAllUserData, setPaymentData, setSelectedDate, setSlot, setSubmit } from '../feature/user/userSlice';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from '@emotion/styled';
// import { KeyboardBackspaceOutlinedIcon } from '@mui/icons-material';

const Tables = () => {
    const router = useRouter();
    const [date, setDate] = useState("")
    const [bookedSeats, setBookedSeats] = useState([])
    const [selectedButtonId, setSelectedButtonId] = useState(null)
    const [activeButton, setActiveButton] = useState("")
    const Row1 = ["1(Row1)", "2(Row1)", "3(Row1)", "4(Row1)", "5(Row1)", "6(Row1)"]
    const Row2 = ["1(Row2)", "2(Row2)", "3(Row2)", "4(Row2)", "5(Row2)", "6(Row2)"]
    const Row3 = ["1(Row3)", "2(Row3)", "3(Row3)", "4(Row3)", "5(Row3)", "6(Row3)"]
    const dispatch = useDispatch()
    const userName = useSelector((state) => state.user.user)
    const selectedDate = useSelector((state) => state.user.selectedDate)
    const selectedSlot = useSelector((state) => state.user.selectedSlot)
    let userData = useSelector((state) => state.user.allUsers)
    const CustomButton = styled(Button)({
        color: 'white',
        backgroundColor: '#5b5bd3',
        fontSize: "16px",
        textTransform: "capitalize"
    });
    const Typography3 = styled(Typography)({
        fontSize: "24px",
        fontWeight: "bold",
        color: "#202124e6",
    });
    const Typography4 = styled(Typography)({
        fontSize: "20px",
        fontWeight: 600,
        color: "#202124e6",
    });

    const deepArray = JSON.parse(JSON.stringify(userData));
    const [copyUserData, setCopyUserData] = useState(deepArray)

    //handle date
    const handleDate = (date) => {
        setSelectedButtonId(null)
        setIndex(0)
        setDate(date)
        let month = date["$M"] + 1
        let day = date["$D"]
        let year = date["$y"]
        let formattedDate = `${month}/${day}/${year}`
        dispatch(setSelectedDate(formattedDate))
        let userObject = userData.find(obj => obj.name == userName)
        console.log(copyUserData, "copyUserData")
        // if (!userObject?.bookingStatus?.some(obj => obj?.date === formattedDate)) {
        // } else {
        //     var filterBookedSeats = userData?.flatMap(user =>
        //         user?.bookingStatus
        //             .filter(booking => booking.slot == "4:00AM - 6:00AM" && booking.date == formattedDate && booking.seatId)
        //             .map(booking => booking?.seatId)
        //     );
        //     console.log(filterBookedSeats, "filterBookedSeats")
        //     setBookedSeats(filterBookedSeats)
        // }
        var filterBookedSeats = userData?.flatMap(user =>
            user?.bookingStatus
                .filter(booking => booking.slot == "4:00AM - 6:00AM" && booking.date == formattedDate && booking.seatId)
                .map(booking => booking?.seatId)
        );
        console.log(filterBookedSeats, "filterBookedSeats")
        setBookedSeats(filterBookedSeats)

    }

    //handle slot
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
        var greenButton = copyUserData?.flatMap(user =>
            user?.bookingStatus
                .filter(booking =>
                    booking.slot == slotsTimings[index - 1] && booking.date == selectedDate && booking.seatSelected)
                .map(booking =>
                    booking?.seatSelected)
        );
        console.log(greenButton, "greenButton")
        setActiveButton(greenButton.length > 0 ? greenButton[0] : "")
    }
    const handleSlotNext = () => {
        setSelectedButtonId(null)
        setIndex(index + 1)
        dispatch(setSlot(slotsTimings[index + 1]))
        var filterBookedSeats = userData?.flatMap(user =>
            user?.bookingStatus
                .filter(booking => booking.slot == slotsTimings[index + 1] &&
                    booking.date == selectedDate &&
                    booking.seatId)
                .map(booking => booking?.seatId)
        );
        console.log(filterBookedSeats, "filterBookedSeats")
        setBookedSeats(filterBookedSeats)
        // setActiveButton("")
        console.log(copyUserData, "Inside the green")
        var greenButton = copyUserData?.flatMap(user =>
            user?.bookingStatus
                .filter(booking =>
                    booking.slot == slotsTimings[index + 1] && booking.date == selectedDate && booking.seatSelected)
                .map(booking =>
                    booking?.seatSelected)
        );
        console.log(greenButton, "greenButton")
        setActiveButton(greenButton.length > 0 ? greenButton[0] : "")
    }

    //handle Seating
    function handleSeatSelecting(i) {
        let totalBooking = copyUserData?.filter(user => user.name === userName).flatMap(user =>
            user?.bookingStatus
                .filter(booking => booking.slot && booking.date == selectedDate && (booking.seatId || booking.seatSelected))
                .map(booking => booking.seatSelected)
        );
        let slotBooking = userData?.filter(user => user.name === userName).flatMap(user =>
            user?.bookingStatus
                .filter(booking => booking.slot == selectedSlot && booking.date == selectedDate)
                .map(booking => booking?.seatSelected)
        );
        console.log(copyUserData, "copyUserData")
        console.log(totalBooking, "totalBooking")
        if (totalBooking.length >= 3) {
            alert("You have already selected 3 slots for this day, Can't select slot for this day now")
            setSelectedButtonId(null)
        } else if (slotBooking.length > 0) {
            alert("You have already selected seat for this slot.")
            setSelectedButtonId(null)
        } else {
            setSelectedButtonId(i)
            console.log("HI")
            let userObject = copyUserData.find(obj => obj.name == userName)
            const updatedCopyUserData = copyUserData.map(user =>
                user.name === userName
                    ? {
                        ...user,
                        bookingStatus: user.bookingStatus.length > 0
                            ? user.bookingStatus.some(book => book.date === selectedDate && book.slot === selectedSlot && book.seatSelected)
                                ? user.bookingStatus.map(book =>
                                    book.date === selectedDate && book.slot === selectedSlot
                                        ? { ...book, seatSelected: i }
                                        : book
                                )
                                : [...user.bookingStatus, { date: selectedDate, slot: selectedSlot, seatSelected: i }]
                            : [{ date: selectedDate, slot: selectedSlot, seatSelected: i }]
                    }
                    : user
            );
            setCopyUserData(updatedCopyUserData)
            console.log(updatedCopyUserData, "updatedCopyUserData")
            setActiveButton("")
        }
    }

    const handleNext = () => {
        console.log(copyUserData, "copyUserData in handleNext")
        let paymentData = copyUserData?.filter(user => user.name === userName).flatMap(user =>
            user?.bookingStatus
                .filter(booking => booking.slot && booking.date && booking.seatSelected)
                .map(booking => booking)
        );
        console.log(paymentData, "paymentData")

        dispatch(setPaymentData(paymentData))
        dispatch(setSelectedDate(""))
        dispatch(setSlot("4:00AM - 6:00AM"))
        dispatch(setCopyAllUserData(copyUserData))
        router.push("/Pay")

    }
    useEffect(() => {
        const allUsers = localStorage.getItem("allUsers");
        console.log(bookedSeats, "bookedSeats")
    }, [bookedSeats])
    useEffect(() => {
        console.log(copyUserData, "copyUserData")

    }, [copyUserData])
    useEffect(() => {
        console.log(copyUserData, "copyUserData")

    }, [setActiveButton])

    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", height: "98vh" }} border="1px solid red">
            <Box sx={{ display: "flex", flexDirection: "column", width: "30%", justifyContent: "center", alignItems: "center" }} border="0px solid blue">
                <Typography3 variant="h5" sx={{ mb: 3 }}>Select your tables</Typography3>
                <Typography4 variant="h6" sx={{}}>Select date</Typography4>
                <Box sx={{ mb: 3, }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            value={date}
                            onChange={(date) => handleDate(date)} />
                    </LocalizationProvider>
                </Box>

                <Typography4 variant="h6" sx={{}}>Select time slot</Typography4>
                <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", width: "86%" }} border="0px solid red">
                    <Button variant="outlined" onClick={handleSlotBack} disabled={(selectedDate ? false : true) || slotsTimings[index] == "4:00AM - 6:00AM"}>
                        Previous
                    </Button>
                    <Typography variant="h6" >{slotsTimings[index]}</Typography>
                    <Button variant="outlined" onClick={handleSlotNext} disabled={(selectedDate ? false : true) || slotsTimings[index] == "8:00PM - 10:00PM"}>Next</Button>
                </Box>
            </Box>

            <Typography4 variant="h6" sx={{ mb: 2 }}>Select tables</Typography4>
            {selectedSlot ?
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }} border="0px solid red">
                    <Typography variant="h6" >Row1</Typography>
                    {Row1.map((i) => <Button
                        variant={selectedButtonId == i || activeButton == i ? "contained" : "outlined"}
                        key={i} sx={{ cursor: "pointer", width: "1%", mx: 1, borderRadius: "0px", border: "2px solid #5b5bd3", }} onClick={() => {
                            handleSeatSelecting(i)
                        }} disabled={bookedSeats.some(a => a == i)}
                        border="0px solid blue">{i.charAt()}</Button>)}
                </Box> :
                <></>}
            {selectedSlot ?
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }} border="0px solid red">
                    <Typography variant="h6" >Row2</Typography>
                    {Row2.map((i) => <Button
                        variant={selectedButtonId == i ? "contained" : "outlined"}
                        key={i} sx={{ cursor: "pointer", width: "1%", mx: 1, borderRadius: "0px", border: "2px solid #5b5bd3", }} onClick={() => {
                            handleSeatSelecting(i)
                        }} disabled={bookedSeats.some(a => a == i)}
                        border="0px solid blue">{i.charAt()}</Button>)}
                </Box> :
                <></>}
            {selectedSlot ?
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }} border="0px solid red">
                    <Typography variant="h6" >Row3</Typography>
                    {Row3.map((i) => <Button
                        variant={selectedButtonId == i ? "contained" : "outlined"}
                        key={i} sx={{ cursor: "pointer", width: "1%", mx: 1, borderRadius: "0px", border: "2px solid #5b5bd3", }}
                        onClick={() => {
                            handleSeatSelecting(i)
                        }} disabled={bookedSeats.some(a => a == i)}
                        border="0px solid blue">{i.charAt()}</Button>)}
                </Box> :
                <></>}

            <Box sx={{ display: "flex", justifyContent: "space-between", width: "40%" }}>
                {/* <Button variant="outlined" disabled={!(selectedButtonId && selectedDate)} sx={{ textTransform: "capitalize", }}>Book</Button> */}
                {/* <Link href="/Pay"> */}
                <CustomButton variant="contained" disabled={!(selectedButtonId && selectedDate)} onClick={handleNext}>Next</CustomButton>
                {/* </Link> */}
            </Box>
        </Box>
    )
}

export default Tables