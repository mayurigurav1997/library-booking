import { useEffect, useState } from 'react'
import React from "react"
import classes from "../../styles/Login/Login.module.scss";
import { Box, Button, OutlinedInput, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { useRouter } from "next/router";
import { useDispatch, useSelector } from 'react-redux'
import { setSubmit, setUser } from '../feature/user/userSlice';
import { styled } from '@mui/system';

const Pay = () => {
    const router = useRouter();
    const dispatch = useDispatch()
    const userData = useSelector((state) => state.user.allUsers)
    const StyledTable = styled(Table)({
        // minWidth: 650,
        border: '2px solid #d9d9d9', // Add border style to the table
    });

    const StyledTableCell = styled(TableCell)({
        border: '2px solid #d9d9d9', // Add border style to individual cells
    });

    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "98vh" }} border="1px solid red">
            <Box sx={{ display: "flex", flexDirection: "column", width: "80%", justifyContent: "center", alignItems: "center" }} border="1px solid blue">
                <Typography variant="h6" sx={{ textAlign: "center", mb: 2 }} >Your Selection</Typography>
                <TableContainer component={Paper} border="1px solid red" sx={{ width: "40%" }}>
                    <StyledTable aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="left">Day and time</StyledTableCell>
                                <StyledTableCell align="left">Table</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* {rows.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.calories}</TableCell>
                                    <TableCell align="right">{row.fat}</TableCell>
                                    <TableCell align="right">{row.carbs}</TableCell>
                                    <TableCell align="right">{row.protein}</TableCell>
                                </TableRow>
                            ))} */}
                        </TableBody>
                    </StyledTable>
                </TableContainer>
            </Box>
        </Box>
    )
}

export default Pay