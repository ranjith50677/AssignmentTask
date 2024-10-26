
import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box
} from '@mui/material';
import { login, register } from '../api/index.js';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailsingup, setEmailsingup] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [passwordsingup, setPasswordsingup] = useState('');
  const [changepage, setChangepage] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passworderror, setPasswordError] = useState('');
  const [signupEmailError, setSignupEmailError] = useState('');
  const [firstnameError, setFirstnameError] = useState('');
  const [lastnameError, setLastnameError] = useState('');
  // const [message, setmessage] = useState('');


  const navigate=useNavigate()

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateName = (name) => {
    const regex = /^[a-zA-Z]*$/;
    return regex.test(name) && name.length <= 100;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      setEmailError('Invalid email format');
      return;
    } else {
      setEmailError('');
    }
    if (!password) {
      setPasswordError('please enter password ');
      return;
    } else {
      setPasswordError('');
    }


  const apicall=async()=>{
    try {    
      let res=await login({
        email:email,
        password:password})
      if(res.ok){
      localStorage.setItem("token",JSON.stringify(res.data.token))
      alert(res.message)
      }
      if(!res.ok){
        // return setmessage(res?.message)
      }
    } catch (error) {
      console.log(error)
    }
  }
  // if(!emailError||!passworderror){
     apicall()
// } 

    console.log('Email:', email);
    console.log('Password:', password);
  };

  const handleSignupSubmit = (event) => {
    event.preventDefault();
    
    if (!validateName(firstname)) {
      setFirstnameError('First name must be alphabetic and max 100 characters');
      return;
    } else {
      setFirstnameError('');
    }

    if (!validateName(lastname)) {
      setLastnameError('Last name must be alphabetic and max 100 characters');
      return;
    } else {
      setLastnameError('');
    }

    if (!validateEmail(emailsingup)) {
      setSignupEmailError('Invalid email format');
      return;
    } else {
      setSignupEmailError('');
    }


    
  const apicall=async()=>{
    try {    
      let res=await register({
        firstname:firstname,
        lastname:lastname,
        email:emailsingup,
        password:passwordsingup})
      console.log(res)
      setEmail("")
      setPassword("")
      if(res.ok){
        return alert(res.message)
      }
      if(!res.ok){
        return alert(res?.message)
      }
    } catch (error) {
      console.log(error)
    }
  }
  if(!emailError||!passworderror){
     apicall()
} 

  };

  return (
    <div>
   
    <Container component="main" maxWidth="xs" sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: "center",
      mt: 8,
    }}>
      {changepage === false ? (
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor:"rgba(0, 0, 0, 0.26)",
          height: "67vh",
          justifyContent: "center",
          borderRadius: "10px",
          mt: 8,
        }}>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: "450px", paddingLeft: "50px", paddingRight: "50px" }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!emailError}
              helperText={emailError}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!passworderror}
              helperText={passworderror}
            />
            <Typography component="h1" variant="contained" sx={{
              cursor: "pointer",
              fontSize: "15px",
              color: "blue"
            }}
              onClick={() => setChangepage(true)}>
              SignUp Page
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, width: "150px" }}
                onClick={handleSubmit}>
                Sign In
              </Button>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: "75vh",
          background:"#6d7285cc",
          justifyContent: "center",
          borderRadius: "10px",
          mt: 8,
        }}>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSignupSubmit} noValidate sx={{ mt: 1, width: "450px", paddingLeft: "50px", paddingRight: "50px" }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstname"
              label="First Name"
              name="firstname"
              autoComplete="firstname"
              autoFocus
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              error={!!firstnameError}
              helperText={firstnameError}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="lastname"
              label="Last Name"
              name="lastname"
              autoComplete="lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              error={!!lastnameError}
              helperText={lastnameError}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="signup-email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={emailsingup}
              onChange={(e) => setEmailsingup(e.target.value)}
              error={!!signupEmailError}
              helperText={signupEmailError}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="signup-password"
              autoComplete="current-password"
              value={passwordsingup}
              onChange={(e) => setPasswordsingup(e.target.value)}
            />
            <Typography component="h1" variant="contained" sx={{
              cursor: "pointer",
              fontSize: "15px",
              color: "blue"
            }}
              onClick={() => setChangepage(false)}>
              Sign In Page
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, width: "150px" }}
                onClick={handleSignupSubmit}
                >
                Sign Up

              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Container>
    </div>
  );
};

export default Login;
