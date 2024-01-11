import React, { useEffect, useState } from 'react'
import classes from "../../styles/Login/Login.module.scss";
import { Box, Button, OutlinedInput, TextField, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedDate, setSlot, setSubmit } from '../feature/user/userSlice';
// import { KeyboardBackspaceOutlinedIcon } from '@mui/icons-material';

const Tables = () => {
    const [date, setDate] = useState("")
    const dispatch = useDispatch()
    const userName = useSelector((state) => state.user.user)
    let userData = useSelector((state) => state.user.allUsers)
    // console.log(name, "name the user")
    const handleDate = (date) => {
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
            console.log("Need to add the date")
            const updatedData = userData.map(user =>
                user.name === userName
                    ? { ...user, bookingStatus: [...user.bookingStatus, { date: formattedDate, slot: "" }] }
                    : user)
            console.log(updatedData, "updatedData")
            dispatch(setSubmit(updatedData))
            // console.log(`Added date ${formattedDate}`);
        } else {
            console.log(`Date  already exists.`);
        }

    }
    const slotsTimings = ["4:00AM - 6:00AM", "6:00AM - 8:00AM", "8:00AM - 10:00AM", "10:00AM - 12:00AM", "12:00AM - 2:00PM", "2:00PM - 4:00PM", "4:00PM - 6:00PM", "6:00PM - 8:00PM", "8:00PM - 10:00PM"];
    const [index, setIndex] = useState(0)
    const handleSlotBack = () => {
        setIndex(index => index - 1)
        dispatch(setSlot(slotsTimings[index]))
    }
    const handleSlotNext = () => {
        setIndex(index + 1)
        dispatch(setSlot(slotsTimings[index]))

    }
    useEffect(() => {
        // console.log(date, "date")

    }, [date])

    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "98vh" }} border="1px solid red">
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
                    <Button variant="outlined" onClick={handleSlotBack} disabled={slotsTimings[index] == "4:00AM - 6:00AM"}>
                        Previous
                    </Button>
                    <Typography variant="h6" >{slotsTimings[index]}</Typography>
                    <Button variant="outlined" onClick={handleSlotNext} disabled={slotsTimings[index] == "8:00PM - 10:00PM"}>Next</Button>
                </Box>

                <Box sx={{ p: 1 }} border="1px solid red">
                    {<Box sx={{ width: "18px", height: "18px", display: "flex", justifyContent: "center", alignItems: "center" }} border="1px solid blue">3</Box>}
                </Box>
            </Box>
        </Box>
    )
}

export default Tables