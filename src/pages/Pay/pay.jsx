import { useEffect, useState } from 'react'
import React from "react"
import { Box, Button, OutlinedInput, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { useRouter } from "next/router";
import { useDispatch, useSelector } from 'react-redux'
// import { setPaymentData, setSubmit, setUser } from '../feature/user/userSlice';
import { styled } from '@mui/system';
import moment from 'moment';
import { setPaymentData, setSubmit } from '@/redux/user/userSlice';

const Pay = () => {
    const router = useRouter();
    const dispatch = useDispatch()
    const paymentData = useSelector((state) => state.user.paymentData)
    const copyUserData = useSelector((state) => state.user.copyUserData)
    const Price = paymentData.length * 50 || 0;
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
        border: '2px solid #d9d9d9',
    });

    const StyledTableCell = styled(TableCell)({
        border: '2px solid #d9d9d9',
    });
    const StyledTableHeadingCell = styled(TableCell)({
        border: '2px solid #d9d9d9',
        fontWeight: "bold",
        fontSize: "18px"
    });
    const handleNext = () => {
        router.push("/Login")
        dispatch(setPaymentData([]))
        console.log(copyUserData, "copyUserData inside the payment")
        const filteredData = copyUserData.map(user => ({
            ...user,
            bookingStatus: user.bookingStatus.map(book => ({ ...book, seatId: book.seatSelected ? book.seatSelected : book.seatId, seatSelected: "" }))
        }));
        console.log(filteredData, "filteredData")
        alert(`${filteredData.length} seats are booked`)
        dispatch(setSubmit(filteredData))
    }

    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "98vh" }} border="0px solid red">
            <Box sx={{ display: "flex", flexDirection: "column", width: "60%", justifyContent: "center", alignItems: "center" }} border="0px solid blue">
                <Typography3 variant="h6" sx={{ textAlign: "center", mb: 2 }} >Your Selection</Typography3>
                <TableContainer component={Paper} border="1px solid red" sx={{ width: "50%", mb: 3 }}>
                    <StyledTable aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <StyledTableHeadingCell align="left">Day and time</StyledTableHeadingCell>
                                <StyledTableHeadingCell align="left">Table</StyledTableHeadingCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paymentData.map((row) => (
                                <TableRow
                                    key={row.seatSelected}
                                >
                                    <StyledTableCell align="left">{moment(row.date).format('Do MMMM YYYY')} {row.slot}</StyledTableCell>
                                    <StyledTableCell align="left">{row.seatSelected}</StyledTableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </StyledTable>
                </TableContainer>
                <Box sx={{ display: "flex", justifyContent: "center", width: "50%" }} border="0px solid red">
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