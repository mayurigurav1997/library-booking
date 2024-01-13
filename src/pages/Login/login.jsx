import { useEffect, useState } from 'react'
import React from 'react'
import {
  Box,
  Button,
  CircularProgress,
  OutlinedInput,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'

import { styled } from '@mui/system'
import { setSubmit, setUser } from '@/redux/user/userSlice'

const Login = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const userData = useSelector((state) => state.user.allUsers)
  const [allUsers, setAllUsers] = useState(userData)
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const CustomButton = styled(Button)({
    color: 'white',
    backgroundColor: '#5b5bd3',
    fontSize: '16px',
  })
  const Typography3 = styled(Typography)({
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#202124e6',
  })
  const Typography4 = styled(Typography)({
    fontSize: '20px',
    fontWeight: 600,
    color: '#202124e6',
  })
  const handleNameChange = (event) => {
    setName(event.target.value)
    setError('')
  }
  const handleLogin = () => {
    if (name.trim() === '') {
      setError('Please enter your name.')
      return
    }
    dispatch(setUser(name))

    if (!userData.some((obj) => obj.name == name)) {
      setAllUsers([...allUsers, { name: name, bookingStatus: [] }])
      // dispatch(setSubmit(allUsers))
    } else {
      alert('User Already exists!')
    }

    setName('')
    router.push('/Tables')
  }
  useEffect(() => {
    dispatch(setSubmit(allUsers))
    // const stringifiedData = JSON.stringify(allUsers);
    // localStorage.setItem("allUsers", stringifiedData);
  }, [allUsers])
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '98vh',
      }}
      border="0px solid red"
    >
      {loading ? (
        <Box
          sx={{ display: 'flex', position: 'absolute' }}
          border="1px solid blue"
        >
          <CircularProgress />
        </Box>
      ) : (
        <></>
      )}
      <Box
        sx={{ display: 'flex', flexDirection: 'column', width: '26%' }}
        border="0px solid blue"
      >
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography3 variant="h4" sx={{ textAlign: 'center', mb: 4 }}>
            Focus Reading Room
          </Typography3>
        </Box>
        <Typography4 variant="h6" sx={{ textAlign: 'left' }}>
          Name
        </Typography4>

        <Box sx={{ mb: 5 }}>
          <OutlinedInput
            value={name}
            onChange={handleNameChange}
            error={Boolean(error)}
            helpertext={error}
            placeholder="Enter your name"
            sx={{ width: '100%' }}
          />
          {error && (
            <Typography variant="h6" color="red">
              Please Enter the Name
            </Typography>
          )}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CustomButton
            variant="contained"
            sx={{ width: '24%', textTransform: 'capitalize' }}
            onClick={handleLogin}
          >
            Login
          </CustomButton>
        </Box>
      </Box>
    </Box>
  )
}

export default Login
