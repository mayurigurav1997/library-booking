import { useEffect, useState } from 'react'
import React from "react"
import classes from "../../styles/Login/Login.module.scss";
import { Box, Button, OutlinedInput, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { useRouter } from "next/router";
import { useDispatch, useSelector } from 'react-redux'
import { setPaymentData, setSubmit, setUser } from '../feature/user/userSlice';
import { styled } from '@mui/system';
import moment from 'moment';

const Pay = () => {
    const router = useRouter();
    const dispatch = useDispatch()
    const userData = useSelector((state) => state.user.allUsers)
    const userName = useSelector((state) => state.user.user)
    const selectedDate = useSelector((state) => state.user.selectedDate)
    const selectedSlot = useSelector((state) => state.user.selectedSlot)
    const paymentData = useSelector((state) => state.user.paymentData)
    const Price = paymentData.length * 50 || 0;
    console.log(paymentData, "Inside the payment paymentData")
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
    const StyledTable = styled(Table)({
        // minWidth: 650,
        border: '2px solid #d9d9d9', // Add border style to the table
    });

    const StyledTableCell = styled(TableCell)({
        border: '2px solid #d9d9d9', // Add border style to individual cells
    });
    const handleNext = () => {
        dispatch(setPaymentData([]))
        router.push("/Login")
    }


    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "98vh" }} border="1px solid red">
            <Box sx={{ display: "flex", flexDirection: "column", width: "80%", justifyContent: "center", alignItems: "center" }} border="1px solid blue">
                <Typography3 variant="h6" sx={{ textAlign: "center", mb: 2 }} >Your Selection</Typography3>
                <TableContainer component={Paper} border="1px solid red" sx={{ width: "50%", mb: 3 }}>
                    <StyledTable aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="left">Day and time</StyledTableCell>
                                <StyledTableCell align="left">Table</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paymentData.map((row) => (
                                <TableRow
                                    key={row.seatId}
                                // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <StyledTableCell align="left">{moment(row.date).format('Do MMMM YYYY')} {row.slot}</StyledTableCell>
                                    <StyledTableCell align="left">{row.seatId}</StyledTableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </StyledTable>
                </TableContainer>
                <Box sx={{ display: "flex", justifyContent: "space-between", width: "60%" }} border="2px solid red">
                    <Typography variant="h6" sx={{ textAlign: "center", mb: 2 }} >Total Price</Typography>
                    <Typography variant="h6" sx={{ textAlign: "center", mb: 2 }} >INR {Price}</Typography>
                </Box>
                <CustomButton variant="contained" onClick={handleNext}>
                    Pay
                </CustomButton>
            </Box>
        </Box>
    )
}

export default Pay