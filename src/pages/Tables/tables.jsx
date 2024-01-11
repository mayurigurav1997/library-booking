import React, { useEffect, useState } from 'react'
import classes from "../../styles/Login/Login.module.scss";
import { Box, Button, OutlinedInput, TextField, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedDate, setSubmit } from '../feature/user/userSlice';

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

        let foundObject = userData.find(obj => obj.name == userName)
        const userDates = Object.keys(foundObject.dates)
        if (!userDates.some(obj => obj == formattedDate)) {
            console.log(foundObject.dates, "foundObject.dates")
            const updatedData = userData.map(user =>
                user.name === userName
                    ? { ...user, dates: { ...user.dates, [formattedDate]: [] } }
                    : user)
            console.log(updatedData, "updatedData")
            dispatch(setSubmit(updatedData))
            console.log(`Added date ${formattedDate}`);
        } else {
            console.log(`Date  already exists.`);
        }

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
            </Box>
        </Box>
    )
}

export default Tables