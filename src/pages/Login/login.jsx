import React, { useState } from 'react'
import classes from "../../styles/Login/Login.module.scss";
import { Box, Button, OutlinedInput, TextField, Typography } from '@mui/material';
import { useRouter } from "next/router";

const Login = () => {
    const router = useRouter();

    const [name, setName] = useState('');
    const [error, setError] = useState('');

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
        setName('');
        console.log(name)
        router.push("/Tables")
    }
    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "98vh" }} border="1px solid red">
            <Box sx={{ display: "flex", flexDirection: "column", width: "30%" }} border="0px solid blue">
                <Typography variant="h5" sx={{ textAlign: "center", mb: 4 }}>Focus Reading Room</Typography>
                <Typography variant="h6" sx={{ textAlign: "left" }}>Name</Typography>

                <Box sx={{ mb: 5 }}>
                    <OutlinedInput
                        value={name}
                        onChange={handleNameChange}
                        error={Boolean(error)}
                        helperText={error}
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