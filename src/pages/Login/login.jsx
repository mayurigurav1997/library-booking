import { useEffect, useState } from 'react'
import React from "react"
import classes from "../../styles/Login/Login.module.scss";
import { Box, Button, CircularProgress, OutlinedInput, Snackbar, TextField, Typography } from '@mui/material';
import { useRouter } from "next/router";
import { useDispatch, useSelector } from 'react-redux'
import { setSubmit, setUser } from '../feature/user/userSlice';

const Login = () => {
    const router = useRouter();
    const dispatch = useDispatch()
    const userData = useSelector((state) => state.user.allUsers)
    const [allUsers, setAllUsers] = useState(userData)
    // console.log(userData, "userData")
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleNameChange = (event) => {
        setName(event.target.value);
        // Clear error when user starts typing
        setError('');
    };
    const handleLogin = () => {
        if (name.trim() === '') {
            setError('Please enter your name.');
            return;
        }
        // console.log(allUsers)

        dispatch(setUser(name))
        for (user of userData) {
            if (!userData.some((obj) => obj.name == name)) {
                setAllUsers([...allUsers, { name: name, bookingStatus: [] }])
                dispatch(setSubmit(allUsers))
            } else {
                alert("User Already exists!");
            }
        }
        setName('');
        // console.log(name)

        router.push("/Tables")
    }
    useEffect(() => {
        dispatch(setSubmit(allUsers))
    }, [allUsers])
    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "98vh" }} border="1px solid red">
            {loading ? <Box sx={{ display: 'flex', position: "absolute" }} border="1px solid blue">
                <CircularProgress />
            </Box> : <></>}
            <Box sx={{ display: "flex", flexDirection: "column", width: "30%" }} border="0px solid blue">
                <Typography variant="h5" sx={{ textAlign: "center", mb: 4 }}>Focus Reading Room</Typography>
                <Typography variant="h6" sx={{ textAlign: "left" }}>Name</Typography>

                <Box sx={{ mb: 5 }}>
                    <OutlinedInput
                        value={name}
                        onChange={handleNameChange}
                        error={Boolean(error)}
                        helpertext={error}
                        placeholder="Enter your name"
                        sx={{ width: "100%" }}
                    />
                    {error && <Typography variant="h6" color="red">Please Enter the Name</Typography>}
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Button variant="contained" sx={{ width: "20%" }}
                        onClick={handleLogin}>Login</Button>
                </Box>
            </Box>
        </Box>
    )
}

export default Login